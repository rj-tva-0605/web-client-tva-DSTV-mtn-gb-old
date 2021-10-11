
import React, { useState, useRef, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';

import { auto } from '@popperjs/core';

import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';


import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

import axios from 'axios';
 
import logo from '../../../assets/images/tv_anywhere_logo.png';
import  '../../DashboardOld/Dashboard.css';

import './ChannelPlayerPage.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';






const cookies = new Cookies();

//        '/channelsplayer'




const ChannelPlayerPage = () =>{

    const [homeActive, setHomeActive] = useState('')
    const [trailerUrl, setTrailerUrl] = useState(false)
    const [movieData, setmovieData] = useState(false)
    const [livetvActive, setLiveTvActive] = useState('')
    const [movieshowsActive, setMovieShowsActive] = useState('')
    const [webshowsActive, setWebshowsActive] = useState ('webshowsNotActive')
    const [isShown, setIsShown] = useState('')

    const history = useHistory();
    const location = useLocation();

    const shakaRef = useRef();


    

    const playerRef = React.useRef();
 


    

    const getChannelsPlayoutDet = (access_token, user_id, operator_uid, stringPackages) => {

        console.log("prefetch trailer link")
        console.log("location.state.detail.id", location.state.detail.id)
        console.log("accesToken here", access_token)
        setmovieData(location.state.detail.id)

        console.log(access_token)

        var config = {
            method: 'get',
            url: `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/users/${user_id}/live/channels/${location.state.detail.uid}`,
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
          })
          .catch((error) => {
            console.log(error);
          });

         
    }

    useEffect(() => {
        const access_token = cookies.get("access_token");
        const user_id = cookies.get("user_id");
        const operator_uid = cookies.get("operator_uid");
        var stringPackages = cookies.get("stringPackages")
      getChannelsPlayoutDet(access_token, user_id, operator_uid, stringPackages)
    }, [])


    return(
        <div className="">
        
            <div className="mainlivetv" style={{marginLeft: "3%", marginTop: "2%"}}>
                      <Link className="" style ={{ border: "none", width: ""}}
                                       to = {{
                                           pathname: "/channelspage",
                                           state: {
                                                detail: {
                                                    id: ""
                                                }
                                            }
                                        }}
                                      >
                        <i class="fa fa-arrow-left" />
                        </Link>

                        <p style={{marginLeft: "30px"}}> {location.state.detail.name}</p>
                        {console.log(location.state.detail)}
                        {/* <i class="fa fa-ellipsis-v mainlivetv-dots" aria-hidden="true" /> */}
            </div>
                    {/* Shaka Player Stuff */}
            <div style={{width:"100%", maxWidth:"100%", height:"60%", margin:"auto",marginTop:"2px"}}>
               
                
                {!trailerUrl?
                  <div style={{width:"20%", height:"70%", marginTop: "40%", margin: "auto"}}>Loading...</div>
                
                  :
                  <ReactHlsPlayer
                  src={trailerUrl}
                  autoPlay={true}
                  controls={true}
                  style={{width:"100%", height:"90%", position: "absolute"}}
                  width="1500px"
                  height="auto"
                  hlsConfig={{
                    maxLoadingDelay: 4,
                    minAutoBitrate: 0,
                    lowLatencyMode: true,
                  }} 

                  />
                
                }

                
            </div>
                
        </div>
    )
}

export default ChannelPlayerPage;





{/* <ShakaPlayer autoPlay src={trailerUrl} 
    style={{width:"100%", height:"100%", postion: "absolute"}} />  */}






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
