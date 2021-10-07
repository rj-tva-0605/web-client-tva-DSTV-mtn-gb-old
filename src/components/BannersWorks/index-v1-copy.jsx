
import React, {useState, useEffect} from 'react';
import Slider from "react-slick";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import './BannersWorks.css'
import  {SliderData, useFetch}  from "./SliderData-copy";

import Carousel from 'react-elastic-carousel'




import axios from 'axios';


const data_srv = [
    {title: "Bedazzled",duration: "2:46AM", img:321130},
    {title: "Calabar Carnival", duration: "12:46PM", img: 321132},
    {title: "Burial Boys", duration: "3:46PM", img: 321126}
]


// get banners with id and info from the get all banners 
//and also their title and append 
// first get it using usestate here and then use reducers to get using usestate 


function useWindowSize() {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() => {
      const handleResize = () => setSize([window.innerHeight, window.innerWidth]);
      window.addEventListener("resize", handleResize);
    }, [])
    return size;
  }


  const array = SliderData.map((x) => {
    return x.image;
  })


//   const datanew = SliderComp()
//   console.log("this is new datanew", datanew)






const Banners = () => {

    const [data, setData]=useState([])
    const [imageIndex, setImageIndex] = useState(0);
    const [height, width] = useWindowSize();
    
    const { fetched, dataslider} = useFetch('https://ott.tvanywhereafrica.com:28182/api/client/v1/testglotv/banners?translation=en&accessKey=WkVjNWNscFhORDBLCg==');
 
    const fetchingData = (dataslider) => {
        
      
      var config = {
          method: 'get',
          url: 'https://ott.tvanywhereafrica.com:28182/api/client/v1/testglotv/banners?translation=en&accessKey=WkVjNWNscFhORDBLCg==',
          headers: { }
        };
        
        axios(config)
        
        .then(function (response) {

          
          setData(dataslider)
          console.log('this is the data', dataslider ,fetched)
          

         
          
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }



  
    useEffect( () =>{
      
        fetchingData(dataslider)
      }, [] )


    const NextArrow = ({ onClick }) => {
        return (
          <div className="arrow next" onClick={onClick}>
            <AiOutlineArrowRight />
          </div>
        );
      };
    
      const PrevArrow = ({ onClick }) => {
        return (
          <div className="arrow prev" onClick={onClick}>
            <AiOutlineArrowLeft />
          </div>
        );
      };
    
      
    
      const settings = {
        className: "center",
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: width > 1000 ? 3: 1,
        centerMode: true,
        centerPadding: "60px",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => {
          setImageIndex(next);
        }
      };

      
    



    return(
        <>
            <div className="dashboard-banners dashboard-banners">

                <div className="dashboard-banners-main-title">                            
                    <a className="dsh-bn-mn-title-text" >What's On How</a>
                    <span style={{"color":"grey"}}> --Live TV</span>
                </div>

                <div className="dashboard-banners-main-content  ">
                    {/* cards div for banners and content comes here */}


                        <div className="BannerApp">
                            <Slider {...settings}>
                                {console.log(data)}
                                {data.map(({banner_image_id, title}, idx) => (
                                    <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                                        <img 
                                          src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${banner_image_id}?accessKey=WkVjNWNscFhORDBLCg==`} 
                                          alt={banner_image_id}
                                           />
                                        <p>{title}</p>
                                      
                                    </div>
                                    
                                ))}
                            </Slider>
                        </div>

                </div>

              

            </div>  
        </>
    )
}

export default Banners;