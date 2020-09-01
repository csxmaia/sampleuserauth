import React, {useState, useEffect} from 'react'
import jwtDecode from 'jwt-decode'

import Template from '../components/template'
import './styles.css'

const theme = "is-primary is-bold"

export default function Main (){
  
  const [user, setUser] = useState("")
  const [isLogged, setIsLogged] = useState(false) 
  const [isLoaded, setIsLoaded] = useState(false)

  // const [state, setState] = useState({
  //   isLogged: undefined,
  //   isLoaded: false
  // })

  useEffect(() => {
    async function loadPage(){
      const token = localStorage.getItem('SUS_TOKEN')
      if (!token) {
        setIsLogged(false)
        setIsLoaded(true)
        return undefined
      }
      const userJwt = jwtDecode(token)
      setUser(userJwt)
      setIsLogged(true)
      setIsLoaded(true)
    }
    loadPage()
  },[])

  return(
    isLoaded && isLogged !== undefined ? 
        <Template themeParams={theme}>
          <div className="hero-body">
            {isLogged?
              <h2>AUTENTICADO: ({user.username})</h2>
              :
              <h2>NÃO AUTENTICADO</h2>
            }
            <div className="container">
              <h1 className="title">Simple User Sample</h1>
              <h2 className="subtitle">NodeJs, Express, bCrypt, JWT, SequelizeORM and React</h2>
            </div>
          </div>
        {/* <div className="hero is-dark is-bold">
          <div className="hero-body">
          <div className="container">
          <h2 className="title">Functions</h2>
          </div>
          </div>
        </div> */}
        </Template>
    :
      <div>
        <h2>Loading</h2>
      </div>
  )
}