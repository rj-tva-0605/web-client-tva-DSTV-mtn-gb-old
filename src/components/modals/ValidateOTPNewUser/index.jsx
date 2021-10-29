
import React, { useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import  './ValidateOTPNewUser.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {signupReducer} from '../../../store/reducers/authReducer';




const ValidateOTPNewUser = ({
                              showValidateOTP, 
                              setShowValidateOTP,
                              passVerifyNumber,
                              setShowVerifyUserExist
                              
                            }) => {
    
  const dispatch = useDispatch();
  const history = useHistory();
  const [otpReady, setOtpReady] = useState(false)
  const [counter, setCounter] = useState(85);
  const [loadingOtpNotification,setLoadingOtpNotification] = useState("");
    
  
  const handleClose = (e) => {
                              setShowValidateOTP(false);
                              setCounter(60)
                              
                            }
  

  

    const validateOTPfunc = (e) => {
      e.preventDefault();
      var data = JSON.stringify({
        "VALIDATEOTP": {
          "MOBILEPHONE": "918899889988",
          "OTPEMAIL": "JSONTEST@gmail.com",
          "OTP": otpReady
        }
      });

      var config = {
        method: 'post',
        url: 'https://tvanywheretest-ott.magnaquest.com/webapi/Restapi/ValidateOTP?ReferenceNo=17412xzs123abcwwwqsrtdq43wq764832',
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
        console.log("valid otp function ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      // setOtp(new Array(6).fill(""))

    }

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [otpValue, setOtpValue] = useState([])
    const [count, setCount] = useState(0)
    const [handleOtpValueFuncTrig, setHandleOtpValueFuncTrig] = useState(false)

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        setCount(count + 1)
        
        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
        console.log("This is otp", otp)

        console.log("count value ", count )

        
        // check trend.
        // compare value in setcountcharacter with current count
        // decrement and increment trend clauses and actions
        var countcharacter = [...otp].filter(x => x === "").length;
        console.log("Count Character ", countcharacter);

        var tempConCatOtp = otp.join('')
        console.log("Temp otp Concat ", tempConCatOtp)

        if(countcharacter  === true ){
            // var otpUse = [...otp.map((d, idx) => (d))]
            // console.log("OtpValue", otpUse)
            // setOtpValue(otp)
            // setCount(0)
            setHandleOtpValueFuncTrig(true)
           
            
            handleClose()
        }

        var reCountCharacter = [...otp].filter(x => x === "").length;
        console.log("recountchracter", reCountCharacter)

        if(reCountCharacter === 0){
          console.log("Temp otp Concat ", tempConCatOtp)
        }
    };

    if(handleOtpValueFuncTrig != false ){
        const handleOtpfunc = () => {
          console.log("this is otp value from hadleotpfunc", otp)
          var tempConCatOtp = otp.join('')
          console.log("Temp otp Concat ", tempConCatOtp)
          setOtpReady(tempConCatOtp)
          
        }
        handleOtpfunc()
        
    }



    // resend otp

    const resendOTPfunc = (e) => {
      e.preventDefault();
      
      let  uniquestring= String(getDateTime())
      console.log("Uniquestring", uniquestring)
      var data = JSON.stringify({
          "RESENDOTP":{ 
            "MOBILEPHONE":"918899889988" 
            } 
        });

      var config = {
        method: 'post',
        url: `https://tvanywheretest-ott.magnaquest.com/webapi/Restapi/ResendOTP?ReferenceNo=17412xzs123${uniquestring}`,
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
        console.log("Resend otp function ", response.data);
        setCounter(60)
        setLoadingOtpNotification("Sending OTP ...")
      })
      .catch(function (error) {
        console.log(error);
      });

      // setOtp(new Array(6).fill(""))

    }

    const getDateTime = () => {
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
       return dateTime;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if(counter < 1){
        // console.log("done")
      }else{
      setCounter(counter - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  

  });


  

  

    
    return (
      <div>      
        <Modal
          show={showValidateOTP}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className = "signup-modal"
          centered
        >
         
          <Modal.Body closeButton >

          <h2 >
            Please enter your verification code (OTP)
          </h2>
             
            {!passVerifyNumber ? passVerifyNumber?
                <>Loading</>
              :
              <>Please Enter Number </>
              :
              <>
                <div className="title">
                  Sent to {passVerifyNumber}
                  <button className= "edit-number-button" 
                    onClick={()=>{setShowVerifyUserExist(true); handleClose()} }>
                    Edit
                  </button>
                  
                </div>

                              
                    <form className="" onSubmit={(e) => validateOTPfunc(e)}>
                        <div className= "form-otp ">
                          {otp.map((data, index) => {
                            return (
                                <input
                                    className="otp-field"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                />
                            );
                        })}
                        </div>
                    <Button className= "rounded-sm shadow-none form-control " type="submit"  >Submit</Button>

                    </form>
                    
                            
                    {/* <Button className= "rounded-sm shadow-none form-control bg-secondary" type="submit" onClick = {(e) =>{resendOTPfunc(e)}} >Resend OTP</Button> */}

                {counter == 0
                  ?
                  <button className=" resend-otp-button" onClick = {(e) =>{resendOTPfunc(e); setLoadingOtpNotification("Sending OTP ....") }}>
                      Resend OTP code {loadingOtpNotification} </button>                
                  :
                  <div className=" resend-otp-timer"> Resend OTP in {counter} seconds</div>
                }
                
          </>
          }
          </Modal.Body>
          
        </Modal>  
      </div>
      
    );
  }
  
  export default ValidateOTPNewUser;