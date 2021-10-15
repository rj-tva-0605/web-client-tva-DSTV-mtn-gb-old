
import React, { useState, useEffect } from 'react';
import { auto } from '@popperjs/core';

import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';

import AlertToPurchasemodal from './AlertToPurchasemodal';


import axios from 'axios';
 
// import logo from '../../assets/images/tv_anywhere_logo.png';
// import  '../Dashboard/Dashboard.css';

import './Moviedetailz.css';
import { AiOutlineRadiusSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';

const cookies = new Cookies();





const SeriesDetail = () =>{
    const location = useLocation();

    
    return(
    <>
        <div>HEllo</div>
        {console.log("detail from series page", location.state.detail)}
    </>
    )
}

export default SeriesDetail;





