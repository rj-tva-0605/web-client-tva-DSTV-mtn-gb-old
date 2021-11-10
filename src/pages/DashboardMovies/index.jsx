// get package ids in cookies  from newdashboard  page

import React from 'react';
import './style.css';
import logo from '../../assets/images/mtn-logo.png';

import axios from 'axios';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router";


import List from './list'

import NavbarGeneral from 'components/NavbarGeneral';
import FooterGeneral from 'components/FooterGeneral';




const cookies = new Cookies();


 const DashboardMovies = () =>{


    const [categoryIDs, setCategoryIDs] = useState([])
    const [IdealContent, setIdealContent] = useState(false)

    //  use redux instead to store it like storing access 
    //  token const [purchasedIdealContent, setPurchasedIdealContent] = useState(false)
    const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn)
    const history = useHistory();







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

             console.log(" i value ", i)            
             let arCont = vodContent.[i].content ;
             let arContmod = removeNull(vodContent[i].content)
             trimContent.push(arContmod)
             console.log("Content filtered out from trimContent", trimContent)
            
             trimName.push(vodContent[i].id )
        }

        console.log("Content in all movies from VOD Category", )
        console.log('trimContent', trimContent)
        

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
                        return contentVal.["type"] === "movie"
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
    
                    
    
                    console.log('this is catIds ', categoryIDs)                
    
                    let categoryDictTemp = dictMaker(categoryTempids, categoryTempNames)
                    console.log('Category ids and names', categoryDictTemp)
    
                    if(categoryIDs && categoryDictTemp ){vodcontentAllMovies(stringPackages, categoryTempids, access_token,categoryDictTemp, operator_uid)}
    
                    
            })
            .catch(function (error) {
                console.log(error);
            });
    
       }
    
    
       


    useEffect(() => {

        if(isUserLoggedIn){
            history.push({
                pathname:'/newdashboard'
            })}else{history.push({
                pathname:'/'
            })}   

        const access_token = cookies.get("access_token");
        const user_id = cookies.get("user_id");
        const operator_uid = cookies.get("operator_uid");
        var stringPackages = cookies.get("stringPackages") 

        categoryIDfunc(stringPackages,access_token, user_id, operator_uid);

        setTimeout(
            () => {
                categoryIDfunc(stringPackages,access_token, user_id, operator_uid);
            },
            2 * 1000
          );

    }, [])





    return(

            <div className="main-dashboard">

                <div className="navbars-ctrl">
                    
                    <NavbarGeneral />
                    
                                             
                    
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
                    <FooterGeneral />
                
            </div>
    )


}

export default DashboardMovies;









