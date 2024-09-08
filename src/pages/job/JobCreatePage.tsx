import { FC, useCallback, useState } from "react"
import InputLabelInside from "../../components/forms/inputs/InputLabelInside"
import WorkerData from "../../components/base/worker/WorkerData"
import Pagination from "../../components/navigate/paginations/Pagination"
import { IWorker } from "../../services/worker.service"
import jobService, { IJob } from "../../services/job.service"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

const JobCreatePage: FC = () => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [startDate, setStartDate] = useState<Date | string>("")
  const [endDate, setEndDate] = useState<Date | string>("")

  const navigate = useNavigate()

  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  })
  const [selectedWorkers, setSelectedWorkers] = useState<IWorker[]>([])

  const handlePaginationChange = useCallback(
    (currentPage: number, totalPages: number, totalItems: number) => {
      setPagination((prev) => ({
        ...prev,
        currentPage,
        totalPages,
        totalItems
      }))
    },
    []
  )

  const handleSelectionChange = useCallback((workers: IWorker[]) => {
    setSelectedWorkers(workers)
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }, [])

  const handleSubmitJob = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const jobData: IJob = {
      title,
      description,
      startDate,
      endDate,
      workers: selectedWorkers.map((worker) => worker._id as string)
    }

    try {
      const response = await jobService.createJob(jobData)
      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: "The job has been successfully created.",
          icon: "success",
          confirmButtonText: "OK"
        }).then(()=>navigate("/jobs"))
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message ||
          "An unexpected error occurred while creating the job."
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Try Again"
        })
      } else {
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again later or contact support if the problem persists.",
          icon: "error",
          confirmButtonText: "OK"
        })
      }
      console.error("Error creating job:", error)
    }
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-4 lg:col-span-2">
          <div className="card rounded-2xl shadow-lg p-3 bg-base-100 h-full">
            <div className="card-title">
              <div className="">
                <h1>Create Job</h1>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitJob}>
                <InputLabelInside
                  label="Title"
                  value={title}
                  set={(e) => setTitle(e.target.value)}
                />
                <InputLabelInside
                  label="Description"
                  value={description}
                  set={(e) => setDescription(e.target.value)}
                />
                <InputLabelInside
                  value={(startDate || "") as string}
                  type="date"
                  label="Start Date"
                  set={(e) => setStartDate(e.target.value)}
                />
                <InputLabelInside
                  value={endDate as string}
                  label="End Date"
                  type="date"
                  set={(e) => setEndDate(e.target.value)}
                />
                <div className="flex justify-end">
                  <button className="btn btn-primary">create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-4 lg:col-span-2">
          <div className="card rounded-2xl shadow-lg p-3 bg-base-100 h-full max-h-[400px]">
            <div className="card-title">
              <div className="">
                <h1>Worker Selected</h1>
              </div>
              <div className=" badge badge-primary">
                {selectedWorkers.length}
              </div>
            </div>
            <div className="card-body rounded-2xl bg-base-200 overflow-y-auto ">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedWorkers.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.name}</td>
                      <td>{value.contactInfo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="card p-3 bg-base-100 mt-3 shadow-lg">
        <div className="card-title">
          <div className="">
            <h1>Workers</h1>
          </div>
        </div>
        <div className="card-body">
          <WorkerData
            limit={pagination.limit}
            page={pagination.page}
            onPaginationChange={handlePaginationChange}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        <div className="card-actions">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default JobCreatePage
