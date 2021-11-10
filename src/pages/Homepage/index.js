
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';

import { logoutReducer } from "store/reducers/authReducer";


import logo from '../../assets/images/mtn-logo.png';

import {Button} from 'react-bootstrap';

import VerifyUserExistRegisterModal from '../../components/modals/VerifyUserExistRegister';
import ValidateOTPNewUserModal from '../../components/modals/ValidateOTPNewUser';

import LoginModal from '../../components/modals/Login';
import ForgotPaswordModal from "components/modals/ForgotPassword";


import './Homepage.css';
import { useHistory } from 'react-router';
import ForgotValidateOTPNewUser from "components/modals/ForgotPassword/ForgotValidateOTPNewUser";

import ForgotSendNewPassword from "components/modals/ForgotPassword/ForgotSendNewPassword";



const Homepage = () => {

  
    const history = useHistory()

    const [showlogin, setShowLogin] = useState(false);

    const [showForgPsswdModal, setShowForgPsswdModal] = useState(false)
    const [showForgPsswdOTPModal, setShowForgPsswdOTPModal] = useState(false)
    const [showForgotValidateOTP, setShowForgotValidateOTP] = useState(false)
    const [passForgotVerifyNumber, setShowPassForgotVerifyNumber] = useState(false)                         




    const [showVerifyUserExist, setShowVerifyUserExist] = useState(false);
    const [showValidateOTP, setShowValidateOTP] = useState(false);
    const [passVerifyNumber, setPassVerifyNumber] = useState("");
    const [loadCurrent, setLoadcurrent] = useState(false)

    const [showUserIDForgotPsswd, setShowUserIDForgotPsswd ] = useState(false)

    const [showSendNewPassword, setShowSendNewPassword] = useState(false)

    const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn)
    const messageLoginError = useSelector(state =>state.auth.messageLoginError)
    

    const handleShowVerifyUserExist  = () => setShowVerifyUserExist(true);

    const handleShowValidateOTP  = () =>{setTimeout(function(){ setShowValidateOTP(true); }, 100) };
    const handleShowForgValidateOTP  = () =>{setTimeout(function(){ setShowForgotValidateOTP(true); }, 100) };
    const handleShowFinalPasswSub = ()=>{setTimeout(function(){setShowSendNewPassword(true)}, 500)}
                                            
    if(showVerifyUserExist === "verifyuserdonenextprocess"){
        handleShowValidateOTP()
        setShowVerifyUserExist(false)
        setLoadcurrent(true)

    
    } 
    if(showForgPsswdModal === "verifyuserdonenextprocess" ){
            handleShowForgValidateOTP();        
            setShowForgPsswdModal(false) ;       
            console.log("forgetModal has done its own")
            setLoadcurrent(true)

    }
    if(showForgotValidateOTP === "verifyuserdonenextprocess" ){
        handleShowFinalPasswSub();        
        setShowForgotValidateOTP(false) ;       
        console.log("forgetModal has done its own")
        setLoadcurrent(true)

}

    const handleLoginShow  = () => setShowLogin(true);
    
    if(!isUserLoggedIn){
        history.push({
            pathname:  "/",
          
                      });
    }else if(isUserLoggedIn){
        history.push({
            pathname:  "/newdashboard",
          
                      });
    }

    
    const dispatch = useDispatch();
    

    const handleLogout = () => dispatch(logoutReducer())
    


    useEffect(() => {
        if(isUserLoggedIn){
            history.push({
                pathname:'/newdashboard'
            })}else{history.push({
                pathname:'/'
            })}
        
        
    }, [])

    return(
        <div className="home-vert-scrollable" >
                    <div className="mainheader">

                        <div className="wrapdiv-on-mainheader">
                            {/* header logo  */}
                            <div className="nav">
                                    <ul class="nav-menu">
                                        <li><img src={logo} className="nav-menu-logo"/></li>
                                        <li>
                                            {!isUserLoggedIn?
                                                <button type="button" class="btn btn-secondary nav-menu-button" onClick={handleLoginShow}>Login</button>                                
                                            :
                                                <button type="button" class="btn btn-danger nav-menu-button " onClick={handleLogout}>Logout</button>
                                            }
                                            <LoginModal showlogin={showlogin} setShowLogin={setShowLogin} showForgPsswdModal={showForgPsswdModal} setShowForgPsswdModal={setShowForgPsswdModal} />
                                            <ForgotPaswordModal 
                                                showForgPsswdModal={showForgPsswdModal} 
                                            
                                                setShowForgPsswdModal={setShowForgPsswdModal} 
                                                setShowForgotValidateOTP = {setShowForgotValidateOTP}
                                                passForgotVerifyNumber = {passForgotVerifyNumber}
                                                setShowPassForgotVerifyNumber={setShowPassForgotVerifyNumber}
                                            />
                                            <ForgotValidateOTPNewUser
                                                showForgPsswdModal={showForgPsswdModal} 
                                                setShowForgPsswdModal={setShowForgPsswdModal}
                                                showForgotValidateOTP={showForgotValidateOTP}
                                                setShowForgotValidateOTP = {setShowForgotValidateOTP}
                                                passForgotVerifyNumber = {passForgotVerifyNumber}
                                                setShowPassForgotVerifyNumber={setShowPassForgotVerifyNumber}
                                                setShowUserIDForgotPsswd = {setShowUserIDForgotPsswd}
                                            />

                                            <ForgotSendNewPassword
                                                passForgotVerifyNumber = {passForgotVerifyNumber}
                                                showUserIDForgotPsswd= {showUserIDForgotPsswd}
                                                showSendNewPassword = {showSendNewPassword}
                                                setShowSendNewPassword = {setShowSendNewPassword}

                                            />
                                        </li>
                                    </ul>
                            </div>

                            {/* hero  div  */}
                            <div>
                                <h1 className="hero-main-text"><strong>Varieties of movies and TV channels available for you</strong></h1>
                                
                                <p class="lead hero-subtext" style={{"letterSpacing": "3px"}}>anywhere . anytime . anyplace</p>
                                <br/>
                                <p  class="mt-2 mb-0 pb-0 hme-signup-text">Ready to watch? Enter your mobile number to Sign Up</p>
                                <form className="header-form sign-up-inp-hme">
                                    <input  type="text" pattern="[0-9]*" formcontrolname="mobile" aria-describedby="gloMobileNumber" placeholder="GXXX Mobile Number eg.966XXXXXXX" class="form-control shadow-none px-4 py-3 input_phone sign-up-inp-hme-slct-a"></input>
                                    <Button className="header-input-button rounded-sm shadow-none form-control  sign-up-inp-hme-slct-b" variant="secondary" onClick={handleShowVerifyUserExist} >Signup</Button>
                                </form>
                                <VerifyUserExistRegisterModal  
                                    showVerifyUserExist={showVerifyUserExist} 
                                    setShowVerifyUserExist={setShowVerifyUserExist} 
                                    setPassVerifyNumber={setPassVerifyNumber}
                                    />

                                <ValidateOTPNewUserModal  
                                    showValidateOTP={showValidateOTP} 
                                    setShowValidateOTP={setShowValidateOTP} 
                                    passVerifyNumber={passVerifyNumber}
                                    setShowVerifyUserExist={setShowVerifyUserExist}
                                    />

                                
                                {/* <p class="frgt-pswd">
                                    <a  style={{textDecoration:"none"}} href="/forgotPassword">Forgot Password?</a>
                                </p> */}
                            </div>
                            {/* hero div ends here  */}

                            {/* the flex cards are here  */}
                            <div className="main-flex-container">
                                <div className="main-flex-cards rounded" >
                                    <h2><strong>Watch Live TV on Web </strong></h2>
                                    <br/>
                                    <p>Stream your live tv and Video Demand on MTN-GB </p>
                                </div>
                                <div className="main-flex-cards rounded ">
                                <div className="regis-apple">
                                    <h2 ><i className="fa fa-apple"/>  <strong>Apple Store </strong> </h2><i class="fa fa-registered " />
                                </div> 
                                    <br/>
                                    <p>Download the app for IOS on the App store . </p>
                                </div>
                                <div className="main-flex-cards">
                                <h2><i className="fa fa-android"/>  <strong>Android</strong></h2>
                                    <br/>
                                    <p>Download the Android app on PlayStore </p>
                                </div>
                            </div>

                        </div>

                            



                    </div>
        </div>

    )
}

export default Homepage;