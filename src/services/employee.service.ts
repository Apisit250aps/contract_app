import axios, { AxiosResponse } from "axios"
import apiClient from "."

export interface IEmployeeService {
  first_name: string
  last_name: string
  phone_number?: string
  position?: string
  hire_date?: Date
  salary?: number
}

export interface IEmployee {
  first_name: string
  last_name: string
  phone_number: string
  position: string
  hire_date: string
  salary: number
  _id?: string
  __v?: number
}

export const getEmployeeService = async ({
  limit = 10,
  page = 1,
  filters = {}
}): Promise<AxiosResponse> => {
  try {
    const response = await apiClient({
      method: "post",
      url: "/auth/register",
      params: { page, limit, filters }
    })
    return response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response as AxiosResponse
    }
    throw new Error("Unexpected error")
  }
}

export const createEmployeeService = async (
  data: IEmployeeService
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient({
      method: "post",
      url: "/employees",
      data: data
    })
    return response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response as AxiosResponse
    }
    throw new Error("Unexpected error")
  }
}
