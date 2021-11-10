
import {combineReducers} from "redux";
import authReducer from "./authReducer";
import sessionReducer from "./sessionReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    sesh: sessionReducer
})

export default rootReducer;