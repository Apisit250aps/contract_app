import axios, { AxiosResponse } from "axios"
import apiClient, { PaginationResult, queryParams } from "."

export interface IWorker {
  _id?: string
  name: string
  contactInfo?: string
}


export default {
  async createWorker(data: IWorker): Promise<AxiosResponse> {
    try {
      const response = await apiClient.post<IWorker>(`/worker/create`, data)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to create worker"
        )
      }
      throw new Error("An unexpected error occurred")
    }
  },
  async getAllWorker({
    limit,
    page
  }: queryParams): Promise<AxiosResponse<{ data: PaginationResult<IWorker> }>> {
    try {
      const response = await apiClient({
        method: "get",
        url: "/worker/all",
        params: {
          limit,
          page
        }
      })
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to create worker"
        )
      }
      throw new Error("An unexpected error occurred")
    }
  }
}
