import { FC, useEffect, useState, useMemo } from "react"
import { mapObjectProperties } from "../../../utils/data"
import { IEmployee } from "../../../services/employee.service"

interface EmployeeTableProp {
  data: IEmployee[]
  limit: number
  currentPage: number
  colsMap?: Partial<Record<keyof IEmployee, string>>
}

const EmployeeTable: FC<EmployeeTableProp> = ({
  data,
  limit,
  currentPage,
  colsMap
}) => {
  const [tableData, setTableData] = useState<Partial<IEmployee>[]>([])

  const columns = useMemo(() => {
    if (colsMap) {
      return Object.keys(colsMap) as (keyof IEmployee)[]
    }
    // If no colsMap provided, use all keys from the first data item
    return data.length > 0 ? (Object.keys(data[0]) as (keyof IEmployee)[]) : []
  }, [colsMap, data])

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

  const headers = columns.map((col) => colsMap?.[col] || col.toString())

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
          {tableData.map((employee, index) => (
            <tr key={employee._id || index} className="hover:bg-white">
              <td>{index + limit * (currentPage - 1) + 1}</td>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="hover:bg-base-300">
                  {employee[col]?.toString() ?? ""}
                </td>
              ))}
              <td className="text-end">
                <button type="button" className="btn btn-ghost" onClick={()=>console.log(employee._id)}>
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

export default EmployeeTable
