
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import './Purchasemodal.css';
import axios from 'axios';


import { useHistory } from 'react-router';
import PackagesDisplay from 'components/PackagesDisplay';











const Purchasemodal = ({triggerpay, setTriggerPay, showPayAlert, setShowPayAlert, 
                        packageContent, setTriggerControl,  setTrigPurchase
                        }) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const dispatch = useDispatch()
    const history = useHistory()


    // modal show and hide 
    const handleClose = () => {
        // e.preventDefault();
        setShowPayAlert(false);
        setTriggerControl(false);
        setTriggerPay(false);

      };

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    
    const trigfunc = () =>{

      

      

      var data = JSON.stringify({
        "mobilenumber": "1111122222",
        "productid": "24501220000005301"
      });
      
      var config = {
        method: 'post',
        url: 'https://mtngbissautest-bcrm.magnaquest.com/mtngnbsdppgtest/subscription',
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
        console.log("Response from hitting packages", response.data);
        let newResponse = JSON.parse(response.data);
        console.log("Convert stringified json back to json Message", newResponse.Message );
        
      })
      .catch(function (error) {
        console.log(error);
      });
      
      setTimeout(function(){ setTrigPurchase(true) }, 3000);
      handleClose();
      console.log("close purchase modal trigger purchase modal")
      }
    
    
    

    

    return (
      <div>
  
        <Modal
          show={showPayAlert}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="login-modal"
          centered
        >
          

          <Modal.Body>
             
             <h1 className="package-center-heading">Activate Data Bundle</h1>
             
             <p className="package-center-text" >valid for 1 day @ CFA 200</p>                      
            
              <div>
                {/* {console.log(packageRateDetails.rateCode)} */}
                <div className="package-buttons-confirmation">
                    <button type="button" class="btn btn-success" onClick={trigfunc} >Success</button>
                    <button type="button" class="btn btn-danger"  onClick={handleClose}>Close</button>
                </div>

              </div>
            
            <br />
            <br/>
            <p className=" login-link "><small>New to Glo-TV?<a href="">Sign up now</a></small></p>

          </Modal.Body>

        </Modal>
      </div>
    );
  }
  
  export default Purchasemodal;