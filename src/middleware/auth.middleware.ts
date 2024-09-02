export const STORE_TOKEN = "token"

export const JWT_TOKEN = localStorage.getItem(STORE_TOKEN) as string

export const isAuthenticated = () => {
  if (JWT_TOKEN) {
    location.replace("/auth/login")
  }
}
