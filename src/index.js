import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ModalProvider } from './context/ModalProvider';
import { Auth0Provider } from '@auth0/auth0-react';
/*
***redirectUri***
const host = () => process.env.REACT_APP_HOST || ''
const redirectUri = () => `${host()}/callback`
... redirectUri={redirectUri()}
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-dvtz37tka5qg5otg.au.auth0.com'
      clientId='Oxu80bovqJonFYk2blo1pGmx29FOi9dg'
      scope='openid profile create email'
      audience='https://prode-api/'
      redirectUri={window.location.origin}
    >
      <ModalProvider>
        <App />
      </ModalProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
