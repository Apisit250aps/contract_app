import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom"
import jobService, { IJobJob } from "../../services/job.service"

export const jobLoader: LoaderFunction = async ({
  params
}: LoaderFunctionArgs): Promise<IJobJob> => {
  if (!params.jobId) {
    throw new Error("Job ID is required")
  }

  try {
    const response = await jobService.getJobId(params.jobId)

    if (response.status !== 200) {
      throw new Error(`Failed to load job. Status: ${response.status}`)
    }

    return response.data[0]
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error loading job: ${error.message}`)
    }
    throw new Error("An unexpected error occurred while loading the job")
  }
}
