import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import RegistrationUsers from '../views/registrationUsers'
import ConsultLaunch from '../views/launch/consult-launch'
import RegistrationLaunch  from '../views/launch/registration-launch'
import LandingPage from '../views/landingPage'
import { AuthConsumer } from './authenticationProvider'

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'

function AuthenticatedRoute( { component: Component, isUserAuthenticated, ...props } ){
    return (
        <Route exact {...props} render={ (componentProps) => {
            if(isUserAuthenticated){
                return (
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname : '/login', state : { from: componentProps.location } } } />
                )
            }
        }}  />
    )
}

function Routes(props){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration-users" component={RegistrationUsers} />
                
                <AuthenticatedRoute isUserAuthenticated={props.isUserAuthenticated} path="/home" component={Home} />
                <AuthenticatedRoute isUserAuthenticated={props.isUserAuthenticated} path="/consult-launch" component={ConsultLaunch} />
                <AuthenticatedRoute isUserAuthenticated={props.isUserAuthenticated} path="/registration-launch/:id?" component={RegistrationLaunch} />
            </Switch>
        </BrowserRouter>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <AuthConsumer>
        { (context) => (<Routes isUserAuthenticated={context.isAuthenticated} />) }
    </AuthConsumer>
)