import { REFRESH_SUCCESS, LOGIN_SUCCESS, LOGOUT } from "./types";


export function refreshTokenAction(data){
    
    return{
        type: REFRESH_SUCCESS,
        payload: data
    }
}


export function login(data){

    return{
        type: LOGIN_SUCCESS,
        payload: data
    }
}


export function logout(){

    return{
        type: LOGOUT
    }
}