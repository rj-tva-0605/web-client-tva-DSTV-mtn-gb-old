
import React, { useState } from 'react';
import { auto } from '@popperjs/core';

import { useHistory } from "react-router";

import ReactHlsPlayer from 'react-hls-player';

import axios from 'axios';
 
import logo from '../../assets/images/tv_anywhere_logo.png';
import  '../Dashboard/Dashboard.css';
import MovieStream from './MovieStream';
// import MovieStreamShaka from './MovieStreamShaka';
import MovieStreamShaka from '.';






const Movies = () =>{

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




    return(
        <>
            
            {/* header begins */}
            
            {/* header ends here */}

            <div className="">
                
                    {/* <MovieStream /> */}
                    
                    {/* the main content scrollable div is gonna come here  */}

                    {/* <p>Below is for Shaka Player</p> */}
                    <MovieStreamShaka />

                
            </div>
        </>
    )
}

export default Movies;





 
// function MyCustomComponent() {
//   const playerRef = React.useRef();
 
//   function playVideo() {
//     playerRef.current.play();
//   }
 
//   function pauseVideo() {
//     playerRef.current.pause();
//   }
 
//   function toggleControls() {
//     playerRef.current.controls = !playerRef.current.controls;
//   }
 
//   return (
//     <ReactHlsPlayer
//       playerRef={playerRef}
//       src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
//     />
//   );
// }