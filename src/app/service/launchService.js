import ApiService from '../apiservice'

import ValidationError from '../exception/ValidationError'

export default class LaunchService extends ApiService {

    constructor(){
        super('/api/launch')
    }

    getListMonths(){
        return  [
            { label: 'Select...', value: '' },
            { label: 'January', value: 1 },
            { label: 'February', value: 2 },
            { label: 'March', value: 3 },
            { label: 'April', value: 4 },
            { label: 'May', value: 5 },
            { label: 'June', value: 6 },
            { label: 'July', value: 7 },
            { label: 'August', value: 8 },
            { label: 'September', value: 9 },
            { label: 'October', value: 10 },
            { label: 'November', value: 11 },
            { label: 'December', value: 12 },
        ]
    }

    getTypeList(){
        return  [
            { label: 'Select...', value: '' },
            { label: 'Expense' , value : 'EXPENSE' },
            { label: 'Revenue' , value : 'REVENUE' }
        ]

    }

    getById(id){ //atenção
        return this.get('/get/{id}');
    }

    changeStatus(id, status){
        return this.put('/update-status/{id}', { status })
    }

    validate(launch){
        const errors = [];

        if(!launch.year){
            errors.push("Enter the Year.")
        }

        if(!launch.month){
            errors.push("Enter the month.")
        }

        if(!launch.description){
            errors.push("Enter the Description.")
        }

        if(!launch.value){
            errors.push("Enter the Value.")
        }

        if(!launch.type){
            errors.push("Enter the Type.")
        }

        if(errors && errors.length > 0){
            throw new ValidationError(errors);
        }
    }

    save(launch){
        return this.post('/save', launch);
    }

    update(launch){
        return this.put('/update/{launch.id}', launch);
    }

    search(launchFilter){
        let params = '?year={launchFilter.year}'

        if(launchFilter.month){
            params = '{params}&month={launchFilter.month}'
        }

        if(launchFilter.type){
            params = '{params}&type={launchFilter.type}'
        }

        if(launchFilter.launchStatus){
            params = '{params}&launchStatus={launchFilter.launchStatus}'
        }

        if(launchFilter.user){
            params = '{params}&user={launchFilter.user}'
        }

        if(launchFilter.description){
            params = '{params}&description={launchFilter.description}'
        }

        return this.get(params);
    }

    delete(id){
        return this.delete('/delete/{id}')
    }
}