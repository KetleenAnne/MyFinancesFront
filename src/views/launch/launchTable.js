import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.launch.map( launch => {
        return (
            <tr key={launch.id}>
                <td>{launch.description}</td>
                <td>{ currencyFormatter.format(launch.value, { locale: 'pt-BR'}) }</td>
                <td>{launch.launchType}</td>
                <td>{launch.month}</td>
                <td>{launch.launchStatus}</td>
                <td>
                    <button className="btn btn-success" title="Effect"
                            disabled={ launch.launchStatus !== 'PENDING' }
                            onClick={e => props.changeStatus(launch, 'EFFECTED')} 
                            type="button">
                            <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning"  title="Cancel"
                            disabled={ launch.launchStatus !== 'PENDING' }
                            onClick={e => props.changeStatus(launch, 'CANCELED')} 
                            type="button">
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button"   title="Edit"
                            className="btn btn-primary"
                            onClick={e => props.editAction(launch.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Delete"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(launch)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Value</th>
                    <th scope="col">Type</th>
                    <th scope="col">Month</th>
                    <th scope="col">Situation</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
