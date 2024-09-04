import { FC, useEffect, useState } from "react"
import {
  getProjectService,
  IProject,
  ProjectResponse
} from "../../../services/project.service"
import Modal from "../../modals/Modal"
import ProjectForm from "../../forms/forms/ProjectForm"
import ProjectTable from "./ProjectTable"
//
const ProjectManage: FC = () => {
  const limitList: number[] = [10, 25, 50, 100]
  const [data, setData] = useState<IProject[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState<number>(limitList[0])

  const [project_name, setProjectName] = useState("")
  const [start_date, setStartDate] = useState<Date | undefined>(undefined)
  const [end_date, setEndDate] = useState<Date | undefined>(undefined)
  const [status, setStatus] = useState("")
  const [budget, setBudget] = useState<number | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await getProjectService({ limit: limit, page: currentPage }).then(
          (response) => {
            const body = response.data as ProjectResponse
            setCurrentPage(body.currentPage)
            setTotalPages(body.totalPages)
            setData(body.projects as IProject[])
          }
        )
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
      <div className="card bg-base-100 p-3 shadow-lg rounded-2xl h-[90vh] flex flex-col">
        <div className="card-title flex flex-row justify-between">
          <div>
            <h1>Projects</h1>
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
                  <label htmlFor="create-project" className="btn btn-sm">
                    <i className="bx bx-briefcase-alt-2"></i>
                    New
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body bg-base-200 rounded-2xl my-3 flex-grow overflow-auto shadow-inner">
          {!loading ? (
            <ProjectTable
              data={data}
              limit={limit}
              currentPage={currentPage}
              cols={["project_name", "status", "budget"]}
              colsMap={["ชื่อโครงการ", "สถานะ", "งบประมาณ"]}
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
        </div>
        <div className="card-actions mt-auto">
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
      <Modal title="New Project" id={"create-project"}>
        <ProjectForm
          projectName={project_name}
          setProjectName={setProjectName}
          startDate={start_date}
          setStartDate={setStartDate}
          endDate={end_date}
          setEndDate={setEndDate}
          status={status}
          setStatus={setStatus}
          budget={budget}
          setBudget={setBudget}
          handleSubmit={() => {}}
        />
      </Modal>
    </>
  )
}

export default ProjectManage
