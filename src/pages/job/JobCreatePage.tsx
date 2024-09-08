import { FC, useCallback, useState } from "react"
import InputLabelInside from "../../components/forms/inputs/InputLabelInside"
import WorkerData from "../../components/base/worker/WorkerData"
import Pagination from "../../components/navigate/paginations/Pagination"
import { IWorker } from "../../services/worker.service"

const JobCreatePage: FC = () => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
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
              <form>
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
                  value={startDate}
                  type="date"
                  label="Start Date"
                  set={(e) => setStartDate(e.target.value)}
                />
                <InputLabelInside
                  value={endDate}
                  label="End Date"
                  type="date"
                  set={(e) => setEndDate(e.target.value)}
                />
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
