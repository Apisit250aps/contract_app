import { FC, FormEvent, useEffect, useState, useCallback } from "react"
import {
  createProjectService,
  getProjectService,
  IProject,
  ProjectResponse
} from "../../../services/project.service"
import Pagination from "../../navigate/paginations/Pagination"
import Modal from "../../modals/Modal"
import ProjectForm from "../../forms/forms/ProjectForm"
import ProjectTable from "./ProjectTable"
import Swal from "sweetalert2"

const ProjectManage: FC = () => {
  const limitList: number[] = [10, 25, 50, 100]
  const [createProjectModal, onCreateProjectModal] = useState<boolean>(false)
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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getProjectService({
        limit: limit,
        page: currentPage
      })
      const body = response.data as ProjectResponse
      setCurrentPage(body.currentPage)
      setTotalPages(body.totalPages)
      setData(body.projects as IProject[])
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const createData: IProject = {
      project_name,
      start_date,
      end_date,
      status,
      budget
    }
    try {
      const response = await createProjectService(createData)
      if (response.status === 201) {
        onCreateProjectModal(false)
        Swal.fire({
          title: "Success",
          text: "New Project has been created!",
          icon: "success"
        })

        // Reset form fields
        setProjectName("")
        setStartDate(undefined)
        setEndDate(undefined)
        setStatus("")
        setBudget(undefined)
        // Fetch updated data
        await fetchData()
        // Close modal (assuming you're using a modal library that exposes a close method)
      }
    } catch (error) {
      console.error("Error creating project:", error)
      Swal.fire({
        title: "Error",
        text: "Failed to create project. Please try again.",
        icon: "error"
      })
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
                  <button
                    onClick={() => onCreateProjectModal(true)}
                    className="btn btn-sm"
                  >
                    <i className="bx bx-briefcase-alt-2"></i>
                    New
                  </button>
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
              colsMap={{
                project_name: "ชื่อโครงการ",
                start_date: "เริ่มต้น",
                end_date: "เสร็จสิ้น",
                budget: "งบประมาณ",
                status: "สถานะ"
              }}
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
        </div>
        <div className="card-actions mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Modal
        title="New Project"
        id={"create-project"}
        isOpen={createProjectModal}
        onClose={() => onCreateProjectModal(false)}
      >
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
          handleSubmit={handleSubmit}
        />
      </Modal>
    </>
  )
}

export default ProjectManage
