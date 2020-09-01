import React from 'react'
import Navbar from './navbar'

export default function Template(props) {
  return(
    <div className={`hero ${props.themeParams} is-fullheight`}>
      <Navbar themeParams={props.themeParams}/>
      {props.children}
    </div>
  )
}