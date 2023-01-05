import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import StandardButton from './StandardButton';
import '../styles/NavBar.css'

const NavBar = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  const handleLogin = () => {
    console.log(user);
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <>
<header className="navheader">
        <h4 className="project">PRODE PROJECT</h4>
        <div className="auth-info">
        {isAuthenticated? (
          <>
            <img className="auth-avatar" src={user.picture} alt={user.name} />
              <p>welcome {user.email}<strong> {user.email_verified? "✔️  " :'❌' }</strong></p>
          </>
        ):(<></>)}
        </div>
        <div className="auth-button">
        {isAuthenticated? (
            <StandardButton action={handleLogout} type={'danger'}text={'logout'} />
          ) : (<StandardButton action={handleLogin} type={'selected'} text={'login'} />
          )}
        </div>
      </header>
    </>
  )
}

export default NavBar
