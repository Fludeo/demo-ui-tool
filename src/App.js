
import './App.css';
import "reveal.js/dist/reveal.css";
import { useSlides } from './context/SlidesProvider';
import ReactDOMServer from "react-dom/server";
import { useState } from 'react';

const Presentation = () => {
  return <> 
   <link rel="stylesheet" href="reveal.css"/>
  <div style={{height:'100%',width:'100%'}} className='reveal' >
  <div className="slides"  >
    <section>
        <h1>Slide 1</h1>
        <aside className="notes">
            Shhh, these are your private notes 📝
        </aside>
  </section>
    <section><h1>Slide 2</h1></section>
    <section><h1>Slide 3</h1></section>
  </div>
  </div> 
  <script src='reveal.js'></script>
<script>
  Reveal.initialize()
</script>
  </>
}


function App() {

const { slideService ,start, close} = useSlides()
const [slideView,setSlideView] = useState(null)
const addSlide = () =>{
  if(!slideView) return
  
  console.log(slideView.document.querySelector('.slides'))
}

const open = () =>{
  const componentHtml = ReactDOMServer.renderToString(<Presentation />);
  const presentation = window.open('','','width=600,height=400')
  presentation.document.write( componentHtml )
  setSlideView(presentation)
  start()
}

  return (
    <div style={{width:'100%', height:'100vh'}}>
      <button onClick={()=> {slideService ? close() : open()} }> {slideService ? "close" : "start"} </button>
    { slideService && <button onClick={()=>slideService.togglePause()}>{ slideService.isPaused ?'play':'stop'}</button>}
     <button onClick={addSlide} >addSlide</button>
    </div>
  );
}

export default App;
