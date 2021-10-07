
import React, {useState, useEffect} from 'react';
import  Carousel  from 'react-elastic-carousel';

import Cookies from 'universal-cookie';


import Item from './Items';
import './AllMoviesPackagesCategories.css';
import axios from 'axios';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { useHistory } from "react-router";

import { Link } from 'react-router-dom';

const cookies = new Cookies();




const BannersPosters = () => {

    const [data, setData]=useState([])
    const [items, setItems] = useState([])
    const [packageIDs, setPackageIDs] = useState(false)
    const [categoryIDs, setCategoryIDs] = useState([])
    const [categoryDetail, setCategoryDetail] = useState("")
    const [trimVal, setTrimVal] = useState("")
    const [trimCont, setTrimCont] = useState(false)
    const [trimData, setTrimData] = useState(false)
    const [trimDataTitle, setTrimDataTitle] = useState(false)
    const [IdealContent, setIdealContent] = useState(false)

    const history = useHistory();


    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
      ];


    //   https://stackoverflow.com/questions/41311322/how-can-i-map-over-two-arrays-at-the-same-time

    const link = [ 'www.test0.com', 'www.test1.com', 'www.test2.com' ];
    const content = [ 'this is test0 content', 'this is test1 content', 'this is test2 content' ]

    const players = (link,content) => link.map((value, index) => {
    const linkContent = content[index];
        return (
            <div>
                <div>{value}</div> 
                <div>{linkContent}</div>
            </div>
                );
              });



 


                    
    

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
       console.log('trimCont', trimCont)
       console.log('trimName', trimName)
       setTrimVal(trimVal)





       let finalTrimContent = dictMaker(trimName, trimContent)
       console.log('final trimmed content', finalTrimContent)
       console.log('category dictionary with each names ', categoryDictTemp)

       let ftrimContentValues = Object.values(finalTrimContent)
       console.log('ftrimContentValues', ftrimContentValues )

       let ftrimTitleValues = Object.values(categoryDictTemp)
       console.log('ftrimTitleValues', ftrimTitleValues)

       let iDealcontent = dictMaker(ftrimTitleValues, ftrimContentValues)
       console.log('iDealcontent', iDealcontent)

    //    newContentTemplate(iDealcontent)
        setIdealContent(iDealcontent)


        newContentTemplate(trimContent, ftrimTitleValues, iDealcontent)
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
                categoryIDfunc(packageTempids , access_token)}
                else{console.log('PackageIds not ready')}

            
          })
          .catch( (error) => {
            console.log(error);
          });

          

    }





    const oldBanners = async() => {

        var config = {
            method: 'get',
            url: 'https://ott.tvanywhereafrica.com:28182/api/client/v1/testglotv/banners?translation=en&accessKey=WkVjNWNscFhORDBLCg==',
            headers: { }
          };
          
          await axios(config)
          .then(function (response) {
            console.log("This is the response from the banners api", JSON.stringify(response.data.data));
            console.log("This is One of the response from the banners api", JSON.stringify(response.data.data[0]));
          
            const anotherarray = response.data.data.map(({banner_image_id, title}) => {
                return ({banner_image_id, title} )
                
              })

           
            setData(anotherarray)
            console.log('this is the data from BannerPosters', data)
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }







    const newContentTemplate = (trimContent, ftrimTitleValues, iDealcontent) =>   {

        
          
          for (const [key, value] of Object.entries(iDealcontent)) {
            console.log(`this is key  and value respectiverly of iDealContent ${key}: ${value.[0].uid}`);

          }
          
          



            console.log('this is trimContent', trimContent)
            
            let trimContSet = []

            
            setTimeout (function(){

            for (let i=0; i<trimContent.length; i++){
            const trimContarray =  trimContent[i].map(({image_id, title}) => {
                return ({image_id, title} );
            
            } )
            trimContSet.push(trimContarray);
                }
                            
               
            
            
            console.log('This is trimContSet', trimContSet)
            // console.log('this is trimContArray', trimContarray);
            console.log('ftrimTitleValues  and titleContent respectively  in newContent' ,ftrimTitleValues, trimContent)
            setTrimData(trimContSet);
            setTrimDataTitle(ftrimTitleValues);
            setIdealContent(iDealcontent)
            
            
            console.log('this is the data from BannerPosters', trimData)     } , 2000)   
                        
            
        }



    const movieDetailPage = (e) =>{
            e.preventDefault();

            history.push({
                pathname : "/moviedetail",
                state: {
                    detail:"Sample info from argument"
                }
            })
    }






    useEffect(() => {
        oldBanners()
        packageIDfunc()
        setTimeout(
            () => {
                packageIDfunc();
            },
            8 * 1000
          );
        
    }, [])


    


    return(
        <>
            <div className="dashboard-banners"  >

            { !IdealContent ?
                <div className="dashboard-banners-main-content">
                    <div className="mx-auto" style ={{marginTop:"250px", marginLeft: "60px"}} >Loading Content ...</div>
                    </div>
                :
            Object.entries(IdealContent).map(([key, value]) =>
            <div>


                <div className="dashboard-banners-main-title">                            
                    <p className="dsh-bn-mn-title-text" >{key}</p>
                        <span style={{"color":"grey",marginLeft:"4px"}}>  -- Movies & Shows</span>
                    {console.log("this is Ideal Content values", value)}
                </div>

                <br />
                <br />

                <div className="dashboard-banners-main-content" style={{border:"2px red solid"}}>
                                            
                            
                              <Carousel breakPoints={breakPoints} >
                            {                                
                                value.map(({id, image_id, title}) => 
                                <Link  style={{textDecoration: "none", padding: "0"}}
                                    to={{pathname: "/moviedetail", 
                                      state: { 
                                          detail: {
                                              movieID: `${id}`, 
                                              imageID: `${image_id}`,
                                              titLe: `${title}`
                                            }
                                        }  
                                      
                                      }}>
                                    <Item className="dashboard-banners-main-content-movies" style={{border:"2px red solid", padding: "0"}}>
                                    <img className="poster-img" style={{width: "270px", height:"800px"}}
                                        src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={image_id} />                                                  
                                        <p className="poster-img-p">{title}</p>
                                    </Item>
                                </Link>
                                )}
                            </Carousel>       
                            

                    </div>
            </div> )
                
                }

            </div>  
        </>


        

    ) 
    
}

export default BannersPosters;





//   https://stackoverflow.com/questions/40950546/react-js-right-way-to-iterate-over-object-instead-of-object-entries

        //    a = { 
        //     a: 1,
        //     b: 2,
        //     c: 3
        //   }
          
        //   Object.entries(a).map(([key, value]) => {
              // Pretty straightforward - use key for the key and value for the value.
              // Just to clarify: unlike object destructuring, the parameter names don't matter here.
        //   })


///////////////////////////////














{/* <>
<div className="dashboard-banners"  >

{ !trimDataTitle ?
    <div className="mx-auto" style ={{marginTop:"250px", marginLeft: "60px"}} >Loading Content ...</div>
    :
trimDataTitle.map((values,keys) =>
<div>


    <div className="dashboard-banners-main-title">                            
        <p className="dsh-bn-mn-title-text" >{values}</p>
        <span style={{"color":"grey"}}> --Live TV</span>
    </div>

    <br />
    <br />

    <div className="dashboard-banners-main-content">
                                
                
                 <Carousel breakPoints={breakPoints}>
                {                                
                    trimData[keys].map(({image_id, title}) => 
                        <Item>
                        <img className="poster-img"
                            src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={image_id} />            
                        </Item>
                    )}
                </Carousel>      
                

        </div>
</div> )
    
    }

</div>  
</> */}