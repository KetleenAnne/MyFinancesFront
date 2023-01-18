import LocalStorageService from './localStorageService'

import jwt from 'jsonwebtoken'
import ApiService from '../apiservice'

export const LOGGED_USER = '_logged_user'
export const TOKEN = 'access_token'

export default class AuthService {

    static isAuthenticatedUser(){
        const token = LocalStorageService.getItem(TOKEN)
        if(!token){
            return false;
        }
        const decodedToken = jwt.decode(token)
        const expiration = decodedToken.exp

        const isInvalidToken = Date.now() >= (expiration * 1000)

        return !isInvalidToken;
    }

    static removeAuthenticatedUsero(){
        LocalStorageService.removeItem(LOGGED_USER)
        LocalStorageService.removeItem(TOKEN);
    }

    static login(user, token){
        LocalStorageService.addItem(LOGGED_USER, user)
        LocalStorageService.addItem(TOKEN, token);
        ApiService.registerToken(token)
    }

    static getAuthenticatedUser(){
        return LocalStorageService.getItem(LOGGED_USER);
    }

    static refreshSession(){
        const token  = LocalStorageService.getItem(TOKEN)
        const user = AuthService.getAuthenticatedUser()
        AuthService.login(user, token)
        return user;
    }

}