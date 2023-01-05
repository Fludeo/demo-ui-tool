import React from 'react'
import '../styles/StandardButton.css'

const StandardButton = ({action, type}) => {
  return <button className={`std-button ${type}`} onClick={action}>{type}</button>;

}

export default StandardButton
