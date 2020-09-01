import React from 'react';
import './form.css'

function Form({title, onSubmit, children}){

  return(
    <div className="box" style={{padding: 0}}>
      <div className="head px-3 py-4">
        <strong>{title}</strong>
      </div>

      <form onSubmit={onSubmit}>
        <div className="body px-3 py-3">
          {children}
        </div>
      </form>

    </div>
  )
}

export default Form;