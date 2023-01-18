

import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UserService from '../app/service/userService'

import { AuthContext  } from '../main/authenticationProvider'
import { messageError } from '../components/toastr'

class Login extends React.Component{

    state = {
        email: '',
        password: ''
    }

    constructor(){
        super();
        this.service = new UserService();
    }

    enter = () => {
        this.service.authenticate({
            email: this.state.email,
            password: this.state.password,
        }).then( response => {
            this.context.startSession(response.data)
            this.props.history.push('/home')
        }).catch( error => {
           messageError(error.response.data)
        })
    }

    prepareRegister = () => {
        this.props.history.push('/registration-users')
    }

    render(){
        return (

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Enter the Email" />
                                            </FormGroup>
                                            <FormGroup label="Password: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                        value={this.state.password}
                                                        onChange={e => this.setState({password: e.target.value})}
                                                        className="form-control" 
                                                        id="exampleInputPassword1" 
                                                        placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={this.enter} className="btn btn-success">
                                                <i className="pi pi-sign-in"></i>Enter</button>
                                            <button onClick={this.prepareRegister} 
                                                    className="btn btn-danger">
                                                    <i className="pi pi-plus"></i>  Register
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}

Login.contextType = AuthContext

export default withRouter( Login )