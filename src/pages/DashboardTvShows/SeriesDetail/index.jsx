
import React, { useState, useEffect } from 'react';
import { auto } from '@popperjs/core';

import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';

import AlertToPurchasemodal from './AlertToPurchasemodal';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import axios from 'axios';
 
// import logo from '../../assets/images/tv_anywhere_logo.png';
// import  '../Dashboard/Dashboard.css';

import './Seriesdetailz.css';
import './SeriesEpisodesArrDetails.css';

import { AiOutlineRadiusSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { duration } from '@material-ui/core';

const cookies = new Cookies();





const SeriesDetail = () =>{
    const  [showMoviePayAlert, setShowMoviePayAlert] = useState(false)
    const [moviePackagePurchased, setmoviePackagePurchased] = useState(false)
    const [seasonNumberDrpdwn,setSeasonNumberDrpdwn]= useState(false);
    const [seasonNumber, setSeasonNumber] = useState(0)
    const location = useLocation();

    const handleSelect=(e)=>{
        console.log(e);
        setSeasonNumberDrpdwn(e)
        let seriesSplit = e.split(" ");

        // get season number 
        console.log("Season Number is", seriesSplit[1])
        setSeasonNumber(seriesSplit[1] - 1)
      }



    return(
    <>
        {console.log("main series info from tvshowspage", location.state.detail)}
        <div className="mainlivetv" style={{marginLeft: "3%", marginTop: "2%"}}>
                                <Link className="" style ={{ border: "none", width: ""}}
                                                to = {{
                                                pathname: "/tvshowspage",
                                                state: {
                                                    detail: {
                                                        id: ""
                                                    }
                                                }
                                            }}
                                                >
                                <i class="fa fa-arrow-left" />
                                </Link>
                
                                <p style={{marginLeft: "30px"}}> Back </p>
                                {console.log(location.state.detail.title)}
                                {/* <i class="fa fa-ellipsis-v mainlivetv-dots" aria-hidden="true" /> */}
                    </div>
        <div className="main-scroll-body">
            <div>
                           
                    

                    <div className="main-content">
                            
                        <div className="main-content-y-scrollable">

                            { !(location.state ) ?

                                    <div style = {{ width: "32%", margin: "25% auto"}}><p> Select movie detail from Home ... </p></div> 
                                                
                                    :

                                    <div className="movie-det-wide">
                                        <div className="movie-det-poster" >
                                        {console.log("imageid from categories page")}
                                        {console.log("movieData")}
                                        <img className="poster-img"
                                            src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${location.state.detail.imageID}?accessKey=WkVjNWNscFhORDBLCg==`} alt={320872} 
                                            style = {{width: "auto"}}
                                            /> 
                                        </div>
                                        <div className="movie-det-poster-info">
                                            <h3 style={{marginTop: "3%", color:"white"}}>{location.state.detail.title}</h3>
                                            <p>2016</p>
                                            
                                            {/* <i class="fas fa-hourglass"></i> */}
                                            <div className="movie-det-poster-info-sub"><div><i className="fa fa-clock-o" style={{color: "gray", width: "10%", marginRight: "7px"}}></i>1 hr 30 min</div><div style={{marginLeft: "3%"}}>Ratings</div> </div>
                                            <div className="play-movie-trailer">
                                                <Link className="play-movie-trailer-button shadow-none" style ={{ border: "none", width: "25%"}}
                                                to = {{
                                                    pathname: "/moviestrailer",
                                                    state: {
                                                            detail: {
                                                                id: location.state.detail.id
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


                                                { !moviePackagePurchased ? 
                                                <button className="play-movie-trailer-button shadow-none" style={{marginLeft: "0% ", border: "none", marginLeft: "7%", width: "25%", marginRight: "20px"}}
                                                    
                                                    onClick={""} >
                                                        <i className="fa fa-play" style={{color:"#1f2326", textAlign: "left !important", marginTop:"2.5%",  height: "90%", marginLeft: "10%"}}></i>
                                                        <p style={{marginLeft: "8px", marginTop:"1%" ,  height: "95%", fontWeight: "thick"}}>
                                                        Play Movie
                                                </p>
                                                </button>
                                                :
                                                <Link className="play-movie-trailer-button shadow-none" style={{marginLeft: "0% ", border: "none", marginLeft: "7%", width: "25%", marginRight: "20px"}}
                                                    to = {{
                                                        pathname: "/moviestreampage",
                                                        state: {
                                                            detail: {
                                                                uid: location.state.detail.uid
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <i className="fa fa-play" style={{color:"#1f2326", textAlign: "left !important", marginTop:"2.5%",  height: "90%", marginLeft: "10%"}}></i>
                                                    <p style={{marginLeft: "8px", marginTop:"1%" ,  height: "95%", fontWeight: "thick"}}>
                                                        Play Movie
                                                    </p>
                                                </Link>
                                                }

                                                <AlertToPurchasemodal showMoviePayAlert = {showMoviePayAlert} setShowMoviePayAlert = {setShowMoviePayAlert}/>
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
            </div>

            <div className="seri-epi-main-title" > episodes and Series Here</div>
            <div className="seri-epi-main-layout" > 

                <div className="seri-epi-main-heading-lyt">
                    <h2>Episodes</h2> 
                    <DropdownButton
                        alignRight
                        title={!seasonNumberDrpdwn?"Season1":seasonNumberDrpdwn}
                        id="dropdown-menu-align-right"
                        onSelect={handleSelect}
                    >
                        <Dropdown.Item eventKey="Season 1">Season 1</Dropdown.Item>
                        <Dropdown.Item eventKey="Season 2">Season 2</Dropdown.Item>
                        <Dropdown.Item eventKey="Season 3">Season 3</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
                    </DropdownButton>                    
                </div>
            
                <div className="episode-cards-cont" style={{width: "90%", height:"80%", border: "2px blue solid"}}>
                    {console.log("Episodes for this Season", location.state.detail.seriesDetail.seasons.[seasonNumber])}
                     {
                        !location.state.detail.seriesDetail.seasons 
                        ? 
                        <div>loading</div>
                        :
                        location.state.detail.seriesDetail.seasons.[seasonNumber].episodes.map(({image_id, number,title,uid, duration})=> 
                        <div className="episode-cards">
                            <div className="episode-number episode-gen">{number}</div>

                            <div className="episode-img episode-gen">
                                <img className=""
                                        src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={320872} 
                                        style={{objectFit: 'cover !important', width: "100%", height: "100%"}}
                                        /> 
                            </div>
                                                                                   
                            <div className="episode-description episode-gen">
                                <div className="episode-title-mins">
                                    <p>{title}</p>
                                    <p>{duration}min</p>
                                </div>
                                <div className="episode-desc">Joe, a programmer and obsessive self-quantifier, and Emily, a budding comedy performer, are happily married until they decide to use one another in their work. A dark comedy about love, technology, and what can’t be programmed</div>
                            </div>
                            
                        </div>
                    ) 
                        } 
                        {/* mapping of episode Details here */}
                    {                    
                    
                    
                    }


                </div>
            </div>
        </div>
    </>
    )
}

export default SeriesDetail;





