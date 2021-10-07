
import React from 'react';


import './listitem.scss'



const ListItem = ({moviez}) =>{
    return(
        <>
        {console.log("moviez in list item" , moviez)}
        {moviez.map(({image_id}) =>
        <div className="listItem">
            
            <img className="" 
                src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={image_id} />          
            <div className="listitem-video-onhover"></div>
        </div>)
        }
        </>
    )
}

export default ListItem;