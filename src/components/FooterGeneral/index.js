

import React  from 'react';
import logo from '../../assets/images/mtn-logo.png';

import { Link } from 'react-router-dom';


const FooterGeneral = () =>{

    return(
        <>
            <div className="footer-box"></div>

                <div className= "footer">
                    <div className="footer-initial">
                        <div className="footer-fst footer-cards ">MTN-GB</div>
                        <div className="footer-sec footer-cards">FAQs</div>
                        <div className="footer-thr footer-cards">Live chat</div>
                    </div>
                </div>
        </>
    )
}

export default FooterGeneral;