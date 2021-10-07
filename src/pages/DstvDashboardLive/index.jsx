

import React from 'react';
import './style.css';
import logo from '../../assets/images/glo-logo.png';
import axios from 'axios';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';


const cookies = new Cookies();


 const DstvDashboard = () =>{
    const [packageIDs, setPackageIDs] = useState(false)
    const [categoryIDs, setCategoryIDs] = useState([])
    const [IdealContent, setIdealContent] = useState(false)
    const [trimVal, setTrimVal] = useState("")
    const [trimCont, setTrimCont] = useState(false)






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
        setTimeout(function(){setTrimCont(trimContent)}, 300)
         // setTrimCont(trimContent)
        setTrimVal(trimVal)

        let finalTrimContent = dictMaker(trimName, trimContent)
        
        let ftrimContentValues = Object.values(finalTrimContent)
 
        let ftrimTitleValues = Object.values(categoryDictTemp)
 
        let iDealcontent = dictMaker(ftrimTitleValues, ftrimContentValues)
        console.log('iDealcontent', iDealcontent)
 
        setIdealContent(iDealcontent)
 
        setTrimCont(true)
 
 
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
            console.log('VodContent Here', response.data.data, categoryDictTemp)
            trimContentFunc(response.data.data, categoryDictTemp)
    
    
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    const categoryIDfunc = async(packageTempids, access_token) =>{
 
        var categoryTempids = []
        var categoryTempNames = []
        var stringPackages = packageTempids.join(',')
        
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
    



    const packageIDfunc = async() =>{
        const access_token = cookies.get("access_token")
        let packageTempids = []

        var config = {
            method: 'get',
            url: 'https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/testglotv/users/48965/packages?device_class=desktop',
            headers: { 
              'Authorization': `Bearer ${access_token}`
            }
          };
          
          await  axios(config)
          .then( (response) => {
            console.log('This the various packages from the package api ', JSON.stringify(response.data));
            for (let i = 0; i < response.data.data.length; i++){
            packageTempids.push(response.data.data.[i].id)
            }
            
            setPackageIDs(packageTempids)
            console.log(packageIDs)

               if (packageTempids !== false ){
                let stringPackages = packageTempids.join(',')
                console.log('string Packages for packageIDs' ,stringPackages)
                categoryIDfunc(packageTempids , access_token)
                    }
                else{console.log('PackageIds not ready')}
            
          })
          .catch( (error) => {
            console.log(error);
          });

          

    }








    useEffect(() => {
        packageIDfunc()
    }, [])

    return(

            <div className="main-dashboard">

                <div className="navbars-ctrl">
                    <div className="main-Navbar"> 
                        {/* <p className="main-nav logo "> */}
                            <img src={logo} className="main-nav logo "/>
                        {/* </p> */}                        
                        <div className="main-nav">Live Tv</div>
                        <div className="main-nav highlit-div">TV Shows</div>
                        <div className="main-nav">Movies</div>
                        <div className="main-nav">Sport</div>
                        <div className="main-nav">TV Guide</div>
                    </div>
                    { !IdealContent ? <div className="mx-auto" style ={{marginTop:"250px", marginLeft: "60px"}} >Loading Content ...</div>
                        :
                        
                    <div className="sec-Navbar" style={{display: 'flex',  justifyContent:'center' }}> 
                        
                        <div className="sec-nav sec-highlit-div">All</div>
                        {Object.entries(IdealContent).map(([key, value]) =>
                         
                        <div className="sec-nav">{key}</div>)}
                        
                    </div>
                    
                    }
                </div>
                <div className="scroll-in-centrediv">
                    <div className="centered">
                        <div className="cards">
                        {Object.entries(IdealContent).map(([key, value]) =>(
                                                        
                                value.map(({id, image_id, title}) =>  
                            <div className="card">
                                <img className="" 
                                        src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={image_id} />                                                  
                                       
                            </div>
                                ) 

                        ))}
            
                            
            
                        </div>
                    </div>
                </div>
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

export default DstvDashboard;