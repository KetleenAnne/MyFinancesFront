import React from 'react'

import UserService from '../app/service/userService'
import { AuthContext } from '../main/authenticationProvider'

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.userService = new UserService();
    }

    componentDidMount(){
        const userLoggedIn = this.context.authenticatedUser

        this.userService
            .getUserBalance(userLoggedIn.id)
            .then( response => {
                this.setState({ balance: response.data})
            }).catch(error => {
                console.error(error.response)
            });
    }

    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-3">Welcome!</h1>
                <p className="lead">This is your finance system.</p>
                <p className="lead">I balance for the current month is R$ {this.state.balance} </p>
                <hr className="my-4" />
                <p>And this is your administrative area, use one of the menus or buttons below to navigate through the system.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                    href="/registration-users" 
                    role="button"><i className="pi pi-users"></i>  
                     Register User
                    </a>
                    <a className="btn btn-danger btn-lg" 
                    href="/register-launch" 
                    role="button"><i className="pi pi-money-bill"></i>  
                     Register Launch
                    </a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext;

export default Home