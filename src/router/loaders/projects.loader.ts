import axios, { AxiosError } from "axios"
import { getProjectService, IProject } from "../../services/project.service"

export const ProjectLoader = async () => {
  try {
    const response = await getProjectService({})

    if (response.status === 200) {
      return response.data as IProject
    } else {
      return { error: "Failed to fetch project data." }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>
      return { error: axiosError }
    }
  }
}
