
import React, { useState, useRef, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';

import { auto } from '@popperjs/core';

import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';


import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

import axios from 'axios';
 

import './MoviesTrailerShaka.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';






const cookies = new Cookies();






const MoviesTrailerShaka = () =>{

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
        setmovieData(location.state.detail.id)

        console.log(access_token)

        var config = {
            method: 'get',
            url: `https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/testglotv/users/48965/vod/trailers/movies/${location.state.detail.id}`,
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
          setmovieData(location.state.detail.id)
    }

    useEffect(() => {
        getMoviestrailerDet()
    }, [])


    return(
      <div className="">
      
          <div className="mainlivetv" style={{marginLeft: "3%", marginTop: "2%"}}>
                    <Link className="" style ={{ border: "none", width: ""}}
                                     to = {{
                                      pathname: "/moviespage",
                                      state: {
                                           detail: {
                                               id: ""
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

export default MoviesTrailerShaka;






