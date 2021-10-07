import { arrayExpression } from '@babel/types';
import { auto } from '@popperjs/core';

import { NavDropdown, Container, Navbar, Nav } from 'react-bootstrap';



import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import logo from '../../assets/images/tv_anywhere_logo.png';
import  './DashboardLiveTv.css';

import Banners from 'components/Banners';
import BannersWorks from 'components/BannersWorks';
import BannersPosters from 'components/BannersPosters ';


import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";




 const DashboardLiveTv = () => {
     
    const [dropdowntoday, setDropdowntoday] = useState("");
    const [dropdownArrow, setDropdownArrow] = useState("fa-caret-down")
    const [dropdownAllchannels, setDropdownAllchannels] = useState("");
    const [dropdownAllChannelsArrow, setDropdownAllchannelsArrow] = useState("fa-caret-down")

    const showtodaydropdown = () =>{
        if (dropdowntoday == ""){
            setDropdowntoday("dropdown-content-hover")
            setDropdownArrow("fa-caret-up")
        }
        else{ setDropdowntoday("")
              setDropdownArrow("fa-caret-down")
    }
    }

    const showallchannelsdropdown = () =>{
        if (dropdownAllchannels == ""){
            setDropdownAllchannels("dropdown-content-hover")
            setDropdownAllchannelsArrow("fa-caret-up")
        }
        else{ setDropdownAllchannels("")
              setDropdownAllchannelsArrow("fa-caret-down")
    }
    }



  







    return(
            <div className="main-content">
                <div className="mainlivetv">
                    <p style={{marginLeft: "30px"}}>Live TV</p>
                    <i class="fa fa-ellipsis-v mainlivetv-dots" aria-hidden="true" />
                </div>
                <div className="mainlivetv-navbars">
                    <div class="dropdown" onClick={() =>showtodaydropdown()}>
                        <span style={{"marginRight":"8px",}} >Today</span>
                        <div className= {`dropdown-content ${dropdowntoday} `} >
                            <p>Tuesday</p>
                            <p>Wednesday</p>
                            <p>Thursday</p>
                        </div>
                    <i class={`fa ${dropdownArrow}`} ></i>
                        
                    </div>
                    <div class="dropdown"   onClick={() =>showallchannelsdropdown()}>
                        <span style={{"marginRight":"8px",}} >All channels</span>
                        <div className= {`dropdown-content ${dropdownAllchannels} `} >
                            <p>Tuesday</p>
                            <p>Wednesday</p>
                            <p>Thursday</p>
                        </div>
                    <i class={`fa ${dropdownAllChannelsArrow}`} ></i>
                        
                    </div>
                </div>     
                    <div className="main-content-y-scrollable">

                        <div className="live-tv-main-content">

                        

                        <table className="scroller" >
                            <tr>
                                <th>12:00PM</th>
                                <th>12:30PM</th>
                                <th>1:00PM</th>
                            </tr>
                            <tr>
                                <td>The Johnny Carson Show</td>
                                <td>The Johnny Carson Show</td>
                                <th></th>
                            </tr>
                            <tr>
                                <td>The Caroll Bennet Show</td>
                                <td>The Caroll Bennet Show</td>
                            </tr>
                            <tr>
                                <td>Fashion & LifeStyles</td>
                                <td>Celebrity News and Notes</td>
                            </tr>
                        </table>
                        
                        <table>
                            
                            {/* <tr>
                            <td><button onClick={""}>LEFT</button></td>
                            <td><button onClick={""}>RIGHT</button></td>
                            </tr> */}

                            <tr>
                            {/* <td><button onClick={scrollToTop}>Scroll to Top</button></td> */}
                            </tr>
                        </table>

                       

                        {/* end of main live content  */}
                        </div>
                        


                    </div>
            </div>

    )
}

export default DashboardLiveTv;