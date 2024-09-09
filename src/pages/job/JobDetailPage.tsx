import { FC } from "react"
import AttendanceTable from "../../components/base/attendance/AttendanceTable"
import { useParams } from "react-router-dom"

const JobDetailPage: FC = () => {
  const { jobId } = useParams()
  return (
    <>
      <div className="card rounded-2xl shadow-lg p-3 bg-base-100 h-[60vh]">
        <div className="card-title">
          <div className="">
            <h1>Job Attendance</h1>
          </div>
        </div>
        <div className="card-body overflow-x-auto">
          <AttendanceTable jobId={jobId as string} />
        </div>
      </div>
    </>
  )
}

export default JobDetailPage
