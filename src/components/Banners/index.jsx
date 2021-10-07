
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const data_srv = [
    {title: "Bedazzled",duration: "2:46AM", img:321130},
    {title: "Calabar Carnival", duration: "12:46PM", img: 321132},
    {title: "Burial Boys", duration: "3:46PM", img: 321126}
]


// get banners with id and info from the get all banners 
//and also their title and append 
// first get it using usestate here and then use reducers to get using usestate 












const Banners = () => {

    const [data, setData]=useState([])
    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://ott.tvanywhereafrica.com:28182/api/client/v1/testglotv/banners?translation=en&accessKey=WkVjNWNscFhORDBLCg==',
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            console.log("This is the response from the banners api", JSON.stringify(response.data));
            setData(response.data.data)
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])



    return(
        <>
            <div className="dashboard-banners">

                <div className="dashboard-banners-main-title">                            
                    <a className="dsh-bn-mn-title-text" >What's On How</a>
                    <span style={{"color":"grey"}}> --Live TV</span>
                </div>

                <div className="dashboard-banners-main-content">
                    {/* cards div for banners and content comes here */}

                    {data.map( ({title, banner_image_id}) => 

                            <div className="dashboard-first-banner-card">
                                <img className="dashboard-first-banner-card-img"  src= {`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${banner_image_id}?accessKey=WkVjNWNscFhORDBLCg==`}/>
                                {/* card text */}
                                <div className="dashboard-first-banner-card-text">
                                    {/* title */}
                                    <a>{title}</a>
                                    {/* duration */}
                                    <span style={{"color":"grey"}}><small>Today at </small></span>

                                </div>
                            </div> ) }



                </div>

            </div>  
        </>
    )
}

export default Banners;