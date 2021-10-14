
import React, { useState, useEffect } from 'react';
import { auto } from '@popperjs/core';

import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';

import AlertToPurchasemodal from './AlertToPurchasemodal';


import axios from 'axios';
 
// import logo from '../../assets/images/tv_anywhere_logo.png';
// import  '../Dashboard/Dashboard.css';

import './Moviedetailz.css';
import { AiOutlineRadiusSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';

const cookies = new Cookies();





const SeriesDetail = () =>{

 

    const [movieData, setMovieData] = useState(false)
    const [categoryIDs, setCategoryIDs] = useState([])
    const [IdealContent, setIdealContent] = useState(false)
    const [moviePackagePurchased, setmoviePackagePurchased] = useState(false)
    const  [showMoviePayAlert, setShowMoviePayAlert] = useState(false)
    
    const location = useLocation();


    
    

    const purchasedMoviesChecker = (packages) =>{
        let pstringpack = cookies.get("purchasedPackageIds")

        // let pstringpack = [852,765,735]
        
         for( let v = 0 ; v < packages.length; v++){
             console.log("package ids are  here", packages.[v])
             for ( let q = 0; q < pstringpack.length; q++ ){
                if (pstringpack.[q] === packages.[v].id){
                    return true
                }
            }
        }

        console.log("Hello this movie is purchased ", packages.length)
    }

    

    




   

    const getMovieDetail = (access_token, user_id, operator_uid) => {

        var config = {
            method: 'get',
            url: `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/users/${user_id}/movies/${location.state.detail.movieID}`,
            headers: { 
                'Authorization': `Bearer ${access_token}`
            }
            };
            
            axios(config)
            .then((response) => {
            // console.log("This is MOvie Detail", response.data.data);
            const  { id, uid, image_store_id, duration, packages } = response.data.data ;
            const data = {iD:id, uiD: uid, imageID: image_store_id, packageS: packages}
            console.log("data", data)
            console.log("This is Packages for this particular Movie detial", packages)
            // the return of setting the movieData is the last thing to be called 

            // check whether the movie package is bought set to true or false
            setmoviePackagePurchased(purchasedMoviesChecker(packages))

            setMovieData(data)                    

            })
            .catch((error) => {
            console.log(error);
            });
                  
    }
    
    const purchStatus = (movppurch) =>{
        setmoviePackagePurchased(movppurch)

    }

    useEffect(() => {
        const access_token = cookies.get("access_token");
        const user_id = cookies.get("user_id");
        const operator_uid = cookies.get("operator_uid");
        var purchasedPackageIds = cookies.get("purchasedPackageIds") 


        setTimeout(
            () => {
                
                getMovieDetail(access_token, user_id, operator_uid);
            },
            2 * 1000
          );
        
    }, [])

    const badaccessTomovie = (e) =>{
        e.preventDefault();
        // return alert("please buy the package to watch the movie")
        return setShowMoviePayAlert(true)

    }



    return(

        <>
        {moviePackagePurchased  ? console.log("movies are now purchased", moviePackagePurchased): ""}
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
    
                      <p style={{marginLeft: "30px"}}> Back </p>
                      {console.log(location.state.detail.title)}
                      {/* <i class="fa fa-ellipsis-v mainlivetv-dots" aria-hidden="true" /> */}
          </div>       
        

        <div className="main-content">
        
        
            <div className="main-content-y-scrollable">

                { !(location.state && movieData) ?

                        <div style = {{ width: "32%", margin: "25% auto"}}><p> Select movie detail from Home ... </p></div> 
                                       
                        :

                        <div className="movie-det-wide">
                            <div className="movie-det-poster" >
                            {console.log("imageid from categories page",movieData.imageID)}
                            {console.log("movieData", movieData)}
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


                                    { !moviePackagePurchased ? 
                                    <button className="play-movie-trailer-button shadow-none" style={{marginLeft: "0% ", border: "none", marginLeft: "7%", width: "25%", marginRight: "20px"}}
                                        
                                        onClick={e =>badaccessTomovie(e)}>
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
    </>
    )
}

export default SeriesDetail;





