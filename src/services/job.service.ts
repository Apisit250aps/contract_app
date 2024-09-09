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
export interface IJobWorker {
  _id: string
  name: string
  contactInfo: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IJobWorkerAttendance {
  _id: string
  worker: IJobWorker
  attendanceId: string
  present: boolean
}

export interface IJobAttendanceDay {
  date: string
  totalPresent: number
  workers: IJobWorkerAttendance[]
}

export interface IJobJob {
  _id: string
  title: string
  description: string
  workers: IJobWorker[]
  attendance: IJobAttendanceDay[]
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
  },
  async getJobId(id: string): Promise<AxiosResponse> {
    try {
      const response = await apiClient({
        method: "get",
        url: `/job/get/${id}`
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
  
}
