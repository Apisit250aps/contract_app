import axios, { AxiosResponse } from "axios"
import apiClient from "."

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
  async getAllWorker(): Promise<AxiosResponse> {
    try {
      const response = await apiClient({
        method: "get",
        url: "/worker/all"
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
