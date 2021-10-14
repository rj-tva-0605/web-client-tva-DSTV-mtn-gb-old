// get package ids in cookies  from newdashboard  page

import React from 'react';
import './style.css';
import logo from '../../assets/images/mtn-logo.png';
import axios from 'axios';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import List from './list'




const cookies = new Cookies();


 const DashboardTvShows = () =>{


    const [categoryIDs, setCategoryIDs] = useState([])
    const [IdealContent, setIdealContent] = useState(false)
    const [purchSeriesDetail, setPurchSeriesDetail] = useState(false)
    const [seriesDetail, setSeriesDetail] = useState(false)

    //  use redux instead to store it like storing access 
    //  token const [purchasedIdealContent, setPurchasedIdealContent] = useState(false)







   const dictMaker = (colz,rowz) => {       
        var result =  rowz.reduce(function(result, field, index) {
        result[colz[index]] = field;
        return result;
        }, {})
    return result 
    }

    const removeNull = (array) =>{
        return array.filter(x => x !== null)
        };


    const trimContentFunc = (vodContent, categoryDictTemp) =>{
        console.log('Vod Content within trimContentFunc ', vodContent)
        let trimContent = []
        let trimName = []
        let newVodContent = []
 
        for ( let i = 0;  i in vodContent; i++  ){  

             let arCont = vodContent.[i].content ;
             let arContmod = removeNull(vodContent[i].content)
             trimContent.push(arContmod)
            
             trimName.push(vodContent[i].id )
        }

        

        let finalTrimContent = dictMaker(trimName, trimContent)
        
        let ftrimContentValues = Object.values(finalTrimContent)
 
        let ftrimTitleValues = Object.values(categoryDictTemp)
 
        let iDealcontent = dictMaker(ftrimTitleValues, ftrimContentValues)
        console.log('iDealcontent', iDealcontent)
 
        setIdealContent(iDealcontent)
  
 
    }



    const vodcontentAllMovies = (stringPackages, categoryTempids, access_token, categoryDictTemp, operator_uid) =>{
        console.log("vodContent stringPackages", stringPackages)

        let newContent = []
        // let respCont = []
        var config = {
            method: 'get',
            url: `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/categories/vod/content?packages=${stringPackages}&categories=${categoryTempids}`,
            headers: { 
                'Authorization': `Bearer ${access_token}`            }
        };
        
        axios(config)
        .then(function (response) {
            console.log('this is the data for all movies far all categories   ',  JSON.stringify(response.data));
            console.log('VodContent Here', response.data.data)
            console.log('Category Ids and their names', categoryDictTemp)
            const respCont = response.data.data
            let maxArray = []
            
            
            for (let y = 0; y in respCont; y++ ){
                
                
                console.log(`array result from respCont ${y} content`, respCont[y].content)
                let minArray = []

                for (let x = 0; x in respCont[y].content; x++ ){
                    const movieValFilter = (contentVal) => {
                        return contentVal.["type"] === "series"
                    }
                   
                    let reslt = respCont[y].content.filter(movieValFilter)
                    minArray = reslt
                }

                respCont[y].content = minArray

            }
            console.log(`array NEW result  replace respCont  content`, respCont)


            trimContentFunc(respCont, categoryDictTemp)
            appendNewIDs(respCont)    
    
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }


    const appendNewIDs = (resp) =>{
        let respList = resp
        var appendNewList = []

        var count = 0
        for (let i; i < respList.length; i++){
            // console.log("i value", i)
            for (let y;  y < respList.[i].content.length; y++){
                console.log("y value", respList.[i].content.[y])
                respList.[i].content.[y].["new_unique_id"] = count + 1
            }
        }

        console.log("New RespList adding unique key ", respList)

    }

    const categoryIDfunc = async(stringPackages,access_token, user_id, operator_uid) =>{

        
 
        var categoryTempids = []
        var categoryTempNames = []
        // var stringPackages = packageTempids.join(',')
        
        console.log('stringPackages', stringPackages)
    
            var config = {
                method: 'get',
                url: `https://ott.tvanywhereafrica.com:28182/api/client/v3/${operator_uid}/categories/vod?packages=${stringPackages}`,
                headers: { 
                'Authorization': `Bearer ${access_token}`
                }
            };
            
            await axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                for (let i = 0; i < response.data.data.length; i++){
    
                    categoryTempNames.push(response.data.data.[i].name)
                    categoryTempids.push(response.data.data.[i].id)
                    }   
    
                    setCategoryIDs(categoryTempids)

                    let purchasedSeriesStatusTemp =  purchSeriesStatusFunc(access_token, stringPackages, operator_uid, user_id)
                    

                    
                    

                    
                    
                    
    
                    console.log('this is catIds ', categoryIDs)                
    
                    let categoryDictTemp = dictMaker(categoryTempids, categoryTempNames)
                    console.log('Category ids and names', categoryDictTemp)
    
                    if(categoryIDs && categoryDictTemp ){vodcontentAllMovies(stringPackages, categoryTempids, access_token,categoryDictTemp, operator_uid)}
                    
                    
            })
            .catch(function (error) {
                console.log(error);
            });
    
       }
    
    

    const purchSeriesStatusFunc = async(access_token, stringPackages, operator_uid, user_id) =>{

        let seriesIdsTemp = [10216,10215]
        let seriesIds = seriesIdsTemp.join(',')

        var config = {
        method: 'get',
        url: `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/users/${user_id}/series?packages=${stringPackages}`,
        headers: { 
            'Authorization': `Bearer ${access_token}`
        }
        };

        axios(config)
        .then((response) => {
            // console.log("Response from purchSeriesStatus", response.data.data);
            let purchstuff = response.data.data
            seriesDetailsEpisodeFunc(access_token, stringPackages, operator_uid, user_id, seriesIds, purchstuff)
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const seriesDetailsEpisodeFunc = (access_token, stringPackages, operator_uid, user_id, series_ids, purchstuff) => {

        var config = {
        method: 'get',
        url: `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/series?series_id=${series_ids}`,
        headers: { 
            'Authorization': `Bearer ${access_token}`
        }
        };

        axios(config)
        .then((response) => { 
            
            console.log("Response from seriesDetailsEpisode", response.data.data, "purchStuff", purchstuff);
            arrangeDetailsOfSeries(purchstuff, response.data.data)
        }
        )
        .catch(function (error) {
        console.log(error);
        });
    }


    const arrangeDetailsOfSeries = (purchasedSeriesStatus, seriesDetailsEpisode) =>{
        // use dictMaker to make new dicts with id and the data 
        // in the arrays from response of the two data
        let interMediatePurchSeriesArray = []
        let interMediateseriesDetailsEpisode = []

        for(let i = 0 ; i < purchasedSeriesStatus.length; i++){
            interMediatePurchSeriesArray.append(purchasedSeriesStatus[i].["id"])           
        }

        for(let i = 0 ; i < seriesDetailsEpisode.length; i++){    
            interMediateseriesDetailsEpisode.append(seriesDetailsEpisode.[i].id)
        }

        console.log("interMediateSeriesArray " ,interMediatePurchSeriesArray)
        console.log("interMediateseriesDetailsEpisode" ,interMediateseriesDetailsEpisode)
        // key value to be used to check the purchase value and detail of the series respectively

        let newPurchDetails = dictMaker(interMediatePurchSeriesArray, purchasedSeriesStatus)
        console.log("new purch details", newPurchDetails)

        let newSeriesDetails = dictMaker(interMediatePurchSeriesArray, seriesDetailsEpisode)
        console.log("new series details", newSeriesDetails)

    }


    useEffect(() => {     
        const access_token = cookies.get("access_token");
        const user_id = cookies.get("user_id");
        const operator_uid = cookies.get("operator_uid");
        var stringPackages = cookies.get("stringPackages")
        
        
        
        
        categoryIDfunc(stringPackages,access_token, user_id, operator_uid);

        setTimeout(
            () => {
                categoryIDfunc(stringPackages,access_token, user_id, operator_uid);
                console.log("Purch Series Details", purchSeriesDetail);

            },
            2 * 1000
          );

    }, [])





    return(

            <div className="main-dashboard">

                <div className="navbars-ctrl">
                    
                    <div className="main-Navbar"> 
                        {/* <p className="main-nav logo "> */}
                            <img src={logo} className="main-nav logo "/>
                        {/* </p> */}               
                        <Link className="main-nav " 
                                        style ={{ }}
                                     to = {{
                                      pathname: "/newdashboard",
                                      state: {
                                           detail: {
                                               id: ""
                                           }
                                       }
                                   }}
                                    >
                            <div className="mnvs">Featured</div>
                        </Link>
                        <Link className="main-nav  " 
                                        style ={{ }}
                                     to = {{
                                      pathname: "/moviespage",
                                      state: {
                                           detail: {
                                               id: ""
                                           }
                                       }
                                   }}
                                    >
                            <div className=" mnvs">Movies</div>
                        </Link>
                        <Link className="main-nav highlit-div " 
                                        style ={{ }}
                                     to = {{
                                      pathname: "/tvshowspage",
                                      state: {
                                           detail: {
                                               id: ""
                                           }
                                       }
                                   }}
                                    >
                            <div className=" mnvs">TV Shows</div>
                        </Link>
                        <Link className="main-nav " 
                                        style ={{ }}
                                     to = {{
                                      pathname: "/channelspage",
                                      state: {
                                           detail: {
                                               id: ""
                                           }
                                       }
                                   }}
                                    >
                            <div className="">Live TV</div>
                        </Link>

                        <div className="main-nav">TV Guide</div>

                        <div className="main-nav">My List</div>
                    </div>
                    
                                             
                    
                </div>


                
                { !IdealContent ? <div className="mx-auto" style ={{marginTop:"250px", marginLeft: "560px"}} >Loading Content ...</div>
                        :
                <div className="scroll-in-centrediv" >
                   

                        {Object.entries(IdealContent).map(([key, value]) =>(
                            <List catgName={key}  
                                movies = {value}
                            />
                        ))}

                       
                 
                </div>
                    }
                    <div className="footer-box"></div>

                    <div className= "footer">
                        <div className="footer-initial">
                            <div className="footer-fst footer-cards ">Globacom</div>
                            <div className="footer-sec footer-cards">FAQs</div>
                            <div className="footer-thr footer-cards">Live chat</div>
                        </div>
                    </div>
                
            </div>
    )


}

export default DashboardTvShows;









