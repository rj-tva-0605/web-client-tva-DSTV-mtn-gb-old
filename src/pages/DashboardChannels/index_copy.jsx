// get package ids in cookies  from newdashboard  page

import React from 'react';
import './style.css';
import logo from '../../assets/images/glo-logo.png';
import axios from 'axios';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

import List from './ChannelsTemplate'




const cookies = new Cookies();


 const DashboardChannels = () =>{
    const [packageIDs, setPackageIDs] = useState(false)
    const [categoryIDs, setCategoryIDs] = useState([])
    const [idealChannelContent, setIdealChannelContent] = useState(false)
    const [channelCategories, setChannelCategories] = useState(false)
    const [trimVal, setTrimVal] = useState("")
    const [trimCont, setTrimCont] = useState(false)

    const [ dataReady, setDataready] = useState(false)

    const [channelDetaiLs, setChannelDetaiLs] = useState(false) 
    const [categoryIdsNames, setCategoryIdsNames] =useState(false)








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





    const specialDictMaker = (colz,rowz) => {       
        var result =  rowz.reduce(function(result, field, index) {
            result[colz[index]] = field;
            return result;
                }, {})
        return result 
    }

    const idealChannelCategoryfunc = (categoryIdsNames, channelDetaiLs) =>{
        console.log("This is ChannelDetails", channelDetaiLs)
        console.log("This is category Names and IDs ", categoryIdsNames)
        var majorArray = []
        var categoryChannelsNames = []
        // console.log("total length of objects in categoryof channels", categoryIdsNames.length)

        for (let x=0; x < categoryIdsNames.length; x++){
            var minorArray = []
            // console.log("total length of objects in categoryof channels", categoryIdsNames.length)
            for (let y=0; y < categoryIdsNames[x].channels.length ; y++){

                // console.log("Channel Category IDs and Names " ,categoryIdsNames[x].channels)
                let catidnames = categoryIdsNames[x].channels

                for (let i = 0; i < channelDetaiLs.length; i++){
                    if(catidnames[y].id === channelDetaiLs[i].id){
                        minorArray.push(channelDetaiLs[i])}
                }                

            }

            
            // console.log(categoryIdsNames[x].uid)
            categoryChannelsNames.push(categoryIdsNames[x].uid)
            majorArray.push(minorArray)
            // dictMaker()
            
        }
        
        let finaldata = (dictMaker(categoryChannelsNames ,majorArray))

        console.log("idealChannelCategory data is ready", majorArray)
        console.log("Categories Channel names ", categoryChannelsNames)
        console.log("final Data  ", finaldata)

        return setIdealChannelContent(dictMaker(categoryChannelsNames ,majorArray))

    }





    
    const channelDetailZ = async(channelcats) =>{

    var stringPackages = cookies.get("stringPackages") 
    const access_token = cookies.get("access_token")

    var categoryTempids = []
    var categoryTempNames = []
    // var stringPackages = packageTempids.join(',')
    
    console.log('stringPackages', stringPackages)

        var config = {
            method: 'get',
            url: `https://glonigeria.tvanywhereafrica.com:28182/api/client/v2/testglotv/channels?packages=${stringPackages}`,
            headers: { 
            'Authorization': `Bearer ${access_token}`
            }
        };
        
        await axios(config)
        .then((response) => {
            console.log("this is data for Channels available based on user packages", response.data.data);
            // return setChannelDetaiLs(response.data.data)
            return idealChannelCategoryfunc(channelcats, response.data.data)
                
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    






    const channelCategory = () =>{

        var stringPackages = cookies.get("stringPackages") 
        const access_token = cookies.get("access_token")
 
        var channelCategoryUID = []
        var channelCategoryDetail = [] 

        
        
        console.log('stringPackages', stringPackages)
    
            

            var config = {
            method: 'get',
            url: 'https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/testglotv/categories/channels',
            headers: { 
                'Authorization': `Bearer ${access_token}`
            }
            };

            axios(config)
            .then(function (response) {
            console.log("Channels ", JSON.stringify(response.data.data));

            var jSonifiedResponse = JSON.stringify(response.data.data)


            for (let i = 0; i < response.data.data.length; i++){    
                channelCategoryUID.push(response.data.data.[i].uid)
                channelCategoryDetail.push(response.data.data.[i].channels)

                // channelCategoryDetail.push(jSonifiedResponse.[i].type)
                }

            console.log("Channel UIDs as a list  ", JSON.stringify(channelCategoryUID));
            console.log("Channel Details as a list  ", (channelCategoryDetail));
            setChannelCategories(response.data.data)

            var channelcats = response.data.data
            
            return channelDetailZ(channelcats);

            //actual use in the idealCategoryChannel app
            // return setCategoryIdsNames(response.data.data)

            })
            .catch(function (error) {
            console.log(error);
            });

    }

    



    useEffect(() => {     

           
        setTimeout(
            () => {
                channelCategory();
                
            },
            1 * 1000
          );

    }, [])





    return(

        <div className="main-dashboard">

            <div className="navbars-ctrl">
                <div className="main-Navbar"> 
                    {/* <p className="main-nav logo "> */}
                        <img src={logo} className="main-nav logo "/>
                    {/* </p> */}                        
                    <div className="main-nav">Features</div>
                    <div className="main-nav">Movies</div>
                    <div className="main-nav ">TV Shows</div>
                    <div className="main-nav highlit-div">Live TV</div>
                    <div className="main-nav">TV Guide</div>
                    <div className="main-nav">My List</div>
                </div>
                { !idealChannelContent ? <div className="mx-auto" style ={{marginTop:"250px", marginLeft: "60px"}} >Loading Content ...</div>
                    :
                    
                <div className="sec-Navbar" style={{display: 'flex',  justifyContent:'center' }}> 
                    
                    <div className="sec-nav sec-highlit-div">All</div>
                    {Object.entries(idealChannelContent).map(([key, value]) =>
                     
                    <div className="sec-nav">{key}</div>)}
                    
                </div>
                
                }
            </div>
            <div className="scroll-in-centrediv">
                <div className="centered">
                    <div className="cards">
                    {Object.entries(idealChannelContent).map(([key, value]) => (
                                                 
                                value.map(({id, logos, uid}) =>  
                                <div className="card">
                                    <img className="" 
                                            src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${logos.NORMAL}?accessKey=WkVjNWNscFhORDBLCg==`} alt={logos.NORMAL} />                                                  
                                        {console.log(uid)}
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

export default DashboardChannels;









