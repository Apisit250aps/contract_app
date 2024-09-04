import { FC, useEffect, useState, useMemo } from "react"
import { IProject } from "../../../services/project.service"
import { mapObjectProperties } from "../../../utils/data"

interface ProjectTableProps {
  data: IProject[]
  limit: number
  currentPage: number
  colsMap?: Partial<Record<keyof IProject, string>>
}

const ProjectTable: FC<ProjectTableProps> = ({
  data,
  limit,
  currentPage,
  colsMap
}) => {
  const [tableData, setTableData] = useState<Partial<IProject>[]>([])

  const columns = useMemo(() => colsMap ? Object.keys(colsMap) as (keyof IProject)[] : [], [colsMap])

  

  useEffect(() => {
    if (columns.length > 0) {
      setTableData(mapObjectProperties(data, columns))
    } else {
      setTableData(data)
    }
  }, [data, columns])

  if (data.length === 0) {
    return <div>No data available</div>
  }

  const headers = columns.length > 0 ? columns.map(col => colsMap?.[col] || col.toString()) : Object.keys(tableData[0])

  return (
    <div className="h-full overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            {headers.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((project, index) => (
            <tr key={project._id || index} className="hover:bg-white" id={project._id}>
              <td>{index + limit * (currentPage - 1) + 1}</td>
              {columns.length > 0 ? columns.map((col, colIndex) => (
                <td key={colIndex} className="hover:bg-base-300">
                  {project[col]?.toString() ?? ''}
                </td>
              )) : Object.values(project).map((col, colIndex) => (
                <td key={colIndex} className="hover:bg-base-300">
                  {col?.toString() ?? ''}
                </td>
              ))}
              <td className="text-end">
                <button type="button" className="btn btn-ghost">
                  <i className="bx bx-dots-vertical-rounded"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProjectTable