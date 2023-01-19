import React from 'react'

import NavbarItem from './navbarItem'
import { AuthConsumer } from '../main/authenticationProvider'

function Navbar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="/home" className="navbar-brand">My Finances</a>
          <button className="navbar-toggler" type="button" 
                  data-toggle="collapse" data-target="#navbarResponsive" 
                  aria-controls="navbarResponsive" aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem render={props.isUserAuthenticated} href="/home" label="Home" />
                <NavbarItem render={props.isUserAuthenticated} href="/registration-users" label="User" />
                <NavbarItem render={props.isUserAuthenticated} href="/consult-launch" label="Launch" />
                <NavbarItem render={props.isUserAuthenticated} onClick={props.logout} href="/login" label="Sair" />
            </ul>
            </div>
        </div>
      </div>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <AuthConsumer>
    {(context) => (
        <Navbar isUserAuthenticated={context.isAuthenticated} logout={context.closeSession} />
    )}
  </AuthConsumer>
)