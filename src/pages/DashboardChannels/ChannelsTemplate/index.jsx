
import React from 'react';
import { useRef, useState } from 'react';
import '../style.css';

import { Link } from 'react-router-dom';
import { red } from '@material-ui/core/colors';



const ChannelsTemplate = ({channels}) =>{
    const [ hovrbutton, setHvrbutton ] = useState("")

    const hoverbutton = () => {
        setHvrbutton("play-hvr")
    }
    


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
                                                        style={{objectFit: 'cover !important', width: "100%", height: "100%"}}
                                                        src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${logos.NORMAL}?accessKey=WkVjNWNscFhORDBLCg==`} alt={logos.NORMAL} />                                                  
                                                    {console.log(uid)}
                                            {/* </div>     */}
                                            <div onMouseEnter={() =>hoverbutton()} onMouseLeave={() => setHvrbutton("play-button")} className={`play-button ${hovrbutton}`} style={{position : "absolute", color: "red"}}>hi <i class="fa fa-play " style ={{ width: "100%" ,color: "gold"}} /></div>


                                    </Link>                                       
                                        )                             
                        
                                }
                                                
                            
                    </div>
                </div>
    </div>

    )
}
export default ChannelsTemplate;