import { FC, useCallback, useMemo, useState } from "react"
import WorkerData from "../../components/base/worker/WorkerData"
import Pagination from "../../components/navigate/paginations/Pagination"
import { IWorker } from "../../services/worker.service"
import WorkCreateForm from "./WorkerCreatePage"
// import { IWorker } from "../../services/worker.service"

const WorkerListPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  // const [totalItems, setTotalItems] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [selectedWorkers, setSelectedWorkers] = useState<IWorker[]>([])

  const handlePaginationChange = useCallback(
    (currentPage: number, totalPages: number) => {
      setCurrentPage(currentPage)
      setTotalPages(totalPages)
    },
    []
  )

  const handleSelectionChange = useCallback((workers: IWorker[]) => {
    setSelectedWorkers(workers)
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  const renderActions = useMemo(() => {
    if (selectedWorkers.length === 0) {
      return (
        <button className="btn btn-ghost">
          <i className="bx bx-message-square-add"></i>
        </button>
      )
    }

    return (
      <>
        {selectedWorkers.length === 1 && (
          <button className="btn btn-ghost">
            <i className="bx bx-message-square-edit"></i>
          </button>
        )}
        <button className="btn btn-ghost text-red-500">
          <i className="bx bx-message-square-x"></i>
        </button>
      </>
    )
  }, [selectedWorkers.length])

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <div className="card p-3 bg-base-100 shadow-lg h-[90vh]">
            <div className="card-title flex flex-row justify-between items-center p-3">
              <div className="">
                <h1>Workers</h1>
              </div>
              <div className="actions flex flex-row items-center justify-end">
                <select
                  value={limit}
                  className="select w-full max-w-xs bg-base-200"
                  onChange={(e) => setLimit(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <div className="flex flex-row">{renderActions}</div>
              </div>
            </div>
            <div className="card-body overflow-y-auto">
              <WorkerData
                limit={limit}
                page={page}
                onPaginationChange={handlePaginationChange}
                onSelectionChange={handleSelectionChange}
              />
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className="col-span-1">
          <WorkCreateForm />
        </div>
      </div>
    </>
  )
}

export default WorkerListPage
