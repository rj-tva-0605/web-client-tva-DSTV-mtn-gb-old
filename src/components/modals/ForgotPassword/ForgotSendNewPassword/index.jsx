

// validate user exist and generate OTP  
// before we proceed with forgot password logic


import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import  './style.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';




const ForgotSendNewPassword = ({
                                  showSendNewPassword,
                                  setShowSendNewPassword,
                                  ShowUserIDForgotPsswd,
                                  passForgotVerifyNumber
                                }) => {
  
  const getDateTimeUniqueString = () => {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+month+day+hour+minute+second; 
    let  uniquestring= String(dateTime)
  
     return uniquestring;
}


  const dispatch = useDispatch();
  const history = useHistory();




  const [password, setPassword]= useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifyError, setNotifyError] = useState("");

  
  const handleClose = (e) => setShowSendNewPassword(false);
  // const handleMobileNumber = (e) => setMobileNumber(passForgotVerifyNumber);
  const handlePassword = (e) =>{setPassword(e.target.value); setNotifyError("")}
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    
  
    
  const submitPassword = (e) =>{
    if (password === confirmPassword){
  e.preventDefault();
      
      let uniquestring = getDateTimeUniqueString()
      console.log("Uniquestring", uniquestring)
      var data = JSON.stringify({
                "SELFCARERESETPASSWORD": {
                "USERID": "129", "NEWPASSWORD": "1234567", "CONFIRMPASSWORD": "1234567"
                } 
        });

      var config = {
        method: 'post',
        url: `https://tvanywheretest-ott.magnaquest.com/webapi/Restapi/SelfcareResetPasswordJSON?ReferenceNo=17412xzs123${uniquestring}`,
        headers: { 
          'Username': 'MTNGBUCWEBUSR', 
          'Password': 'Mtngbpass@1234', 
          'Externalparty': 'tvanywhere-mtngb', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log("Send forgot password requests form finally ", response.data);
        handleClose()
      })
      .catch(function (error) {
        console.log(error);
      });
    }else {setNotifyError("Password Mismatch")}

      
    }
    
   

  

    
    

    
    return (
      <div>    
        
        <Modal
          show={showSendNewPassword}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className = "signup-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
                <h1 style={{textAlign: "center"}}>Forgot Password</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
             

             <form className="signup-form" onSubmit={submitPassword}>
               {notifyError=== ""?
                <p style={{width: "40%", margin: "20px auto"}}> Enter New Password </p>
                :
                <p style={{width: "40%", margin: "20px auto"}}> {notifyError} </p>
                }
                <div class="form-group">
                    <input type="text" class="form-control" value={password} placeholder="New Password" onChange={(e) => handlePassword(e)}/>
                </div>
                <br /> 
                <div class="form-group">
                    <input type="text" class="form-control" value={confirmPassword} placeholder="Confirm New Password" onChange={(e) => handleConfirmPassword(e)}/>
                </div>
                <br/>
                <Button className= "rounded-sm shadow-none form-control" type="submit"  >Submit</Button>
                <br />
                <br />
            </form>
            <p className=" signup-link "><small>Already have an account?<a href="">Sign up now</a></small></p>
          </Modal.Body>
          
        </Modal>  
      </div>
    );
  }

  export default ForgotSendNewPassword

