
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import './LoadingModal.css';
import axios from 'axios';


import { useHistory } from 'react-router';
import PackagesDisplay from 'components/PackagesDisplay';











const LoadingModal = ({ loadingModal, setLoadingModal
                        }) => {
    
    



    // modal show and hide 
    const handleClose = () => {
        // e.preventDefault();
        
        // setTriggerPay(false);

      };

    const handleCloseNoChoice = () =>{
      // setPackageRateDetails(false)
    }


    
    const trigfunc = () =>{

      
      
      // setTimeout(function(){ setShowTrigPurchase(true) }, 400);
      handleClose();
      // console.log("close purchase modal trigger purchase modal")
      // console.log("Package Details", packageRateDetails)

      }
    
    
    

    

    return (
      <div>
  
        <Modal
          show={loadingModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="login-modal"
          centered
        >
          

          <Modal.Body>
             
             <h1 className="package-center-heading" style={{backgroundColor: "none"}}>Loading request .... </h1>                     
            
              

          </Modal.Body>

        </Modal>
      </div>
    );
  }
  
  export default LoadingModal;