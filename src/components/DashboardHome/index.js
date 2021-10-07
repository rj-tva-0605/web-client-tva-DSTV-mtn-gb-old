import { arrayExpression } from '@babel/types';
import { auto } from '@popperjs/core';



import React, { useEffect, useState } from 'react';
import axios from 'axios';

import logo from '../../assets/images/tv_anywhere_logo.png';
import  './DashboardHome.css';

import Banners from '../../components/Banners';
import BannersWorks from '../../components/BannersWorks';
import BannersPosters from '../../components/BannersPosters ';
import AllMoviesPackagesCategories from '../../components/AllMoviesPackagesCategories';

import PackagesDisplay from '../../components/PackagesDisplay';



 const DashboardHome = () => {

    return(
            <div className="main-content">
                <p style={{marginLeft: "30px"}}>Home</p>        
                    <div className="main-content-y-scrollable">
                        <BannersWorks  
                            style={{"margin" : "0px"}}
                        />

                        <PackagesDisplay />

                        <br />
                        <br />
                        <br />
                        <AllMoviesPackagesCategories />
                        <br />
                        <br />
                        
                    </div>
            </div>

    )
}

export default DashboardHome;