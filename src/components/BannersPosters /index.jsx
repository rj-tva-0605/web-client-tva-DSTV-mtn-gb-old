
import React, {useState, useEffect} from 'react';
import  Carousel  from 'react-elastic-carousel';

import Item from './Items'
import './BannersPosters.css'
import axios from 'axios';





const BannersPosters = () => {

    const [data, setData]=useState([])
    const [items, setItems] = useState([])

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
      ];




    useEffect(async() => {
        var config = {
            method: 'get',
            url: 'https://ott.tvanywhereafrica.com:28182/api/client/v1/testglotv/banners?translation=en&accessKey=WkVjNWNscFhORDBLCg==',
            headers: { }
          };
          
          await axios(config)
          .then(function (response) {
            console.log("This is the response from the banners api", JSON.stringify(response.data.data[0]));
            let newarray = []
            let count = 0
            for (count  in response.data.data){

                newarray.push(response.data.data[count])
                count = count + 1
            }

            const anotherarray = newarray.map(({banner_image_id, title}) => {
                return ({banner_image_id, title} )
                
              })

           
            setData(anotherarray)
            console.log('this is the data from BannerPosters', data)
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])



    return(
        <>
            <div className="dashboard-banners"  >

                <div className="dashboard-banners-main-title">                            
                    <a className="dsh-bn-mn-title-text" >What's On How</a>
                    <span style={{"color":"grey"}}> --Live TV</span>
                </div>

                <div className="dashboard-banners-main-content">
                    {/* cards div for banners and content comes here */}

                                            
                            <Carousel breakPoints={breakPoints}>
                                {data.map(({title, banner_image_id}) => 
                                    <Item>
                                    <img className="poster-img"
                                        src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${banner_image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={banner_image_id} />            
                                    </Item>
                                )}
                            </Carousel>
                                             



                </div>

            </div>  
        </>
    )
}

export default BannersPosters;