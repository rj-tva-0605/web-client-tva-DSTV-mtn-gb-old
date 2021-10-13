// get package ids in cookies  from newdashboard  page

import React from 'react';
import './style.css';
import logo from '../../assets/images/mtn-logo.png';
import loading from '../../assets/gifs/loading_glo.gif'
import axios from 'axios';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import ChannelsTemplate from './ChannelsTemplate'




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
    const [categoryIdsNames, setCategoryIdsNames] = useState(false)

    const [currentChannel, setCurrentChannel] = useState("kids")








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





    
    const channelDetailZ = async(channelcats, stringPackages, access_token ,operator_uid, user_id) =>{

    

    var categoryTempids = []
    var categoryTempNames = []
    // var stringPackages = packageTempids.join(',')
    
    console.log('stringPackages', stringPackages)

        var config = {
            method: 'get',
            url: `https://ott.tvanywhereafrica.com:28182/api/client/v2/${operator_uid}/channels?packages=${stringPackages}`,
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
    






    const channelCategory = (stringPackages, access_token, user_id, operator_uid) =>{

       
 
        var channelCategoryUID = []
        var channelCategoryDetail = [] 

        
        
        console.log('stringPackages', stringPackages)
    
            

            var config = {
            method: 'get',
            url: `https://ott.tvanywhereafrica.com:28182/api/client/v1/${operator_uid}/categories/channels`,
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
            
            return channelDetailZ(channelcats, stringPackages ,access_token ,operator_uid, user_id);

            //actual use in the idealCategoryChannel app
            // return setCategoryIdsNames(response.data.data)

            })
            .catch(function (error) {
            console.log(error);
            });

    }

    



    useEffect(() => {   
        const access_token = cookies.get("access_token");
        const user_id = cookies.get("user_id");
        const operator_uid = cookies.get("operator_uid");
        var stringPackages = cookies.get("stringPackages")   
        
        setTimeout(
            () => {
                channelCategory(stringPackages, access_token, user_id, operator_uid);
                
            },
            1 * 1000
          );

    }, [])





    return(
        <>

        

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

                            <Link className="main-nav " 
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
                            
                            <Link className="main-nav highlit-div" 
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
                        
                        {/* define ideal content here  */}
                        { !idealChannelContent ? 
                                    ""
                                    :    
                                    <div className="sec-Navbar" style={{display: 'flex',  justifyContent:'center' }}>                             
                                        
                                            
                                                {Object.entries(idealChannelContent).map(([key, value]) =>                            
                                                    
                                                        <button 
                                                            onClick={(e)=>{e.preventDefault();setCurrentChannel(key)}}
                                                            className={"sec-nav " + (!(currentChannel === key) ? '' : 'sec-highlit-div')}
                                                            style={{color: !(currentChannel === key) ? 'white' : 'rgb(250, 250, 51)', backgroundColor:"transparent", border:"none"}}
                                                            
                                                            >
                                                                {key} 
                                                        </button>
                                                    
                                                    )}
                                        
                                        
                                    </div>
                        }
                        
                    </div>




                                    
                    { !idealChannelContent ? 
                            <div className="main-dashboard">
                                <div >
                                    <img src={loading} style={{width:"40%", height:"10%", top: "20", margin: "12% auto", marginLeft: "30%",  }} />
                                </div>
                            </div>
                            :
                                    
                    
                            <div >
                                        <ChannelsTemplate
                                            channels = {idealChannelContent[currentChannel]}
                                        /> 
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
        
        </>
        )


    }

export default DashboardChannels;









