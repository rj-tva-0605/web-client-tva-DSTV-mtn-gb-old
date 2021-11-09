
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import './AlertToPurchasemodal.css';
import axios from 'axios';

// import { useDispatch } from 'react-redux';
// import {loginReducer} from '../../store/reducers/authReducer';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';




//handle username and password slots autofill device class and device 
//use navigator.appname

// pick data from form send  package as data and send with axios 





const AlertToPurchasemodal = ({showMoviePayAlert, setShowMoviePayAlert}) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const dispatch = useDispatch()
    const history = useHistory()


    // modal show and hide 
    const handleClose = () => setShowMoviePayAlert(false);

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    var data = JSON.stringify({
      "username": username,
      "password": password,
      "device": "rodney",
      "device_class": "desktop"
    });
    

    const loginfunc = (e) => {
      e.preventDefault();

      // dispatch(loginReducer(data))
      history.push({
        pathname:  "/dashboard",
        
                 });


    }

    

    return (
      <div>
  
        <Modal
          show={showMoviePayAlert}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="login-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
                <h1>Subscription Notice</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <br />
             <br />
             <br />
             <h2> Please click 
             <Link className="" 
                                     to = {{
                                      pathname: "/packagespage",
                                      state: {
                                           detail: {
                                               id: ""
                                           }
                                       }
                                   }}
                                    > 
                here </Link>
               to proceed to our purchase a package</h2>
            <br />
            <br/>
            <p className=" login-link "><small>New to MTN-GB?<a href="">Sign up now</a></small></p>

          </Modal.Body>

        </Modal>
      </div>
    );
  }
  
  export default AlertToPurchasemodal;