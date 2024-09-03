import { FC, useEffect, useState } from "react"
import {
  getProject,
  IProject,
  ProjectResponse
} from "../../../services/project.service"

const ProjectRenderTable: FC = () => {
  const [data, setData] = useState<IProject[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState<number>(25)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await getProject({ limit: limit, page: currentPage }).then((response) => {
          const body = response.data as ProjectResponse
          setCurrentPage(body.currentPage)
          setTotalPages(body.totalPages)
          setData(body.projects as IProject[])
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage, limit]) // อัปเดตข้อมูลเมื่อ currentPage เปลี่ยน

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }
  return (
    <>
      <div className="card bg-base-100 p-3 shadow-lg rounded-2xl">
        <div className="card-title flex flex-row justify-between">
          <div className="">
            <h1>Projects</h1>
          </div>
          <div className="card-actions flex flex-row justify-end">
            <select
              className="select select-bordered w-full max-w-xs"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={25}>
                25
              </option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <div className="card-body">
          {!loading ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead></thead>
                <tbody>
                  {data.map((value: IProject, index) => (
                    <tr key={index}>{value.project_name}</tr>
                  ))}
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
        </div>
        <div className="card-actions">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button className="join-item btn">Page {currentPage}</button>
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectRenderTable
