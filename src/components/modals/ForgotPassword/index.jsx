

// validate user exist and generate OTP  
// before we proceed with forgot password logic


import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import  './style.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';




const ForgotPaswordModal = ({
                                  showForgPsswdModal, 
                                  setShowForgPsswdModal,
                                  setShowPassForgotVerifyNumber
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

  const [mobilenumber, setMobileNumber] = useState("");
  const [password, setPassword]= useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const handleClose = (e) => setShowForgPsswdModal(false);
  const handleMobileNumber = (e) => setMobileNumber(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    
    
  
    

  

    const verifyUserExistsfunc = (e) => {
      e.preventDefault();
      let uniquestring = getDateTimeUniqueString()
      console.log("this is unique string", uniquestring)
        // console.log("forgot script", "ADDITIONAL_INFO:{ ENTITYCODE : MTNGB , MOBILENO:" + mobilenumber +"}")
          var data = JSON.stringify({
            "KEY_NAMEVALUE": {
              "KEY_NAME": "PROCESS",
              "KEY_VALUE": "GETUSERID"
            },
            "ADDITIONAL_INFO": "{'ENTITYCODE':'MTNGB','MOBILENO':'09059221879'}"
          });

          var config = {
            method: 'post',
            url: `https://tvanywheretest-ott.magnaquest.com/webapi/Restapi/GetRecordsBySearch?ReferenceNo=17412xzs123${uniquestring}YpjWMi5p0FEEytp`,
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
            console.log("this is from verify if user exists", response.data);
            //OTP function genrated here
            setShowPassForgotVerifyNumber(mobilenumber)
            generateOTPfunc()
            console.log("ERROR NO STATUS CODE LOOK in Messages", response.data.RESPONSEINFO.ERRORNO)
          })
          .catch(function (error) {
            console.log(error);
          });
      setShowForgPsswdModal("verifyuserdonenextprocess")
    }


    const generateOTPfunc = () => {

      let uniquestring = getDateTimeUniqueString()
      var data = JSON.stringify({
        "GENERATEOTP": {
          "MOBILEPHONE": mobilenumber,
          "otpemail": email,
          "PARTYID": "0",
          "COUNTRYCODE": "Guinea-Bissau",
          "RESEND": "TRUE",
          "ATTRIBUTE1": ""
        }
      });

      var config = {
        method: 'post',
        url: `https://tvanywheretest-ott.magnaquest.com/webapi/Restapi/GenerateOTP?ReferenceNo=174${uniquestring}wwwqsrtdq43wq764832`,
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
        console.log("Generate  Otp function ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });


    }
    
    

    
    return (
      <div>    
        
        <Modal
          show={showForgPsswdModal}
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
             

             <form className="signup-form" onSubmit={verifyUserExistsfunc}>
                <p style={{width: "40%", margin: "20px auto"}}> Enter Mobile Number </p>
                <div class="form-group">
                    <input type="text" class="form-control" value={mobilenumber} placeholder="966XXXXXXXX" onChange={(e) => handleMobileNumber(e)}/>
                </div>
                <br /> 
                
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

  export default ForgotPaswordModal

