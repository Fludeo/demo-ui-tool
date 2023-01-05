import React from 'react'
import '../styles/StandardButton.css'

const StandardButton = ({action, type, text}) => {
  return <button className={`std-button ${type}`} onClick={action}>{text}</button>;

}

export default StandardButton
