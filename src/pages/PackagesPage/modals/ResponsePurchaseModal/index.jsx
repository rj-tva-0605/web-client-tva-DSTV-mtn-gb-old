
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import './ResponsePurchaseModal.css';
import axios from 'axios';


import { useHistory } from 'react-router';
import PackagesDisplay from 'components/PackagesDisplay';





const ResponsePurchaseModal = ({
                                setShowResponsePurchModal, showResponsePurchModal,
                                setLoadingModal
                        }) => {
    
    
    


    // modal show and hide 
    const handleClose = () => {
          setShowResponsePurchModal(false)
          setLoadingModal(false)      
        };
    
    

    
    const trigfunc = () =>{

      
      

      handleClose();
      // setTriggerPay(true);
      console.log("close purchase modal trigger purchase modal")
      }
    
    
    

    

    return (
      <div>
  
        <Modal
          show={showResponsePurchModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="login-modal"
          centered
        >
          

          <Modal.Body>

              <i className="fa fa-check-circle fa-lg" 
                  style={{color: "yellow", width: "40%", marginRight: "90px" , marginBottom: "3%", fontSize: "1.90rem"}} />
             
                <h1 className="package-center-heading mx-auto"> Bundle Activation Initiated</h1>
             
             <p className="package-center-text" >
               Your bundle activation has started you.<br /> 
               You will recieve an SMS once it is completed
             </p>                      
            
              <div>
                {/* {console.log(packageRateDetails.rateCode)} */}

                <hr  style={{width: "80%", margin: "0 auto", marginBottom: "3%"}}/>
                <div className="package-buttons-confirmation">
                    <button type="button" class="btn btn-success" onClick={trigfunc} >Okay</button>
                    
                </div>

              </div>
            
            <br />
           

          </Modal.Body>

        </Modal>
      </div>
    );
  }
  
  export default ResponsePurchaseModal;