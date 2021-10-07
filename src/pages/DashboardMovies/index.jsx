// get package ids in cookies  from newdashboard  page

import React from 'react';
import './style.css';
import logo from '../../assets/images/glo-logo.png';
import axios from 'axios';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import List from './list'




const cookies = new Cookies();


 const DashboardMovies = () =>{


    const [categoryIDs, setCategoryIDs] = useState([])
    const [IdealContent, setIdealContent] = useState(false)

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
        console.log('trimContentFunc ', vodContent)
        let trimContent = []
        let trimName = []
 
        for ( let i = 0;  i in vodContent; i++  ){
             let arCont = vodContent[i].content ;
             arCont.length = 15;
             let arContmod = removeNull(arCont)
             trimContent.push(arContmod)            
             trimName.push(vodContent[i].id )
        }
        console.log('trimContent', trimContent)
        

        let finalTrimContent = dictMaker(trimName, trimContent)
        
        let ftrimContentValues = Object.values(finalTrimContent)
 
        let ftrimTitleValues = Object.values(categoryDictTemp)
 
        let iDealcontent = dictMaker(ftrimTitleValues, ftrimContentValues)
        console.log('iDealcontent', iDealcontent)
 
        setIdealContent(iDealcontent)
  
 
    }



    const vodcontentAllMovies = (stringPackages, categoryTempids, access_token, categoryDictTemp) =>{

        var config = {
            method: 'get',
            url: `https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/testglotv/categories/vod/content?packages=${stringPackages}&categories=${categoryTempids}`,
            headers: { 
                'Authorization': `Bearer ${access_token}`            }
        };
        
        axios(config)
        .then(function (response) {
            console.log('this is the data for all movies far all categories   ',  JSON.stringify(response.data));
            console.log('VodContent Here', response.data.data)
            console.log('Category Ids and their names', categoryDictTemp)
            trimContentFunc(response.data.data, categoryDictTemp)
            appendNewIDs(response.data.data)

    
    
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

    const categoryIDfunc = async() =>{

        var stringPackages = cookies.get("stringPackages") 
        const access_token = cookies.get("access_token")
 
        var categoryTempids = []
        var categoryTempNames = []
        // var stringPackages = packageTempids.join(',')
        
        console.log('stringPackages', stringPackages)
    
            var config = {
                method: 'get',
                url: `https://glonigeria.tvanywhereafrica.com:28182/api/client/v3/testglotv/categories/vod?packages=${stringPackages}`,
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
    
                    
    
                    console.log('this is catIds ', categoryIDs)                
    
                    let categoryDictTemp = dictMaker(categoryTempids, categoryTempNames)
                    console.log('Category ids and names', categoryDictTemp)
    
                    if(categoryIDs && categoryDictTemp ){vodcontentAllMovies(stringPackages, categoryTempids, access_token,categoryDictTemp)}
    
                    
            })
            .catch(function (error) {
                console.log(error);
            });
    
       }
    
    



    useEffect(() => {     

        categoryIDfunc()

        setTimeout(
            () => {
                categoryIDfunc();
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
                        <Link className="main-nav highlit-div " 
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

                        <div className="main-nav">TV Shows</div>
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

export default DashboardMovies;









