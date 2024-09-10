import { FC, useCallback, useState } from "react"
import jobService, {
  IJobJob,
  IJobWorkerAttendance
} from "../../../services/job.service"
import Modal from "../../modals/Modal"
import attendanceService, {
  IAttendance
} from "../../../services/attendance.service"
import InputLabelInside from "../../forms/inputs/InputLabelInside"
import Swal from "sweetalert2"

const AttendanceTable: FC<{ JobDetail: IJobJob }> = ({ JobDetail }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [jobData, setJobData] = useState<IJobJob | null>(JobDetail)
  const [error, setError] = useState<string | null>(null)

  const [createDateModal, createDateModalStat] = useState<boolean>(false)

  const [newDateAttendance, setNewAttendanceData] = useState<string>("")

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await jobService.getJobId(jobData?._id as string)
      if (response.status === 200) {
        setJobData(response.data[0] as IJobJob)
      } else {
        throw new Error("Failed to fetch job data")
      }
    } catch (error) {
      console.error("Error fetching job data:", error)
      setError("Failed to load job data. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [jobData?._id])

  const handleCreateAttendance = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!jobData || !newDateAttendance) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Job data or date is missing"
        })
        return
      }

      try {
        const attendancePromises = jobData.workers.map((worker) => {
          const attendanceData: IAttendance = {
            date: newDateAttendance,
            worker: worker._id,
            job: jobData._id,
            present: false
          }
          return attendanceService.createAttendance(attendanceData)
        })

        const results = await Promise.allSettled(attendancePromises)

        const successCount = results.filter(
          (result) => result.status === "fulfilled"
        ).length
        const failureCount = results.length - successCount

        if (failureCount > 0) {
          // Some or all creations failed
          const errorMessages = results
            .filter(
              (result): result is PromiseRejectedResult =>
                result.status === "rejected"
            )
            .map(
              (result, index) =>
                `Worker ${jobData.workers[index]._id}: ${result.reason}`
            )
            .join("\n")

          await Swal.fire({
            icon: "warning",
            title: "Partial Success",
            html: `Successfully created attendance for ${successCount} workers.<br>
                   Failed for ${failureCount} workers.<br><br>
                   <small>Error details:<br>${errorMessages}</small>`
          })
        } else {
          // All creations succeeded
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: `Attendance created successfully for all ${successCount} workers.`
          })
        }
      } catch (error) {
        console.error("Error creating attendance:", error)
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred while creating attendance."
        })
      } finally {
        fetchData()
        createDateModalStat(false)
        setNewAttendanceData("")
      }
    },
    [jobData, newDateAttendance, fetchData]
  )

  const handleCheckAttendance = useCallback(
    async (attendance: IJobWorkerAttendance, dayIndex: number) => {
      if (!jobData) return

      // Optimistic update
      setJobData((prevJobData) => {
        if (!prevJobData) return null

        const newJobData = JSON.parse(JSON.stringify(prevJobData)) as IJobJob
        const updatedDay = newJobData.attendance[dayIndex]
        const updatedWorkerIndex = updatedDay.workers.findIndex(
          (w) => w.attendanceId === attendance.attendanceId
        )

        if (updatedWorkerIndex !== -1) {
          updatedDay.workers[updatedWorkerIndex].present =
            !updatedDay.workers[updatedWorkerIndex].present
          updatedDay.totalPresent += updatedDay.workers[updatedWorkerIndex]
            .present
            ? 1
            : -1
        }

        return newJobData
      })

      try {
        await attendanceService.updateAttendance(attendance.attendanceId, {
          present: !attendance.present
        } as IAttendance)
      } catch (error) {
        console.error("Error updating attendance:", error)
        setError("Failed to update attendance. Please try again.")
        // Revert the optimistic update
        fetchData()
      }
    },
    [jobData, fetchData]
  )

  

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>
  if (!jobData) return <div className="no-data">No job data available</div>

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols w-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Worker</th>
              {jobData.attendance.map((day, index) => (
                <th key={index} className="px-4 py-2">
                  {day.date}
                </th>
              ))}
              <th>
                <button
                  className="btn btn-ghost"
                  onClick={() => createDateModalStat(true)}
                >
                  <i className="bx bx-calendar-plus"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {jobData.workers.map((worker, workIndex) => (
              <tr key={workIndex}>
                <td className="px-4 py-2">{worker.name}</td>
                {jobData.attendance.map((day, dayIndex) => {
                  const workerAttendance = day.workers.find(
                    (w) => w.worker._id === worker._id
                  )
                  return (
                    <td key={day.date} className="px-4 py-2 text-center">
                      {workerAttendance ? (
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={workerAttendance.present}
                          onChange={() =>
                            handleCheckAttendance(workerAttendance, dayIndex)
                          }
                          id={`${worker._id}-${day.date}`}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                  )
                })}
                <td className="text-center">-</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="px-4 py-2 font-bold">Total Present</th>
              {jobData.attendance.map((day, index) => (
                <th key={day.date || index} className="px-4 py-2 text-center">
                  {day.totalPresent}
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <Modal
        id={"create-date"}
        title="New Date"
        isOpen={createDateModal}
        onClose={() => createDateModalStat(!createDateModal)}
      >
        <form onSubmit={handleCreateAttendance}>
          <InputLabelInside
            value={newDateAttendance}
            type="date"
            set={(e) => setNewAttendanceData(e.target.value)}
          />
          <div className="justify-end flex">
            <button className="btn bg-base-200">
              <i className="bx bx-calendar-check"></i>
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AttendanceTable
