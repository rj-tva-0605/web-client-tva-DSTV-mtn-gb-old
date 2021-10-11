
import React from 'react';
import { useRef, useState } from 'react';
import '../style.css';

import { Link } from 'react-router-dom';



const ChannelsTemplate = ({channels}) =>{


    return(
        <div className="scroll-in-centrediv">

                <div className="centered">
                    <div className="cards">
                        {               
                            channels.map(({id, logos, uid, name}) => 
                                    <Link className="card" style ={{ border: "none", width: ""}}
                                            to = {{
                                                pathname: "/channelsplayer",
                                                state: {
                                                    detail: {
                                                        uid: uid,
                                                        name: name
                                                    }
                                                }
                                            }}
                                        > 
                                            {/* <div className=""> */}
                                                <img className="" 
                                                        style={{}}
                                                        src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${logos.NORMAL}?accessKey=WkVjNWNscFhORDBLCg==`} alt={logos.NORMAL} />                                                  
                                                    {console.log(uid)}
                                            {/* </div>     */}


                                    </Link>                                       
                                        )                             
                        
                                }
                                                
                            
                    </div>
                </div>
    </div>

    )
}
export default ChannelsTemplate;