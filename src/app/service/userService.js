import ApiService from '../apiservice'

import ValidationError from '../exception/ValidationError'

class UserService extends ApiService {

    constructor(){
        super('/api/user')
    }

    authenticate(credentials){
        return this.post('/authenticate', credentials)
    }

    getUserBalance(id){
        return this.get('/balance/${id}');
    }

    save(user){
        return this.post('', user);
    }

    validate(user){
        const error = []

        if(!user.name){
            error.push('The name field is required.')
        }

        if(!user.email){
            error.push('The email field is required.')
        }else if( !user.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            error.push('Please provide a valid Email.')
        }

        if(!user.password || !user.passwordRepeat){
            error.push('Enter password 2x.')
        }else if( user.password !== user.passwordRepeat ){
            error.push('Enter password 2x.')
        }    

        if(error && error.length > 0){
            throw new ValidationError(error);
        }
    }

}

export default UserService;