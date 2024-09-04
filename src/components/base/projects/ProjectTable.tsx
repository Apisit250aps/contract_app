import { FC, useEffect, useState } from "react"
import { IProject } from "../../../services/project.service"
import { mapObjectProperties } from "../../../utils/data"

interface ProjectTableProps {
  data: IProject[]
  limit: number
  currentPage: number
  cols?: (keyof IProject)[]
  colsMap?: string[]
}

const ProjectTable: FC<ProjectTableProps> = ({
  data,
  limit,
  currentPage,
  cols,
  colsMap
}) => {
  const [tableData, setTableData] = useState<Partial<IProject>[]>([])

  useEffect(() => {
    if (cols && cols.length > 0) {
      setTableData(mapObjectProperties(data, cols))
    } else {
      setTableData(data)
    }
  }, [data, cols])

  if (data.length === 0) {
    return <div>No data available</div>
  }

  const headers = colsMap || (Object.keys(tableData[0]) as (keyof IProject)[])

  return (
    <div className="h-full overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            {headers.map((col, index) => (
              <th key={index}>{col.toString()}</th>
            ))}
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((project: IProject, index) => (
            <tr key={index} className="hover:bg-white">
              <td>{index + limit * (currentPage - 1) + 1}</td>
              {Object.values(project).map((col, colIndex) => (
                <td key={colIndex} className="hover:bg-base-300">
                  {col}
                </td>
              ))}
              <td className="text-end">
                <button type="button" className="btn btn-ghost ">
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
