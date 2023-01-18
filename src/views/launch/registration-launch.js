import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import { withRouter } from 'react-router-dom'
import * as message from '../../components/toastr'

import LaunchService from '../../app/service/launchService'
import LocalStorageService from '../../app/service/localStorageService'

class RegistrationLaunch extends React.Component {

    state = {
        id: null,
        description: '',
        value: '',
        month: '',
        year: '',
        type: '',
        status: '',
        user: null,
        updating: false
    }

    constructor(){
        super();
        this.service = new LaunchService();
    }

    componentDidMount(){
        const params = this.props.match.params
       
        if(params.id){
            this.service
                .findById(params.id)
                .then(response => {
                    this.setState( {...response.data, updating: true} )
                })
                .catch(error => {
                    message.messageError(error.response.data)
                })
        }
    }

    submit = () => {
        const userLoggedIn = LocalStorageService.getItem('userLoggedIn')

        const { description, value, month, year, type } = this.state;
        const launch = { description, value, month, year, type, user: userLoggedIn.id };

        try{
            this.service.validate(launch)
        }catch(error){
            const message = error.message;
            message.forEach(msg => message.messageError(msg));
            return false;
        }     

        this.service
            .save(launch)
            .then(response => {
                this.props.history.push('/consult-launch')
                message.messageSuccess('Launch successfully registered!')
            }).catch(error => {
                message.messageError(error.response.data)
            })
    }

    update = () => {
        const { description, value, month, year, type, status, user, id } = this.state;

        const launch = {description, value, month, year, type, status, user, id };
        
        this.service
            .update(launch)
            .then(response => {
                this.props.history.push('/consult-launch')
                message.messageSuccess('Launch updated successfully!')
            }).catch(error => {
                message.messageError(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    render(){
        const launchTypes = this.service.getTypeList();
        const months = this.service.getListMonths();

        return (
            <Card title={ this.state.updating ? 'Launch update'  : 'Launch Registration' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescription" label="Description: *" >
                            <input id="inputDescription" type="text" 
                                   className="form-control" 
                                   name="description"
                                   value={this.state.description}
                                   onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputYear" label="Year: *">
                            <input id="inputYear" 
                                   type="text"
                                   name="year"
                                   value={this.state.year}
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMonth" label="Month: *">
                            <SelectMenu id="inputMonth" 
                                        value={this.state.month}
                                        onChange={this.handleChange}
                                        lista={months} 
                                        name="month"
                                        className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                         <FormGroup id="inputValue" label="Value: *">
                            <input id="inputValue" 
                                   type="text"
                                   name="value"
                                   value={this.state.value}
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                         <FormGroup id="inputType" label="Typo: *">
                            <SelectMenu id="inputTypo" 
                                        lista={launchTypes} 
                                        name="tipo"
                                        value={this.state.typo}
                                        onChange={this.handleChange}
                                        className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                         <FormGroup id="inputStatus" label="Status: ">
                            <input type="text" 
                                   className="form-control" 
                                   name="status"
                                   value={this.state.status}
                                   disabled />
                        </FormGroup>
                    </div>

                   
                </div>
                <div className="row">
                     <div className="col-md-6" >
                        { this.state.updating ? 
                            (
                                <button onClick={this.update} 
                                        className="btn btn-success">
                                        <i className="pi pi-refresh"></i> Update
                                </button>
                            ) : (
                                <button onClick={this.submit} 
                                        className="btn btn-success">
                                        <i className="pi pi-save"></i> Save
                                </button>
                            )
                        }
                        <button onClick={e => this.props.history.push('/consult-launch')} 
                                className="btn btn-danger">
                                <i className="pi pi-times"></i>Cancel
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(RegistrationLaunch);