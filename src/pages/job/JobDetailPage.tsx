import { FC, Suspense } from "react"
import AttendanceTable from "../../components/base/attendance/AttendanceTable"
import { Await, useLoaderData } from "react-router-dom"
import { IJobJob } from "../../services/job.service"

const JobDetailPage: FC = () => {
  const { job } = useLoaderData() as { job: Promise<IJobJob> }
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        }
      >
        <Await resolve={job}>
          {(resolvedJob: IJobJob) => (
            <div className="card rounded-2xl shadow-lg p-3 bg-base-100 h-[85vh]">
              <div className="card-title">
                <div className="">
                  <h1>Job Attendance {resolvedJob.title}</h1>
                </div>
              </div>
              <div className="card-body overflow-x-auto">
                
                <AttendanceTable JobDetail={resolvedJob} />
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  )
}

export default JobDetailPage
