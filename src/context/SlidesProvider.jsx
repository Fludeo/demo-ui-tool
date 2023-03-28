import {  createContext, useContext, useEffect, useState } from "react"
import Reveal from "reveal.js"
const SlidesContext = createContext()

const useSlides = () =>{
   return useContext(SlidesContext)
}



const SlidesProvider =  ( { children } ) =>{
  const [slideService,setSlideService] = useState(null)

  const start = () =>{
  const revealInstance = new Reveal() 
  
  setSlideService(revealInstance)
  }

  const close = () =>{
      slideService.destroy()
      setSlideService(null)
  }
useEffect(()=>{
 if(!setSlideService)return
  

},[slideService])

    return <SlidesContext.Provider value={{slideService, start,close }}>
       {children}
    </SlidesContext.Provider>
}



export  { SlidesProvider, useSlides}