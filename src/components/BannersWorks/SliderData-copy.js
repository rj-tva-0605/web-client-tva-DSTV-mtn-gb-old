
import React, {useEffect,useState} from 'react';

import axios from 'axios';



  export  const useFetch = (query) => {


            const [fetched, setFetched] = useState(false);
            const [dataslider,setDataSlider] = useState([])
            const [data, setData] = useState([]);

            useEffect( () => {
                if (!query) return;

                const fetchData = async () => {
                    const response = await fetch(query);
                    const res = await response.json();

                    let newarray = []
                    let count = 0

                    for (count  in res.data){
        
                        newarray.push(res.data[count])
                        count = count + 1
                    }
        
                    const anotherarray = newarray.map(({banner_image_id, title}) => {
                        return ({banner_image_id, title} )
                        
                      })
        
                    setDataSlider(anotherarray);
                    setFetched(true);
                };

                fetchData();
            }, [query]);

            return { fetched, dataslider };
          };
                      

      






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
  
  