//store the string packages and the purchased packages in the reducer
// check the example for login 
// distribute info check the example for logout 
// check the if we can call the value of any string from the json then we can access 
// without doing any export of value in json file 
//then we can just tweak the variable en and portuguese 
import translations from 'translations';

import React from 'react';
import './style.css';
import logo from '../../assets/images/mtn-logo.png';
import axios from 'axios';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import NavbarGeneral from 'components/NavbarGeneral';
import FooterGeneral from 'components/FooterGeneral';

import PackagesDisplay from '../../components/PackagesDisplay';

import NewPackagesDisplay from 'components/NewPackagesDisplay';



import List from './list'




const cookies = new Cookies();


 const DstvDashboard = () =>{
    const [packageIDs, setPackageIDs] = useState(false)
    const [categoryIDs, setCategoryIDs] = useState([])
    const [IdealContent, setIdealContent] = useState(false)
    const [trimVal, setTrimVal] = useState("")
    const [trimCont, setTrimCont] = useState(false)

    const [ dataReady, setDataready] = useState(false)

    const history = useHistory();
    const location = useLocation();

    
    const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn)




 
    




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



    const vodcontentAllMovies = (stringPackages, categoryTempids, access_token, categoryDictTemp, user_id, operator_uid) =>{

        var config = {
            method: 'get',
            url: `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/categories/vod/content?packages=${stringPackages}&categories=${categoryTempids}`,
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

    const categoryIDfunc = async(packageTempids, access_token, user_id, operator_uid) =>{
 
        var categoryTempids = []
        var categoryTempNames = []
        var stringPackages = packageTempids.join(',')
        
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
    
                    if(categoryIDs && categoryDictTemp ){vodcontentAllMovies(stringPackages, categoryTempids, access_token,categoryDictTemp, user_id, operator_uid)}
    
                    
            })
            .catch(function (error) {
                console.log(error);
            });
    
       }
    



    const packageIDfunc = async() =>{
        const access_token = cookies.get("access_token")
        const user_id = cookies.get("user_id");
        const operator_uid = cookies.get("operator_uid");
        console.log("Operator uid Test happens here ", operator_uid)
        let packageTempids = []
        let purchasedPackageIds = []

        var config = {
            method: 'get',
            url: `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/users/${user_id}/packages?device_class=desktop`,
            headers: { 
              'Authorization': `Bearer ${access_token}`
            }
          };
          
          await  axios(config)
          .then( (response) => {
            console.log('This the various packages from the package api ', JSON.stringify(response.data));
            for (let i = 0; i < response.data.data.length; i++){
                packageTempids.push(response.data.data.[i].id)
                // do seperation for purchased packages here before we set it in the cookie 
                if (response.data.data.[i].purchased !== "null"){
                    purchasedPackageIds.push(response.data.data.[i].id)
                }

            }

            

            
            setPackageIDs(packageTempids)
            console.log(packageIDs)

               if (packageTempids !== false ){
                let stringPackages = packageTempids.join(',')
                let purchasedStringPackages = purchasedPackageIds.join(',')
                
                console.log('string Packages for packageIDs' ,stringPackages)
                console.log('Purchased for packageIDs' ,purchasedPackageIds)

                // setting value as a cookie to be used later 
                cookies.set("stringPackages", stringPackages)
                cookies.set("purchasedPackageIds", purchasedPackageIds)

                categoryIDfunc(packageTempids , access_token, user_id, operator_uid)
                    }
                else{console.log('PackageIds not ready')}
            
          })
          .catch( (error) => {
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

        packageIDfunc()

        setTimeout(
            () => {
                packageIDfunc();
            },
            2 * 1000
          );

    }, [])





    return(

            <div className="main-dashboard">

                <div className="navbars-ctrl">

                    <NavbarGeneral />
                    {/* <div>{process.env.REACT_APP_ENV_SETTINGS}</div> */}
                                            
                </div>
                
                
                
                { !IdealContent ? <div className="mx-auto" style ={{marginTop:"250px", marginLeft: "560px"}} >Loading Content ...</div>
                        :
                <div className="scroll-in-centrediv" style={{paddingTop: "5%"}} >

                    <div style={{width: "94%", margin: "0 auto", display: "flex", flex: "no-wrap", justifyContent: "space-between", marginBottom: "3%"}}>
                        
                        <div style={{ width: "", height: "", flex: "0 1 24%", }}>
                            <img className="" 
                                style={{ width: "95%", height: "150px", borderRadius: "4px" }}
                                src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${322780}?accessKey=WkVjNWNscFhORDBLCg==`} alt={322780} />  
                        </div>
                        <div style={{ width: "", height: "", flex: "0 1 24%" }}>
                            <img className="" 
                                style={{ width: "95%", height: "150px", borderRadius: "4px" }}
                                src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${322777}?accessKey=WkVjNWNscFhORDBLCg==`} alt={322777} />  
                            </div>
                        <div style={{ width: "", height: "", flex: "0 1 24%", borderRadius: "4px"}}>
                            <img className="" 
                                style={{ width: "95%", height: "150px" }}
                                src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${322755}?accessKey=WkVjNWNscFhORDBLCg==`} alt={322755} />  
                            </div>
                        <div style={{ width: "", height: "", flex: "0 1 24%"}}>
                            <img className="" 
                                style={{ width: "95%", height: "150px", borderRadius: "4px"}}
                                src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${322746}?accessKey=WkVjNWNscFhORDBLCg==`} alt={322746} />  
                            </div>
                    </div>
                  
                   <div style={{width: "90%", margin: "0 auto", marginTop: "1%", marginBottom: "3%"}}>
                        {/* <h3> Choose a plan that is right for you</h3> */}
                        {/* <p>Downgrade or upgrade at anytime</p> */}
                    </div>
                   {/* packages are here  */}
                   {/* <PackagesDispay style={{width: "30%"}}/> */}
                  <br />
                  <br />
                  <NewPackagesDisplay style={{width: "90%"}}/>
                  <br />
                  <br />

                        {Object.entries(IdealContent).map(([key, value]) =>(
                            <List catgName={key}  
                                movies = {value}
                            />
                        ))}

                       
                 
                </div>
                    }

                    <FooterGeneral />
                    
                    {/* {console.log( "settings from the env ")} */}
            </div>
    )


}

export default DstvDashboard;









