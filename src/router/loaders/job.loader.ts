import { LoaderFunction, LoaderFunctionArgs, defer } from "react-router-dom";
import jobService from "../../services/job.service";

export const jobDetailLoader: LoaderFunction = async ({
  params
}: LoaderFunctionArgs) => {
  if (!params.jobId) {
    throw new Response("Job ID is required", { status: 400 });
  }

  try {
    const jobPromise = jobService.getJobId(params.jobId).then(response => {
      if (response.status !== 200) {
        throw new Response("Failed to load job", { status: response.status });
      }
      return response.data[0];
    });

    return defer({ job: jobPromise });
  } catch (error) {
    console.error("Error in jobDetailLoader:", error);
    throw new Response("An unexpected error occurred while loading the job", { status: 500 });
  }
};