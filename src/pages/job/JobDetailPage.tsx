import { FC } from "react"
import AttendanceTable from "../../components/base/attendance/AttendanceTable"
import {  useParams } from "react-router-dom"

const JobDetailPage: FC = () => {
  const { jobId } = useParams()
  return (
    <>
      <AttendanceTable jobId={jobId as string} />
    </>
  )
}

export default JobDetailPage
