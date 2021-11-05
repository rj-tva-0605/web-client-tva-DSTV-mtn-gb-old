import { REFRESH_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "./types";


export function refreshTokenAction(data){
    
    return{
        type: REFRESH_SUCCESS,
        payload: data
    }
}

export function signup(data){

    return{
        type: SIGNUP_SUCCESS,
        payload: data
    }
}

export function signupError(){

    return{
        type: SIGNUP_ERROR
    }
}


export function login(data){

    return{
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export function loginError(data){

    return{
        type: LOGIN_ERROR,
        payload: data
    }
}


export function logout(){

    return{
        type: LOGOUT
    }
}