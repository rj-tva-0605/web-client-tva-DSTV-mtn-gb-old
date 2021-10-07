
import React, {useState} from 'react';


import './listitem.scss'



const ListItem = ({upMoviegrp, setUpmoviegrp, addNewArray, setAddNewArray}) =>{

    const [regLengthMovie, setRegLengthMovie] = useState(0)

    const newclick = () => {
        //  var newmvs = false

        
            
            

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


    return(
        <>
        {console.log("moviez in list item" , upMoviegrp)}
        
        
            
              {  
                upMoviegrp.map(({image_id}) =>
                    <div className="listItem">
                        
                        <img className="" 
                            src={`https://glonigeria.tvanywhereafrica.com:28182/api/client/v1/global/images/${image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={image_id} />          
                        <div className="listitem-video-onhover"></div>
                    </div>)
                }

                { 
                    addNewArray ?
                        newclick()
                    : ""  
                }

        
        
        </>
    )
}

export default ListItem;