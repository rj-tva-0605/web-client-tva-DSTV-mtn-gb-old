
import React from 'react';
import { useRef, useState, useEffect } from 'react';

import './list.scss'
import ArrowBackIosIcon  from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import  ListItem  from '../ListItem';


const List = ({catgName, movies, purchSeriesDetail, seriesDetailComp}) =>{
    const [slideNumber, setSlideNumber ] = useState(0);
    const [isMoved, setIsMoved] = useState(false);
    const [upMoviegrp, setUpmoviegrp] = useState(false)
    const [addNewArray, setAddNewArray] = useState(false)
    const listRef = useRef("");
    const [countMovie, setCountMovie] = useState(0)

    var lengthMovie = movies.length

    

    

    const handleClick = (direction) =>{  
              
        setIsMoved(true)
        let distance = listRef.current.getBoundingClientRect().x - 50

        if (direction === "left"  && isMoved  ){
            // setSlideNumber(slideNumber - 1)
            // console.log(slideNumber)
            listRef.current.style.transform = `translateX(${50 + distance}px)`
            // setAddNewArray()
            
        }
        // console.log(distance)
        if (direction === "right"   ){
            // setSlideNumber(slideNumber + 0.4)
            // console.log(slideNumber)
            listRef.current.style.transform = `translateX(${-130 + distance}px)`
            setAddNewArray(true)

            
        }
    }



    useEffect(() => {
        const initialmovieSet = () =>{
                console.log("this is up Moviegrp", upMoviegrp)

            return(
                setUpmoviegrp(movies)
            )
        };

        initialmovieSet()

    }, [])

    return(
        <>
        {upMoviegrp <= 0 ?
                    ""
                    :
                    <div className="list">
                    {console.log("purch det in list", purchSeriesDetail)}
                    
                            <span className="listTitle">{catgName} </span>
                            <div className="wrapper">
                                <ArrowBackIosIcon 
                                    className="sliderArrow left" 
                                    onClick={() =>handleClick("left")}
                                    style = {{display: !isMoved && "none" }}
                                />
                                {console.log(movies)}
    
                                <div className="container" ref={listRef} >
                                    {!upMoviegrp ?
                                        <div>Loading</div>
                                        :
                                        <ListItem 
                                                upMoviegrp= {upMoviegrp}
                                                setUpmoviegrp = {setUpmoviegrp}  
                                                addNewArray = {addNewArray} 
                                                setAddNewArray ={setAddNewArray}
                                                countMovie={countMovie}
                                                setCountMovie={setCountMovie}
                                                CategoryName = {catgName}
                                                purchSeriesDetail = {purchSeriesDetail}
                                                seriesDetailComp = {seriesDetailComp}
                                                />
                                    }
                                </div>
                                <ArrowForwardIosIcon className="sliderArrow right" onClick={() =>handleClick("right")} />
                            </div>
                </div>
                }

    </>                        
    )
}
export default List;