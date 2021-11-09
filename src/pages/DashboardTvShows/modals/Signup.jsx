
import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import  './Signup.css';



const Signup = ({showsignup, setShowSignup}) => {
    
  
    const handleClose = (e) => setShowSignup(false);
    
    
    return (
      <div>      
        <Modal
          show={showsignup}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className = "signup-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
                <h1>Sign Up</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
             

             <form className="signup-form">
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="966XXXXXXX" />
                </div>
                <br /> 
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Email(optional)" />
                </div>
                <br /> 
                <div class="form-group">                    
                    <input type="text" class="form-control" placeholder="Password" />
                </div>
                <br /> 
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="Confirm Password " />
                </div>
                <br />
                <Button className= "rounded-sm shadow-none form-control" >Submit</Button>
                <br />
                <br />
            </form>
            <p className=" signup-link "><small>Already have an account?<a href="">Sign up now</a></small></p>
          </Modal.Body>
          
        </Modal>  
      </div>
    );
  }
  
  export default Signup;