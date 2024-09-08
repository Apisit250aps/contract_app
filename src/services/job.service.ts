import axios, { AxiosResponse } from "axios"
import apiClient, { PaginationResult, queryParams } from "."

export interface IJob {
  _id?: string
  title: string
  description?: string
  startDate?: Date | string
  endDate?: Date | string
  areaSize?: number
  ratePerArea?: number
  workers?: string[]
}

export default {
  async createJob(data: IJob): Promise<AxiosResponse> {
    try {
      const response: AxiosResponse = await apiClient({
        method: "post",
        url: "/job/create",
        data
      })
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to create job")
      }
      throw new Error("An unexpected error occurred")
    }
  },
  async getAllJob({
    limit,
    page
  }: queryParams): Promise<AxiosResponse<{ data: PaginationResult<IJob> }>> {
    try {
      const response = await apiClient({
        method: "get",
        url: "/job/all",
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
