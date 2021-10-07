
import React, { useState, useEffect } from 'react';
import { auto } from '@popperjs/core';

import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';



import axios from 'axios';
 
import logo from '../../assets/images/tv_anywhere_logo.png';
import  '../DashboardOld/Dashboard.css';

import './Moviedetailz.css';
import { AiOutlineRadiusSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';

const cookies = new Cookies();





const MovieDetailZ = () =>{

    const [homeActive, setHomeActive] = useState('')
    const [livetvActive, setLiveTvActive] = useState('')
    const [movieshowsActive, setMovieShowsActive] = useState('')
    const [webshowsActive, setWebshowsActive] = useState ('webshowsNotActive')
    const [isShown, setIsShown] = useState('')

    const [movieData, setMovieData] = useState(false)


    const history = useHistory();
    const location = useLocation();





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

    const getMovieDetail = () => {
        const access_token = cookies.get("access_token")

        var config = {
            method: 'get',
            url: `https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/testglotv/users/48965/movies/${location.state.detail.movieID}`,
            headers: { 
                'Authorization': `Bearer ${access_token}`
            }
            };
            
            axios(config)
            .then((response) => {
            console.log((response.data.data));
            const  { id, uid, image_store_id, duration } = response.data.data ;
            const data = {iD:id, uiD: uid, imageID: image_store_id}
            console.log("data", data)
            
            // the return of setting the movieData is the last thing to be called 

            return  setMovieData(data)                    

            })
            .catch((error) => {
            console.log(error);
            });
                  
    }
    

    useEffect(() => {
        
        getMovieDetail()
        
    }, [])




    return(
        <div className="main-content">
        
        <div className="mainlivetv">
                    <p style={{marginLeft: "30px"}}> Movies</p>
                    <i class="fa fa-ellipsis-v mainlivetv-dots" aria-hidden="true" />
        </div>        
        
            <div className="main-content-y-scrollable">

                { !(location.state && movieData) ?

                        <div style = {{ width: "32%", margin: "25% auto"}}><p> Select movie detail from Home ... </p></div> 
                                       
                        :

                        <div className="movie-det-wide">
                            <div className="movie-det-poster" >
                            {console.log("imageid from categories page",movieData.imageID)}
                            {console.log("movieData", movieData)}
                            <img className="poster-img"
                                src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${location.state.detail.imageID}?accessKey=WkVjNWNscFhORDBLCg==`} alt={320872} 
                                style = {{width: "auto"}}
                                /> 
                            </div>
                            <div className="movie-det-poster-info">
                                <h3 style={{marginTop: "3%", color:"white"}}>{movieData.uiD}</h3>
                                <p>2016</p>
                                
                                {/* <i class="fas fa-hourglass"></i> */}
                                <div className="movie-det-poster-info-sub"><div><i className="fa fa-clock-o" style={{color: "gray", width: "10%", marginRight: "7px"}}></i>1 hr 30 min</div><div style={{marginLeft: "3%"}}>Ratings</div> </div>
                                <div className="play-movie-trailer">
                                    <Link className="play-movie-trailer-button shadow-none" style ={{ border: "none", width: "25%"}}
                                       to = {{
                                           pathname: "/moviestrailer",
                                           state: {
                                                detail: {
                                                    id: movieData.iD
                                                }
                                            }
                                        }}
                                      >
                                        {/* <i className="fa fa-play" style={{color:"#1f2326", textAlign: "left !important", marginTop:"4%",  height: "95%"}}></i> */}
                                        <p style={{marginLeft: "8px", marginTop:"4%" ,  height: "95%", fontWeight: "thick" , margin: "auto"}}>
                                            Watch Trailer
                                        </p>
                                    </Link>
                                    {/* <p style={{width: "17%", marginLeft: "10%", paddingTop: "0.5%"}}> Watch Now </p> */}
                                    <Link className="play-movie-trailer-button shadow-none" style={{marginLeft: "0% ", border: "none", marginLeft: "7%", width: "25%", marginRight: "20px"}}
                                        to = {{
                                            pathname: "/moviestream",
                                            state: {
                                                detail: {
                                                    uid: movieData.uiD
                                                }
                                             }
                                        }}
                                       >
                                        <i className="fa fa-play" style={{color:"#1f2326", textAlign: "left !important", marginTop:"2.5%",  height: "90%", marginLeft: "10%"}}></i>
                                        <p style={{marginLeft: "8px", marginTop:"1%" ,  height: "95%", fontWeight: "thick"}}>
                                            Play Movie
                                        </p>
                                    </Link>
                                </div>
                                <div style={{marginTop: "3%"}}>Joe, a programmer and obsessive self-quantifier, and Emily, a budding comedy performer, are happily married until they decide to use one another in their work. A dark comedy about love, technology, and what can’t be programmed</div>
                                <div className="movie-det-poster-info-org" >
                                    <div><p>Directed BY:  Logan Kibbens</p></div>
                                </div>
                            </div>
                        </div>

                }


            </div>
        </div>
    )
}

export default MovieDetailZ;





