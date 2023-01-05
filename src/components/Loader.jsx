import React from 'react'
import '../styles/Loader.css'

const Loader = () => {
  return (
   <div className="loadercontainer">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader
