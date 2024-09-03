import { AxiosError, AxiosResponse } from "axios"
import apiClient from "."

export interface IProject {
  _id: string
  project_name: string
  start_date: Date
  end_date: Date
  status: string
  budget: number
  createdAt: Date
  updatedAt: Date
}

export interface ProjectResponse {
  projects: IProject[]
  currentPage: number
  totalPages: number
  totalProjects: number
}

export const getProject = async ({
  limit = 1,
  page = 1
}): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => [
    apiClient({
      method: "get",
      url: "/project/get",
      params: {
        page,
        limit
      }
    })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError<{ response: AxiosResponse }>) => reject(error))
  ])
}
