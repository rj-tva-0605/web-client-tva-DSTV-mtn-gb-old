import { arrayExpression } from '@babel/types';
import { auto } from '@popperjs/core';



import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useHistory } from "react-router";


import logo from '../../assets/images/tv_anywhere_logo.png';
import  './Dashboard.css';

import DashboardHome from 'components/DashboardHome';



 const DashMoviesShows = () => {

    const [homeActive, setHomeActive] = useState('')
    const [livetvActive, setLiveTvActive] = useState('')
    const [movieshowsActive, setMovieShowsActive] = useState('')
    const [webshowsActive, setWebshowsActive] = useState('')
    const [isShown, setIsShown] = useState('')
    const history = useHistory();

    const dashHomeState = (e) => {
        e.preventDefault();

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

        history.push({
            pathname:  "/dashLivetv",
            state: {
            response: "messageFromServer",
            detail: "somevaraible or state containing information will be here"
            } 
                     });

        
    }

    const dashmovieShowsState = (e) => {
        e.preventDefault();


        
       
    }

    const dashwebShowsState = (e) => {
        e.preventDefault();

 
        
       
    }





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
                                    <i className= {`fa fa-home sidebar-widgts-txt activ-yellow ${isShown}`} ></i>
                                    <span className={ `sidebar-widgts-txt activ-yellow ${isShown}`}>Home</span> 
                            </a>
                        </li>
                        <li className="sidebar-widgts" >
                            <a className="unstyled-button chicken" onClick={(e) => dashliveTvState(e)}
                                onMouseEnter={() => setLiveTvActive('activ-hoovr')}
                                onMouseLeave={() => setLiveTvActive('')}  >  
                                    <i class={`fa fa-tv sidebar-widgts-txt ${livetvActive}`}></i>
                                    <span className={ `sidebar-widgts-txt ${livetvActive}`}>Live TV</span>
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
                    <DashboardHome />


 
                
            </div>
        </>
    )
}

export default DashMoviesShows;