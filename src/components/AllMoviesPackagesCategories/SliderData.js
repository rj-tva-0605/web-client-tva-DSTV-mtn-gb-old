
import React, {useEffect,useState} from 'react';

import axios from 'axios';



export const useFetch = (query) => {

      const [fetched, setFetched] = useState(false);
      const [dataslider, setDataSlider] = useState([]);

      useEffect(() => {
          if (!query) return;

          const fetchData = async () => {
              const response = await fetch(query);
              const data = await response.json();
              setDataSlider(data);
              setFetched(true);
          };

          fetchData();
      }, [query]);

      return { fetched, dataslider };
    };











const SliderComp = () => {

    


   const slide = () => async () => {
        
        let data = []
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

           
            let data = anotherarray
            console.log('this is the data', data)
            
          })
          .catch(function (error) {
            console.log(error);
          });
    

    return  data
}

}

export default SliderComp;



export const SliderData = [
    {
      image:
        "https://www.spaziogames.it/wp-content/uploads/2020/06/Crash-4-Pirate_06-29-20.jpg"
    },
    {
      image:
        "https://d2skuhm0vrry40.cloudfront.net/2018/articles/2018-07-18-14-24/news-videogiochi-spyro-reignited-trilogy-video-di-gameplay-livello-colossus-1531920251281.jpg/EG11/thumbnail/750x422/format/jpg/quality/60"
    },
    {
      image: "https://i.ytimg.com/vi/OUh82pOFGDU/maxresdefault.jpg"
    },
    {
      image: "https://www.psu.com/wp/wp-content/uploads/2020/07/MetalGearSolidRemake-1024x576.jpg"
    }
  ];
  
  