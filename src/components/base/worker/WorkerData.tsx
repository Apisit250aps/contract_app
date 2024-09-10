import { FC, useCallback, useEffect, useState } from "react"
import Swal from "sweetalert2"
import workerService, { IWorker } from "../../../services/worker.service"
import { AxiosResponse } from "axios"

interface WorkerDataProps {
  limit?: number
  page?: number
  onPaginationChange: (
    currentPage: number,
    totalPages: number,
    totalItems: number
  ) => void
  onSelectionChange?: (selectedWorkers: IWorker[]) => void
}

const WorkerData: FC<WorkerDataProps> = ({
  limit = 10,
  page = 1,
  onPaginationChange,
  onSelectionChange
}) => {
  const [workerData, setWorkerData] = useState<IWorker[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWorkers, setSelectedWorkers] = useState<IWorker[]>([])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = (await workerService.getAllWorker({
        limit,
        page
      })) as AxiosResponse
      setWorkerData(response.data.data)
      onPaginationChange(
        response.data.currentPage,
        response.data.totalPages,
        response.data.totalItems
      )
    } catch (error) {
      console.error("Error fetching workers:", error)
      Swal.fire({
        title: "Error",
        text: "Failed to fetch workers. Please try again.",
        icon: "error"
      })
    } finally {
      setLoading(false)
    }
  }, [limit, page, onPaginationChange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleWorkerSelection = useCallback(
    (worker: IWorker, isSelected: boolean) => {
      setSelectedWorkers((prevSelected) => {
        const newSelected = isSelected
          ? [...prevSelected, worker]
          : prevSelected.filter((e) => e._id !== worker._id)
        return newSelected
      })
    },
    []
  )

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedWorkers)
    }
  }, [selectedWorkers, onSelectionChange])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contact Info</th>
          </tr>
        </thead>
        <tbody>
          {workerData.map((worker, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedWorkers.some((e) => e._id === worker._id)}
                  onChange={(e) =>
                    handleWorkerSelection(worker, e.target.checked)
                  }
                  className="checkbox"
                />
              </td>
              <td>{worker.name}</td>
              <td>{worker.contactInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {workerData.length === 0 && !loading && (
        <div className="text-center py-4">No workers found</div>
      )}
    </div>
  )
}

export default WorkerData
