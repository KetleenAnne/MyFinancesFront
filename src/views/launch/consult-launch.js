import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LaunchTable from './launchTable'
import LaunchService from '../../app/service/launchService'
import LocalStorageService from '../../app/service/localStorageService'

import * as message from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';



class ConsultLaunch extends React.Component {

    state = {
        year: '',
        month: '',
        typo: '',
        description: '',
        showConfirmDialog: false,
        launchDelete: {},
        launch : []
    }

    constructor(){
        super();
        this.service = new LaunchService();
    }

    search = () => {
        if(!this.state.year){
            message.messageError('Completing the Year field is mandatory.')
            return false;
        }

        const userLoggedIn = LocalStorageService.getItem('_user_loggedIn');

        const launchFilter = {
            year: this.state.year,
            month: this.state.month,
            type: this.state.type,
            description: this.state.description,
            user: userLoggedIn.id
        }

        this.service
            .consultar(launchFilter)
            .then( answer => {
                const list = answer.data;
                
                if(list.length < 1){
                    message.alertMessage("No results found.");
                }
                this.setState({ launchFilter: list })
            }).catch( error => {
                console.log(error)
            })
    }

    edit = (id) => {
        this.props.history.push('/registration-launch/{id}')
    }

    openConfirmation = (launch) => {
        this.setState({ showConfirmDialog : true, launchDelete: launch  })
    }

    cancelDeletion = () => {
        this.setState({ showConfirmDialog : false, launchDelete: {}  })
    }

    delete = () => {
        this.service
            .delete(this.state.launchDelete.id)
            .then(response => {
                const launch = this.state.launch;
                const index = launch.indexOf(this.state.launchDelete)
                launch.splice(index, 1);
                this.setState( { launch: launch, showConfirmDialog: false } )
                message.messageSuccess('Launch successfully deleted!')
            }).catch(error => {
                message.messageError('An error occurred while trying to delete the Entry!')
            })
    }

    prepareCadastroForm = () => {
        this.props.history.push('/registration-launch')
    }

    changeStatus = (launch, status) => {
        this.service
            .changeStatus(launch.id, status)
            .then( response => {
                const launch = this.state.launch;
                const index = launch.indexOf(launch);
                if(index !== -1){
                    launch['status'] = status;
                    launch[index] = launch
                    this.setState({launch});
                }
                message.messageSuccess("Status updated successfully!")
            })
    }

    render(){
        const months = this.service.getListMonths();
        const types = this.service.getListMonths();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirm" icon="pi pi-check" onClick={this.delete} />
                <Button label="Cancel" icon="pi pi-times" onClick={this.cancelDeletion} 
                        className="p-button-secondary" />
            </div>
        );

        return (
            <Card title="ConsultLaunch">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputYear" label="Year: *">
                                <input type="text" 
                                       className="form-control" 
                                       id="inputYear" 
                                       value={this.state.year}
                                       onChange={e => this.setState({year: e.target.value})}
                                       placeholder="Type the Year" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMonth" label="Month: ">
                                <SelectMenu id="inputMonth" 
                                            value={this.state.month}
                                            onChange={e => this.setState({ month: e.target.value })}
                                            className="form-control" 
                                            lista={months} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDescription" label="Description: ">
                                <input type="text" 
                                       className="form-control" 
                                       id="inputDescription" 
                                       value={this.state.description}
                                       onChange={e => this.setState({description: e.target.value})}
                                       placeholder="enter the description" />
                            </FormGroup>

                            <FormGroup htmlFor="inputType" label="Tipo Lançamento: ">
                                <SelectMenu id="inputType" 
                                            value={this.state.type}
                                            onChange={e => this.setState({ type: e.target.value })}
                                            className="form-control" 
                                            lista={types} />
                            </FormGroup>

                            <button onClick={this.search} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-search"></i> Search
                            </button>
                            <button onClick={this.prepareCadastroForm} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className="pi pi-plus"></i> Register
                            </button>

                        </div>
                        
                    </div>
                </div>   
                <br/ >
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LaunchTable launch={this.state.launch} 
                                              deleteAction={this.openConfirmation}
                                              editAction={this.edit}
                                              changeStatus={this.changeStatus} />
                        </div>
                    </div>  
                </div> 
                <div>
                    <Dialog header="Confirmation" 
                            visible={this.state.showConfirmDialog} 
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter} 
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Do you confirm the deletion of this Release?
                    </Dialog>
                </div>           
            </Card>

        )
    }
}

export default withRouter(ConsultLaunch);