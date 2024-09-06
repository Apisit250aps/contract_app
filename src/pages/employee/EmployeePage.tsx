import { FC, useCallback, useEffect, useState } from "react"
import ContentCard from "../../components/card/ContentCard"
import {
  EmployeesData,
  getEmployeeService,
  IEmployee
} from "../../services/employee.service"
import Swal from "sweetalert2"
import Pagination from "../../components/navigate/paginations/Pagination"
import EmployeeTable from "../../components/base/employee/EmployeeTable"

const EmployeePage: FC = () => {
  const limitList: number[] = [10, 25, 50, 100]

  const [data, setData] = useState<IEmployee[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState<number>(10)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getEmployeeService({
        limit: limit,
        page: currentPage
      })
      const body = response.data as EmployeesData
      setCurrentPage(body.currentPage)
      setTotalPages(body.totalPages)
      setData(body.employees as IEmployee[])
    } catch (error) {
      console.error("Error fetching projects:", error)
      Swal.fire({
        title: "Error",
        text: "Failed to fetch projects. Please try again.",
        icon: "error"
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, limit])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <>
      <ContentCard>
        <div className="card-title flex flex-row justify-between">
          <div>
            <h1>Employee</h1>
          </div>
          <div className=" flex flex-row justify-end">
            <select
              className="select bg-base-200 w-full max-w-xs"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              {limitList.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <div className="dropdown dropdown-end">
              <div tabIndex={1} role="button" className="btn ms-1">
                <i className="bx bx-dots-vertical-rounded"></i>
              </div>
              <ul
                tabIndex={1}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button onClick={() => {}} className="btn btn-sm">
                    <i className="bx bx-briefcase-alt-2"></i>
                    New
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body">
          {!loading ? (
            <EmployeeTable data={data} limit={limit} currentPage={currentPage} colsMap={{
              first_name:"First name",
              last_name:"Last name",
              phone_number:"Phone",
              position:"Position"
            }}/>
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
        </div>

        <div className="card-actions">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </ContentCard>
    </>
  )
}

export default EmployeePage
