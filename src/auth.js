import api from "./services/api"

export async function isAuthenticated() {
  try {
    //get token from browser local storage
    const token = localStorage.getItem('SUS_TOKEN')
    //if doesnt has a token, do return before fetch auth api 
    if (!token) {
      return {
        success: false
      }
    }
    //do a fetch to the api with token at headers
    const response = await api.get('/auth/verify', { headers: { token: token } })
    return response.data
    
  } catch (error) {
    //only catch if the verify respose an error by catch inside of insider error
    localStorage.removeItem('SUS_TOKEN')
    return error.response.data
  }
}

export async function doLogin(username, password) {
  try {
    const response = await api.post('/login', {
      username,
      password
    })
    if (!response.data.token) return { status: 404, statusText: "No token recieved" }
    
    localStorage.setItem("SUS_TOKEN", response.data.token)

    return { token: response.data.token, status: response.status, statusText: response.statusText }

  } catch (error) {
    return error.response
  }
  // return notif
}

export async function doLogout() {
  localStorage.removeItem('SUS_TOKEN')
  window.location.reload()
}
