
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import './Purchasemodal.css';
import axios from 'axios';


import { useHistory } from 'react-router';
import PackagesDisplay from 'components/PackagesDisplay';





const Purchasemodal = ({ showPayAlert, setShowPayAlert, 
                         setTriggerControl,  setShowTrigPurchase, 
                         setPackageRateDetails,  packageRateDetails,  setLoadingModal

                        }) => {
    
    
    


    // modal show and hide 
    const handleClose = () => {
        // e.preventDefault();
        setShowPayAlert(false);
        setTriggerControl(false);
        // setTriggerPay(false);

      };

    const handleCloseNoChoice = () =>{
      setTriggerControl(false);
      setPackageRateDetails(false);
      setShowPayAlert(false);
      setLoadingModal(false)      

    }
    


    
    const trigfunc = () =>{

      
      setLoadingModal(true)

      setTimeout(function(){ setShowTrigPurchase(true) }, 400);
      handleClose();
      console.log("close purchase modal trigger purchase modal")
      console.log("Package Details", packageRateDetails)

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
             
             <h1 className="package-center-heading"  
                    style={{width: "87%", margin: "0 auto", marginBottom: "7%"}}>
                  <span style={{fontSize: "1.75rem", marginBottom: "7%", width: "15%"}}>You have opted to subscribe to</span>
                  <br/>
                  <span>{packageRateDetails.packageName}</span>
                </h1> 
            
              <div>
                <div 
                    style={{width: "29%", margin: "0 auto", marginBottom: "9%", fontSize: "1.25rem",
                    border: "2px solid red"}}>
                  {packageRateDetails.phoneNumber} 
                </div>
                {/* {console.log(packageRateDetails.rateCode)} */}
                <div className="package-buttons-confirmation">
                    <button type="button" class="btn btn-success" onClick={trigfunc} >Buy {packageRateDetails.price}</button>
                    <button type="button" class="btn btn-danger"  onClick={handleCloseNoChoice}>Decline</button>
                </div>

              </div>
            
            <br />
            <br/>
            

          </Modal.Body>

        </Modal>
      </div>
    );
  }
  
  export default Purchasemodal;