import { FC, useCallback, useState } from "react"
import WorkerData from "../../components/base/worker/WorkerData"
import Pagination from "../../components/navigate/paginations/Pagination"
// import { IWorker } from "../../services/worker.service"

const WorkerListPage: FC = () => {
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  })

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

  //   const handleSelectionChange = useCallback((workers: IWorker[]) => {
  //     setSelectedWorkers(workers)
  //   }, [])

  const handlePageChange = useCallback((newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }, [])

  return (
    <>
      <div className="card p-3 bg-base-100 shadow-lg">
        <div className="card-title flex flex-row justify-between items-center">
          <div className=" px-3">
            <h1>Workers</h1>
          </div>
          <div className="actions flex flex-row items-center justify-end">
            <div className="">
              <button className="btn btn-ghost">
                <i className="bx bx-dots-vertical-rounded"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <WorkerData
            limit={pagination.limit}
            page={pagination.page}
            onPaginationChange={handlePaginationChange}
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
