
import React, {useState, useRef} from 'react';


import './listitem.scss'
import './style.css'

import MovieDetailModal from '../modals/MovieDetailModal';
import { Link } from 'react-router-dom';



const ListItem = ({upMoviegrp, CategoryName, setUpmoviegrp, addNewArray, setAddNewArray, countMovie, setCountMovie, purchSeriesDetail, seriesDetailComp}) =>{


    
    const [regLengthMovie, setRegLengthMovie] = useState(0)
    const [ hideImage, setHideImage] = useState(0)
    const [showtrailerdiv, setShowTrailerdiv] = useState(0)
    const [isHovered, setIsHovered] = useState(false);
    const [showMovieDetail, setShowMovieDetail] = useState(false)


    const hoveRef = useRef("");

    const handleMovieDetailShow = () => setShowMovieDetail(true);

    const MouseEnterFunc = (e) =>{

        e.preventDefault();
        
        hoveRef.current.style.visbility = "hidden";
        hoveRef.current.style.display = "none";
        hoveRef.current.style.border = `${2}px red solid`;      

    }


    const newclick = () => {

             var newmvs = upMoviegrp
             
            
            //  remove the first part of array in loop so the list of stuff donget over abundant
            if(addNewArray && regLengthMovie < 4 ) {

                Array.prototype.push.apply(newmvs , upMoviegrp)
                
                setRegLengthMovie(regLengthMovie + 1)
                setAddNewArray(false);
                setUpmoviegrp(newmvs)
             } else if (addNewArray && regLengthMovie > 4){

                Array.prototype.push.apply(newmvs , upMoviegrp)
                setRegLengthMovie(0)
                newmvs.shift()
                setUpmoviegrp(newmvs)
            }
            


        return ( newmvs ,  console.log("new grp movie", newmvs) )
    }


    let count = 0


    return(
        <>
        {console.log("moviez in list item" , upMoviegrp)}
       
        {console.log("category names on list item ", CategoryName)}
        {console.log("listitem seriesDetailComp", seriesDetailComp)}
        
            
              {  
                upMoviegrp.map(({id, image_id, uid, title }, idx = countMovie +1 ) =>
                
                    <div   className="listItem" ref ={hoveRef}  >
                            {console.log("series id in list" ,id)}
                            
                            <Link  style={{textDecoration: "none", padding: "0"}}
                                    to={{pathname: "/series", 
                                      state: { 
                                          detail: {
                                              movieID: `${id}`, 
                                              imageID: `${image_id}`,
                                              title: `${title}`,
                                              uiD: `${uid}`,
                                              categoryName: `${CategoryName}`,
                                              purchSeriesDetail: purchSeriesDetail[id],
                                              seriesDetail: seriesDetailComp[id]
                                            }
                                        }  
                                      
                                      }}>       
                                    <img   style={{backgroundColor: "red"}}  
                                        className= ""  
                                        
                                        src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={image_id} /> 
                            
                            </Link>
                            {setCountMovie(idx)}
                            
                    </div>)
                }

                {/* {console.log("this is count ", idx)} */}

                { 
                    addNewArray ?
                        newclick()
                    : ""  
                }

        
        
        </>
    )
}

export default ListItem;