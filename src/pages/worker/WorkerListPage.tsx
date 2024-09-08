import { FC, useCallback, useMemo, useState } from "react"
import WorkerData from "../../components/base/worker/WorkerData"
import Pagination from "../../components/navigate/paginations/Pagination"
import { IWorker } from "../../services/worker.service"
// import { IWorker } from "../../services/worker.service"

const WorkerListPage: FC = () => {
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
      <div className="card p-3 bg-base-100 shadow-lg">
        <div className="card-title flex flex-row justify-between items-center">
          <div className=" px-3">
            <h1>Workers</h1>
          </div>
          <div className="actions flex flex-row items-center justify-end">
            <div className="">{renderActions}</div>
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
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default WorkerListPage
