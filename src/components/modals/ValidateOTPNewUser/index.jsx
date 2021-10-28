
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import  './ValidateOTPNewUser.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {signupReducer} from '../../../store/reducers/authReducer';




const ValidateOTPNewUser = ({showValidateOTP, setShowValidateOTP}) => {
    
  const dispatch = useDispatch();
  const history = useHistory();
  const [otpReady, setOtpReady] = useState(false)
  
  
  const handleClose = (e) => {
                              setShowValidateOTP(false);
                              
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
          <Modal.Header closeButton>
            <Modal.Title>
                <h1>Validate</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
             
              
            <div class="title">
              Verify OTP
            </div>
                          
                <form className="form-otp " onSubmit={(e) => validateOTPfunc(e)}>
                      
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
                <Button className= "rounded-sm shadow-none form-control" type="submit"  >Submit</Button>

                </form>
                <hr class="mt-4" />
                
                        


            <p className=" signup-link "><small>Already have an account?<a href="">Sign up now</a></small></p>
          </Modal.Body>
          
        </Modal>  
      </div>
    );
  }
  
  export default ValidateOTPNewUser;