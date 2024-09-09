import { FC, useCallback, useEffect, useState } from "react"
import Swal from "sweetalert2"
import jobService, { IJob } from "../../../services/job.service"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

interface JobDataProps {
  limit?: number
  page?: number
  onAction: boolean
  onPaginationChange: (
    currentPage: number,
    totalPages: number,
    totalItems: number
  ) => void
  onSelectionChange?: (selectedJobs: IJob[]) => void
}

const JobData: FC<JobDataProps> = ({
  limit = 10,
  page = 1,
  onAction = false,
  onPaginationChange,
  onSelectionChange
}) => {
  const [jobData, setJobData] = useState<IJob[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJobs, setSelectedJobs] = useState<IJob[]>([])
  const navigate = useNavigate()
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = (await jobService.getAllJob({
        limit,
        page
      })) as AxiosResponse
      setJobData(response.data.data)
      onPaginationChange(
        response.data.currentPage,
        response.data.totalPages,
        response.data.totalItems
      )
    } catch (error) {
      console.error("Error fetching jobs:", error)
      Swal.fire({
        title: "Error",
        text: "Failed to fetch jobs. Please try again.",
        icon: "error"
      })
    } finally {
      setLoading(false)
    }
  }, [limit, page, onPaginationChange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleJobSelection = useCallback((job: IJob, isSelected: boolean) => {
    setSelectedJobs((prevSelected) => {
      const newSelected = isSelected
        ? [...prevSelected, job]
        : prevSelected.filter((e) => e._id !== job._id)
      return newSelected
    })
  }, [])

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedJobs)
    }
  }, [selectedJobs, onSelectionChange])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Area Size</th>
            <th>Rate Per Area</th>
            <th>Workers Count</th>
            {onAction ? (
              <>
                <th>Detail</th>
              </>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {jobData.map((job, index) => (
            <tr key={job._id}>
              <td>
                {onSelectionChange ? (
                  <input
                    type="checkbox"
                    checked={selectedJobs.some((e) => e._id === job._id)}
                    onChange={(e) => handleJobSelection(job, e.target.checked)}
                    className="checkbox"
                  />
                ) : (
                  <>{index + 1}</>
                )}
              </td>
              <td>{job.title}</td>
              <td>{job.description || "-"}</td>
              <td>
                {job.startDate
                  ? new Date(job.startDate).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                {job.endDate ? new Date(job.endDate).toLocaleDateString() : "-"}
              </td>
              <td>{job.areaSize || "-"}</td>
              <td>{job.ratePerArea || "-"}</td>
              <td>{job.workers?.length || 0}</td>
              {onAction ? (
                <>
                  <td>
                    <button
                      className="btn btn-ghost"
                      onClick={() => navigate(`/jobs/${job._id}`)}
                    >
                      <i className="bx bx-message-square-detail"></i>
                    </button>
                  </td>
                </>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {jobData.length === 0 && !loading && (
        <div className="text-center py-4">No jobs found</div>
      )}
    </div>
  )
}

export default JobData
