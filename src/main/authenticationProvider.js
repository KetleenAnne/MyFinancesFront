import React from 'react'

import AuthService from '../app/service/authService'
import jwt from 'jsonwebtoken'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class AuthenticationProvider extends React.Component{

    state = {
        authenticatedUser: null,
        isAuthenticated: false,
        isLoading: true
    }

    startSession = (tokenDTO) => {
        const token = tokenDTO.token
        const claims = jwt.decode(token)
        const user = {
            id: claims.userid,
            name: claims.name
        }
        
        AuthService.login(user, token);
        this.setState({ isAuthenticated: true, authenticatedUser: user })
    }

    closeSession= () => {
        AuthService.removeAuthenticatedUser();
        this.setState({ isAuthenticated: false, authenticatedUser: null})
    }

    async componentDidMount(){
        const isAuthenticated = AuthService.isAuthenticatedUser()
        if(isAuthenticated){
            const user = await AuthService.refreshSession()
            this.setState({
                isAuthenticated: true,
                authenticatedUser: user,
                isLoading: false
            })
        }else{
            this.setState( previousState => {
                return {
                    ...previousState,
                    isLoading: false
                }
            })
        }
    }

    render(){

        if(this.state.isLoading){
            return null;
        }

        const context = {
            authenticatedUser: this.state.authenticatedUser,
            isAuthenticated: this.state.isAuthenticated,
            startSession: this.startSession,
            closeSession: this.closeSession
        }

        return(
            <AuthProvider value={context} >
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default AuthenticationProvider;