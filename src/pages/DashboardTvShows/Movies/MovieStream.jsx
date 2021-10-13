
import React, { useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';

import { auto } from '@popperjs/core';

import { useHistory } from "react-router";


import axios from 'axios';
 
import logo from '../../assets/images/tv_anywhere_logo.png';
import  '../Dashboard/Dashboard.css';

// import './Moviedetailz.css';






const MovieStream = () =>{

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

    const playerRef = React.useRef();
 
  function playVideo() {
    playerRef.current.play();
  }
 
  function pauseVideo() {
    playerRef.current.pause();
  }
 
  function toggleControls() {
    playerRef.current.controls = !playerRef.current.controls;
  }



    return(
        <div className="main-content">
        
        <div className="mainlivetv">
                    <p style={{marginLeft: "30px"}}> Movies Stream</p>
                    <i class="fa fa-ellipsis-v mainlivetv-dots" aria-hidden="true" />
        </div>

        
            <div className="main-content-y-scrollable">
                <ReactHlsPlayer
                    playerRef={playerRef}
                    src="https://glonigeria.tvanywhereafrica.com:28182/auth-streaming/2,bb8da4d286e863f7a910be3cd400f709dcba355d,1631121325,g00000000000,0-france241,8,8,2,8,8,8,DESKTOP,33011,all,none,glotv,172.20.1.31/playlist/0-france241/live/index.m3u8"
                />
            </div>
        </div>
    )
}

export default MovieStream;





{/* 
    <div className="movie-det-poster-info-orglist">
        <ul className="movie-det-poster-info-orgsublist">
            <li ><p>DIRECTED BY <span >Logan Kibens</span></p></li>
            <li><p>WRITTEN BY<span></span></p></li>
            <li><p> <span></span></p></li>
            <li><p> <span></span></p></li>
        </ul>
        </div>
        <div className="movie-det-poster-info-orglist">
        <ul style={{listStyleType: "none"}}>
                <li><p> <span></span></p></li>
                <li><p> <span></span></p></li>
                <li><p> <span></span></p></li>
                <li><p> <span></span></p></li>
            </ul>
    </div> 
*/}
