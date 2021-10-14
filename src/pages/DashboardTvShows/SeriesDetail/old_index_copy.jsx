
import React, { useState } from 'react';
import { auto } from '@popperjs/core';

import { useHistory } from "react-router";


import axios from 'axios';
 
// import logo from '../../assets/images/tv_anywhere_logo.png';
// import  '../Dashboard/Dashboard.css';
import MovieDetailZ  from '.';
import './MovieDetail.css'
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';


const cookies = new Cookies();



//  sample code for changing body background image in style below

var Background = `https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/}${320872}?accessKey=WkVjNWNscFhORDBLCg== `
var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: "url(" + { Background } + ")" + " "+" ! important"
  };
  


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
            
                

                        <MovieDetailZ />
                        
                        {/* the main content scrollable div is gonna come here  */}


    
                    
                
        </>
    )
}

export default MovieDetail;