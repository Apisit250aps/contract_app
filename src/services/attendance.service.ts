import axios, { AxiosResponse } from "axios"

import apiClient from "."
export interface IAttendance {
  _id?: string
  date: Date | string
  present: boolean
  worker: string
  job: string
}

export default {
  async createAttendance(data: IAttendance): Promise<AxiosResponse> {
    try {
      const response = await apiClient({
        method: "post",
        url: `/attendance/create`,
        data
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
  },
  async updateAttendance(
    id: string,
    data: IAttendance
  ): Promise<AxiosResponse> {
    try {
      console.log(data)
      const response = await apiClient({
        method: "put",
        url: `/attendance/update/${id}`,
        data
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
