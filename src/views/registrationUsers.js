import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import UserService from '../app/service/userService'
import { messageSuccess, messageError } from '../components/toastr'

class RegistrationUsers extends React.Component{

    state = {
        name : '',
        email: '', 
        password: '',
        passwordRepeat : ''
    }

    constructor(){
        super();
        this.service = new UserService();
    }

    register = () => {

        const {name, email, password, passwordRepeat } = this.state        
        const user = {name,  email, password, passwordRepeat }

        try{
            this.service.validate(user);
        }catch(error){
            const msgs = error.message;
            msgs.forEach(msg => messageError(msg));
            return false;
        }

        this.service.save(user)
            .then( response => {
                messageSuccess('User successfully registered! Log in to access the system.')
                this.props.history.push('/login')
            }).catch(error => {
                messageError(error.response.data)
            })
    }

    cancel = () => {
        this.props.history.push('/login')
    }

    render(){
        return (
            <Card title="User registration">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Name: *" htmlFor="inputName">
                                <input type="text" 
                                       id="inputName" 
                                       className="form-control"
                                       name="name"
                                       onChange={e => this.setState({name: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                       id="inputEmail"
                                       className="form-control"
                                       name="email"
                                       onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Password: *" htmlFor="inputPassword">
                                <input type="password" 
                                       id="inputPassowrd"
                                       className="form-control"
                                       name="password"
                                       onChange={e => this.setState({password: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Repeat password: *" htmlFor="inputPasswordRepeat">
                                <input type="password" 
                                       id="inputPasswordRepeat"
                                       className="form-control"
                                       name="password"
                                       onChange={e => this.setState({passwordRepeat: e.target.value})} />
                            </FormGroup>
                            <button onClick={this.register} type="button" className="btn btn-success">
                                <i className="pi pi-save"></i> Save
                            </button>
                            <button onClick={this.cancel} type="button" className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(RegistrationUsers)