
import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';

import { logoutReducer } from "store/reducers/authReducer";


import logo from '../../assets/images/tv_anywhere_logo.png';

import {Button} from 'react-bootstrap';

import VerifyUserExistRegisterModal from '../../components/modals/VerifyUserExistRegister';
import ValidateOTPNewUserModal from '../../components/modals/ValidateOTPNewUser';

import LoginModal from '../../components/modals/Login';

import './Homepage.css';


const Homepage = () => {

  

    const [showlogin, setShowLogin] = useState(false);

    const [showVerifyUserExist, setShowVerifyUserExist] = useState(false);
    const [showValidateOTP, setShowValidateOTP] = useState(false);
    const [passVerifyNumber, setPassVerifyNumber] = useState("");


  
    

    const handleShowVerifyUserExist  = () => setShowVerifyUserExist(true);

    const handleShowValidateOTP  = () =>{ setTimeout(function(){ setShowValidateOTP(true); }, 10);

                                            }
    if(showVerifyUserExist === "verifyuserdonenextprocess"){
        handleShowValidateOTP()
        setShowVerifyUserExist(false)
    }

    const handleLoginShow  = () => setShowLogin(true);
    

    
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn)

    const handleLogout = () =>{
        dispatch(logoutReducer())
    }

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
                                            <LoginModal showlogin={showlogin} setShowLogin={setShowLogin} />
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
                                    <input  type="text" pattern="[0-9]*" formcontrolname="mobile" aria-describedby="gloMobileNumber" placeholder="GXXX Mobile Number eg.080XXXXXXX" class="form-control shadow-none px-4 py-3 input_phone sign-up-inp-hme-slct-a"></input>
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
                                    <p>Stream over 130 channels free. Upgrade to the ultimate TV experience to watch and record local shows, news and sports.</p>
                                </div>
                                <div className="main-flex-cards rounded ">
                                <div className="regis-apple">
                                    <h2 ><i className="fa fa-apple"/>  <strong>Apple Store </strong> </h2><i class="fa fa-registered " />
                                </div> 
                                    <br/>
                                    <p>Stream over 20,000 free on-demand movies and shows from Warner Brothers, Crackle, Lionsgate, MGM and more. </p>
                                </div>
                                <div className="main-flex-cards">
                                <h2><i className="fa fa-android"/>  <strong>Android</strong></h2>
                                    <br/>
                                    <p>Curate and stream your personal collection of movies, TV, music and photos anywhere on all your devices.</p>
                                </div>
                            </div>

                        </div>

                            



                    </div>
        </div>

    )
}

export default Homepage;