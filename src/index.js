import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SlidesProvider } from './context/SlidesProvider';


/*
***redirectUri***
const host = () => process.env.REACT_APP_HOST || ''
const redirectUri = () => `${host()}/callback`
... redirectUri={redirectUri()}
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

<SlidesProvider> 
  <App />
</SlidesProvider>
      
       
 
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
