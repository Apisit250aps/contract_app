import { FC, useCallback, useState } from "react"
import JobData from "../../components/base/job/JobData"
import Pagination from "../../components/navigate/paginations/Pagination"
const JobListPage: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  // const [totalItems, setTotalItems] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  const paginationChange = (
    currentPage: number,
    totalPages: number
    // totalItems?: number
  ) => {
    setCurrentPage(currentPage)
    setTotalPages(totalPages)
    // setTotalItems(totalItems)
  }

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  return (
    <>
      <div className="card p-3 bg-base-100 shadow-lg h-[80vh]">
        <div className="card-title flex flex-row justify-between items-center">
          <div className=" px-3">
            <h1>Jobs</h1>
          </div>
          <div className="">
            <select
              value={limit}
              className="select w-full max-w-xs bg-base-200"
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <div className="card-body overflow-y-auto">
          <JobData
            onPaginationChange={paginationChange}
            limit={limit}
            page={page} onAction={true}          />
        </div>
        <div className="card-actions">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default JobListPage
