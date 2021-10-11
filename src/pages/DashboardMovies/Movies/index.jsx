
import React, { useState, useRef, useEffect } from 'react';
// import ReactHlsPlayer from 'react-hls-player';

import { auto } from '@popperjs/core';

import { useHistory } from "react-router";

import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

import axios from 'axios';
 

// import './Moviedetailz.css';
import './MovieStream.css'


import VideoJS from './VideoJS' // point to where the functional component is stored

import ReactHlsPlayer from 'react-hls-player';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


const cookies = new Cookies();






const MovieStreamShakaMovies = () =>{

      

    const [homeActive, setHomeActive] = useState('')
    const [livetvActive, setLiveTvActive] = useState('')
    const [movieshowsActive, setMovieShowsActive] = useState('')
    const [webshowsActive, setWebshowsActive] = useState ('webshowsNotActive')
    const [isShown, setIsShown] = useState('')
    const [trailerUrl, setTrailerUrl] = useState('')

    const history = useHistory();
    const location = useLocation();

    const shakaRef = useRef();


  

 
  


      const getMoviestrailerDet = (access_token, operator_uid, user_id) => {

        console.log("prefetch trailer link")
        console.log("location.state.detail.id", location.state.detail.uid)
        console.log("accesToken here", access_token)

        console.log(access_token)

        var config = {
            method: 'get',
            url: `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/users/${user_id}/vod/movies/${location.state.detail.uid}`,
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
        var purchasedPackageIds = cookies.get("purchasedPackageIds") 

        getMoviestrailerDet(access_token, operator_uid, user_id)
    }, [])


    return(
      <div className="">
      
          <div className="mainlivetv" style={{marginLeft: "3%", marginTop: "2%"}}>
                    <Link className="" style ={{ border: "none", width: ""}}
                                     to = {{
                                      pathname: "/moviespage",
                                      state: {
                                           detail: {
                                               uid: ""
                                           }
                                       }
                                   }}
                                    >
                      <i class="fa fa-arrow-left" />
                      </Link>
    
                      <p style={{marginLeft: "30px"}}> {location.state.detail.title}</p>
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

export default MovieStreamShakaMovies;




