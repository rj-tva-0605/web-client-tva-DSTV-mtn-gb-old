
import React, { useState, useRef, useEffect } from 'react';
// import ReactHlsPlayer from 'react-hls-player';

import { auto } from '@popperjs/core';

import { useHistory } from "react-router";

import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

import axios from 'axios';
 
import logo from '../../assets/images/tv_anywhere_logo.png';
import  '../Dashboard/Dashboard.css';

// import './Moviedetailz.css';
import './MovieStream.css'


import VideoJS from './VideoJS' // point to where the functional component is stored

import ReactHlsPlayer from 'react-hls-player';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


const cookies = new Cookies();






const MovieStreamShakaMovies = () =>{


    const playerRef = React.useRef(null);

    const videoJsOptions = { // lookup the options in the docs for more options
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
        src: 'https://glonigeria.tvanywhereafrica.com:28182/auth-streaming/2,61af797effbc295500ff39aee36d3e6593fe4437,1631392100,g00000000000,0-29000wishes1regretsdlowbitrate,8,8,2,8,8,8,DESKTOP,30278,all,none,glotv,172.20.1.31/hls/vod/0-29000wishes1regretsdlowbitrate-hls-NONE/playlist.m3u8',
        type: 'video/mp4'
        }]
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // you can handle player events here
        player.on('waiting', () => {
          console.log('player is waiting');
        });
    
        player.on('dispose', () => {
          console.log('player will dispose');
        });
      };



      

    const [homeActive, setHomeActive] = useState('')
    const [livetvActive, setLiveTvActive] = useState('')
    const [movieshowsActive, setMovieShowsActive] = useState('')
    const [webshowsActive, setWebshowsActive] = useState ('webshowsNotActive')
    const [isShown, setIsShown] = useState('')
    const [trailerUrl, setTrailerUrl] = useState('')

    const history = useHistory();
    const location = useLocation();

    const shakaRef = useRef();


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

    // const playerRef = React.useRef();
 
  function playVideo() {
    playerRef.current.play();
  }
 
  function pauseVideo() {
    playerRef.current.pause();
  }
 
  function toggleControls() {
    playerRef.current.controls = !playerRef.current.controls;
  }

    // useEffect(() => {
    //     const { player, ui } = shakaRef.current;
    //     // player & ui point to an instance of shaka.Player & shaka.ui.Overlay.
    //     player.load('https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd');
    // }, []);

      const getMoviestrailerDet = () => {

        const access_token = cookies.get("access_token")
        console.log("prefetch trailer link")
        console.log("location.state.detail.id", location.state.detail.id)
        console.log("accesToken here", access_token)
        // setmovieData(location.state.detail.id)

        console.log(access_token)

        var config = {
            method: 'get',
            url: `https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/testglotv/users/48965/vod/movies/${location.state.detail.uid}`,
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
            }
          };
          
          axios(config)
          .then((response) => {
            console.log("trailer response is here", response.data);
            console.log("trailer url" ,response.data.data.url)
            setTrailerUrl(response.data.data.url)
            // setTrailerUrl('https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/testglotv/users/48965/vod/trailers/movies/9515')
          })
          .catch((error) => {
            console.log(error);
          });

          // setTrailerUrl('https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/testglotv/users/48965/vod/trailers/movies/9515')
          // setmovieData(location.state.detail.id)
    }

    useEffect(() => {
        getMoviestrailerDet()
    }, [])


    return(
        <div className="main-content">
        
            <div className="mainlivetv">
                        <p style={{marginLeft: "30px"}}> Movies Stream</p>
                        <i class="fa fa-ellipsis-v mainlivetv-dots" aria-hidden="true" />
            </div>
                    {/* Shaka Player Stuff */}
            <div style={{width:"70%", maxWidth:"100%", height:"90%", margin:"auto",marginTop:"10px", postion: "relative"}}>
               
                {/* <div  className="text" onclick="off()">
                    <button  className=" textButton" >Overlay Text</button>
                </div> */}
                
                {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} 
                  
                    style={{width:"100%", height:"100%", postion: "absolute"}}
                  /> */}
                
                <ReactHlsPlayer
                  src={trailerUrl}
                  autoPlay={true}
                  controls={true}
                  width="100%"
                  height="90%"
                  hlsConfig={{
                    maxLoadingDelay: 4,
                    minAutoBitrate: 0,
                    lowLatencyMode: true,
                  }} 

                  />



                {/* <ShakaPlayer autoPlay src="https://glonigeria.tvanywhereafrica.com:28182/auth-streaming/2,61af797effbc295500ff39aee36d3e6593fe4437,1631392100,g00000000000,0-29000wishes1regretsdlowbitrate,8,8,2,8,8,8,DESKTOP,30278,all,none,glotv,172.20.1.31/hls/vod/0-29000wishes1regretsdlowbitrate-hls-NONE/playlist.m3u8" 
                        style={{width:"100%", height:"100%", postion: "absolute"}} />  */}


                {/* <div style={{width:"100%", height:"100%", position:"relative", border: "red 2px solid", zIndex:"9"}}></div>  */}
            </div>
                
        </div>
    )
}

export default MovieStreamShakaMovies;



 {/* Shaka Player Stuff */}

    // <div className="main-content-y-scrollable">
    //         <div style={{width:"600px", height:"auto"}}>
    //                 <ShakaPlayer autoPlay src="https://glonigeria.tvanywhereafrica.com:28182/auth-streaming/2,bb8da4d286e863f7a910be3cd400f709dcba355d,1631121325,g00000000000,0-france241,8,8,2,8,8,8,DESKTOP,33011,all,none,glotv,172.20.1.31/playlist/0-france241/live/index.m3u8" 
    //                 style={{width:"auto"}} />  
    //         </div>         
    // </div>

{/* Shaka Player Stuff */}

// Shaka player Controls

// https://github.com/amit08255/shaka-player-react-with-ui-config/blob/master/with-ui-configuration/src/index.js



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










// over Lay Code


// <!DOCTYPE html>
// <html>
// <head>
// <meta name="viewport" content="width=device-width, initial-scale=1">
// <style>
// #overlay {
//   position: fixed;
//   display: block;
//   width: 100%;
//   margin-top: 70%;
//   height: 20%;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0,0,0,0.5);
//   z-index: 2;
//   cursor: pointer;
// }

// .textButton{
// 	background-color: transparent;
//     border: none;
//     shadow: none;
// }

// #text{
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   font-size: 50px;
//   color: white;
//   transform: translate(-50%,-50%);
//   -ms-transform: translate(-50%,-50%);
// }
// </style>
// </head>
// <body>

//  <div id="overlay" onclick="off()">
//   <button id="text" class="textButton" >Overlay Text</button>
// </div> 

//  <div style="padding:20px">
//   <h2>Overlay with Text</h2>
//   <button onclick="on()" >Turn on overlay effect</button>
// </div> 

// <script>
// function on() {
//   document.getElementById("overlay").style.display = "block";
// }

// function off() {
//   document.getElementById("overlay").style.display = "none";
// }
// </script>
   
// </body>
// </html> 
