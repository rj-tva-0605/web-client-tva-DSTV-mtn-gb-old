
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import './Purchasemodal.css';
import axios from 'axios';


import { useHistory } from 'react-router';
import PackagesDisplay from 'components/PackagesDisplay';










const Purchasemodal = ({showPayAlert, setShowPayAlert, 
                        packageContent, setTriggerControl, 
                        packageRateDetails,setPackageRateDetails}) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const dispatch = useDispatch()
    const history = useHistory()


    // modal show and hide 
    const handleClose = () => {
        // e.preventDefault();
        setShowPayAlert(false);
        setTriggerControl(false);
        setPackageRateDetails(false)
      };

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    var data = JSON.stringify({
      "username": username,
      "password": password,
      "device": "rodney",
      "device_class": "desktop"
    });
    

    
    const proceedfunc = (e) => {
      e.preventDefault();

      // dispatch(loginReducer(data))
      
      var data = JSON.stringify({
        "mobilenumber": "966601969",
        "productid": "24501220000005180"
      });

      var config = {
        method: 'post',
        url: 'https://tvanywheretest-ott.magnaquest.com/MTNGBSDPPG/subscription',
        headers: { 
          'Authorization': 'Basic TVROR0JVQ1dFQlVTUjpNdG5nYnBhc3NAMTIzNA==', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then( response => {
        console.log("Pay response for Package", response.data);
      })
      .catch(error => {
        console.log(error);
      });

      history.push({
        pathname:  "/dashboard",
        
                 });


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
          <Modal.Header closeButton>
            <Modal.Title>
                <h1>Payment Notice</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <br />
             <br />
             <br />                      
            { !packageRateDetails? 
              ""
              :
              <div>
                <p>Package Title --> {packageRateDetails.packageName}</p>
                <p>Rate Code --> {packageRateDetails.rateCode}</p>
                
                <div className="package-buttons-confirmation">
                    <button type="button" class="btn btn-success" onClick={(e) =>proceedfunc(e)} >Success</button>
                    <button type="button" class="btn btn-danger"  onClick={handleClose}>Close</button>
                </div>

              </div>
            }
            <br />
            <br/>
            <p className=" login-link "><small>New to Glo-TV?<a href="">Sign up now</a></small></p>

          </Modal.Body>

        </Modal>
      </div>
    );
  }
  
  export default Purchasemodal;