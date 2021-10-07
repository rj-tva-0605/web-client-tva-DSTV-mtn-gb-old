
import React, { useState } from 'react';
import { auto } from '@popperjs/core';

import { useHistory } from "react-router";


import axios from 'axios';
 
import logo from '../../assets/images/tv_anywhere_logo.png';
import  '../DashboardOld/Dashboard.css';
import MovieDetailZ  from './MovieDetailZ';
import './MovieDetail.css'
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';


const cookies = new Cookies();



//  sample code for changing body background image in style below

// var Background = `https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/}${320872}?accessKey=WkVjNWNscFhORDBLCg== `
// var sectionStyle = {
//     width: "100%",
//     height: "400px",
//     backgroundImage: "url(" + { Background } + ")" + " "+" ! important"
//   };
  


const MovieDetail = () =>{

    const dispatch = useDispatch();
    const access_token = cookies.get("access_token");



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

        console.log('Access Token', access_token)
       
    }

    const dashliveTvState = (e) => {
        e.preventDefault();
        setLiveTvActive('livetvActive')

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
        setMovieShowsActive('movieshowsActive')

     
        
       
    }

    const dashwebShowsState = (e) => {
        e.preventDefault();

    
        
       
    }




    return(
        <>
            <div className="content">
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

                        <MovieDetailZ />
                        
                        {/* the main content scrollable div is gonna come here  */}


    
                    
                </div>
            </div>
        </>
    )
}

export default MovieDetail;