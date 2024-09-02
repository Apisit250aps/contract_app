import axios from "axios"
import Swal from "sweetalert2"
import { JWT_TOKEN, STORE_TOKEN } from "../middleware/auth.middleware";
// Get the token from localStorage or any other storage mechanism you're using

//
const handleSessionExpiration = () => {
  Swal.fire({
    title: "Session Expired",
    text: "Your session has expired. Please log in again.",
    icon: "warning",
    confirmButtonText: "OK",
    allowOutsideClick: false // Prevent closing by clicking outside the alert
  }).then(() => {
    // Clear the token and other session data
    localStorage.removeItem(STORE_TOKEN)

    // Redirect to the login page
    window.location.href = "/auth/login"
  })
}
const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: JWT_TOKEN ? `Bearer ${JWT_TOKEN}` : ""
  }
})

// Optionally, add an interceptor to handle token expiration or other global error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      handleSessionExpiration()
    }
    return Promise.reject(error)
  }
)

export default apiClient
