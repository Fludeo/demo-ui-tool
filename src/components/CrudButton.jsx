import '../styles/CrudButton.css'

const CrudButton = ({text, action, type}) => {
   return <p onClick={()=>action()} className={`crud-button-${type} crud-button-${type}--hover`}>{text}</p>
}

export default CrudButton