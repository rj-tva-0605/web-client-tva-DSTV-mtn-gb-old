import axios from 'axios';

// import { useDispatch } from 'react-redux';

import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REFRESH_SUCCESS } from '../actions/types';

import {signup, login, loginError, logout, signupError, refreshTokenAction} from 'store/actions';

import {createCookie} from 'utils/cookie_helper';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const initialState = {
  isUserLoggedIn: false,
  messageLoginError: "",
  accessToken: "",

};

// const dispatch = useDispatch();



export const refreshAccessToken = (token) => (dispatch) => {

  var data = {
    "refresh_token": token
  }
      var config = {
        method: 'post',
        url: 'https://ott.tvanywhereafrica.com:28182/api/client/v1/global/refresh',
        headers: { 
          'Authorization': 'Basic bXEtb3BlcmF0b3I6bWFnbmEtcXVlc3QzMjE=', 
          'Content-Type': 'application/json'
        },
        data : data
      };

     


      axios(config)
      .then((response) => {
        cookies.set("refresh_token", response.data.data.refresh_token)
        cookies.set("access_token", response.data.data.access_token)

        dispatch(refreshTokenAction(response.data.data))
        console.log(JSON.stringify(response.data))
      })
      .catch(error => console.error(`Error: ${error}`));
}







export const loginReducer = (data) => (dispatch)  => {

    var config = {
        method: 'post',
        url: 'https://ott.tvanywhereafrica.com:28182/api/client/v1/global/login',
        headers: { 
          'Authorization': 'Basic bXEtb3BlcmF0b3I6bWFnbmEtcXVlc3QzMjE=', 
          'Content-Type': 'application/json'
        },
        data : data
      };

     


      axios(config)
      .then((response) => {
          if(response.data.data.operator_uid == "mtngb"){
              cookies.set("refresh_token", response.data.data.refresh_token)
              cookies.set("access_token", response.data.data.access_token)
              cookies.set('user_id', response.data.data.user_id)
              cookies.set("operator_uid", response.data.data.operator_uid)
              
              dispatch(login(response.data.data))
          }
          else{
              dispatch(loginError(response.data.data))
            console.log("Authreducer", process.env.OPERATOR_UID_FROM_ENV)
          }
        

        console.log(JSON.stringify(response.data))
        

      })
      .catch(error => console.error(`Error: ${error}`));

}

export const signupReducer = (data) => (dispatch)  => {

  
    dispatch(signup(data))

  

}



export const logoutReducer = () =>(dispatch) => {

    // hit csms api and logout
    

    var accessToken = cookies.get("access_token")

    var config = {
      method: 'post',
      url: 'https://ott.tvanywhereafrica.com:28182/api/client/v1/global/logout',
      headers: { 
        'Authorization': `Bearer ${accessToken}`
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      console.log("now logged out on csms we can now logout on app")
      dispatch(logout())
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
    //then hit the logout action 
    

}

const authReducer = (state = initialState, action) => {
    switch (action.type){ 
        case REFRESH_SUCCESS:
            return {
                ...state,
                isUserLoggedIn: true,
                accessToken: action.payload.access_token
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isUserLoggedIn: true,
                messageLoginError: "newdashboard",
                accessToken: action.payload.access_token 
            };
        case LOGIN_ERROR:
        return {
            ...state,
            isUserLoggedIn: false,
            messageLoginError: "",
            accessToken: action.payload.access_token 
        };
        case LOGOUT:
          cookies.remove("refresh_token")
          cookies.remove("access_token")
          cookies.remove("user_id")
          cookies.remove("operator_uid")
          return{
            ...state,
            isUserLoggedIn: false,
            accessToken: ""
          }
        case SIGNUP_SUCCESS:
          return{
            ...state,
            isUserSignedUp: true,
            
          };
        default:
            return state;
     }
};

export default authReducer;