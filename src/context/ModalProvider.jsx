import {  createContext, useContext, useState } from "react"
import '../styles/modal.css'

const ModalContext = createContext()

const useModal = () =>{
   return useContext(ModalContext)
}



const ModalProvider =  ({children}) =>{
    const [isOpen, setIsOpen] = useState(false);
    const [component, setComponent] = useState(null);
  
    const triggerModal = (component) => {
      setComponent(component);
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setComponent(null);
      setIsOpen(false);
    };

    const display = isOpen ? "modal is-open" : "modal modal-closed";

    const services = {closeModal,triggerModal}
    return <ModalContext.Provider value={services}>
        { children }
        <div className={display} onClick={() => closeModal()}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          {component}
        </div>
      </div>
    </ModalContext.Provider>
}



export  {ModalProvider, useModal}