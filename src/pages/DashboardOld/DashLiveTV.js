import { arrayExpression } from '@babel/types';
import { auto } from '@popperjs/core';



import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useHistory } from "react-router";

import { useLocation } from 'react-router-dom';

import logo from '../../assets/images/tv_anywhere_logo.png';
import  './Dashboard.css';

import DashboardHome from 'components/DashboardLiveTv';
import DashboardLiveTv from 'components/DashboardLiveTv';



 const DashLiveTV = () => {

    const [homeActive, setHomeActive] = useState('')
    const [livetvActive, setLiveTvActive] = useState('')
    const [movieshowsActive, setMovieShowsActive] = useState('')
    const [webshowsActive, setWebshowsActive] = useState ('webshowsNotActive')
    const [isShown, setIsShown] = useState('')

    const history = useHistory();

    const dashHomeState = (e) => {
        e.preventDefault();
        setHomeActive('homeIsActive')

        history.push({
            pathname:  "/dashboard",
            state: {
            response: "messageFromServer",
            detail: "somevaraible or state containing information will be here"
            } 
                     });        
       
    }



    const dashliveTvState = (e) => {
        e.preventDefault();
        setLiveTvActive('livetvActive')

        history.push({
            pathname:  "/dashLivetv",
            
                     });

        
       
    }

    const dashmovieShowsState = (e) => {
        e.preventDefault();
        setMovieShowsActive('movieshowsActive')

     
        
       
    }

    const dashwebShowsState = (e) => {
        e.preventDefault();

    
        
       
    }

    // useLocation to get data passed as props to next page using useHistory 
    
    const location = useLocation();



    return(
        <>
            
            {/* header begins */}
            <div className = "navbar-header">
                <ul className=" dashboard-main-nav">
                    <li><i className = "fa fa-bars navbar-bars "></i></li>
                    <li><img className="dashboard-main-nav-logo" src={logo}/></li>
                    <li className="input-group dashboard-main-search" >
                        <div className="form-outline  ">
                            <input type="search" id="form1" className="form-control mw-75 wounded " placeholder="Search" />    
                        </div>
                        <button type="button" className="btn btn-secondary">
                            <i className="fa fa-search"></i>
                        </button>
                    </li>
                </ul>
            </div>
            {/* header ends here */}

            <div className="dashboard-body">
                <div className="sidebar">
                    <ul>
                        <li className="sidebar-widgts" >
                            <a className= "unstyled-button  chicken"  onClick={(e) => dashHomeState(e)}     
                                onMouseEnter={() => setIsShown('activ-hoovr')}
                                onMouseLeave={() => setIsShown('')}> 
                                    <i className= {`fa fa-home sidebar-widgts-txt  ${isShown}`} ></i>
                                    <span className={ `sidebar-widgts-txt  ${isShown}`}>Home</span> 
                            </a>
                        </li>
                        <li className="sidebar-widgts" >
                            <a className="unstyled-button chicken" onClick={(e) => dashliveTvState(e)}
                                onMouseEnter={() => setLiveTvActive('activ-hoovr')}
                                onMouseLeave={() => setLiveTvActive('')}  >  
                                    <i class={`fa fa-tv sidebar-widgts-txt activ-yellow ${livetvActive}`}></i>
                                    <span className={ `sidebar-widgts-txt activ-yellow ${livetvActive}`}>Live TV</span>
                            </a>
                        </li>                      
                        <li className="sidebar-widgts " >
                            <a className="unstyled-button chicken" onClick={(e) => dashmovieShowsState(e)}
                                onMouseEnter={() => setMovieShowsActive('activ-hoovr')}
                                onMouseLeave={() => setMovieShowsActive('')}  >     
                                    <i class={`fa fa-film sidebar-widgts-txt ${movieshowsActive}`}></i>
                                    <span className={ `sidebar-widgts-txt ${movieshowsActive}`}>Movies & Shows</span>
                            </a>
                        </li>
                        <li className="sidebar-widgts " >
                            <a className="unstyled-button  chicken" onClick={(e) => dashwebShowsState(e)}
                                onMouseEnter={() => setWebshowsActive('activ-hoovr')}
                                onMouseLeave={() => setWebshowsActive('')}  > 
                                    <i class={`fa fa-tv sidebar-widgts-txt ${webshowsActive}`}></i>
                                    <span className={ `sidebar-widgts-txt ${webshowsActive}`}>Web Shows</span>
                            </a>
                        </li>
                    </ul>
                </div>


                    
                    {/* the main content scrollable div is gonna come here  */}
                    <DashboardLiveTv />
                    
                     {/* info passed as props from one page to another  */}
                    {console.log(location.state.detail)}

 
                
            </div>
        </>
    )
}

export default DashLiveTV;