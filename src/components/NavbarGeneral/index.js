import React,{useEffect, useState}  from 'react';
import './style.css'
import logo from '../../assets/images/mtn-logo.png';
import { logoutReducer } from "store/reducers/authReducer";

import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';



const NavbarGeneral = () =>{

    const [showlogin, setShowLogin] = useState(false);
    const history = useHistory()

    const handleLoginShow  = () => setShowLogin(true);


    const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn)

    const dispatch = useDispatch();
    const handleLogout = () => dispatch(logoutReducer())

    useEffect(() => {
        if(isUserLoggedIn){
            history.push({
                pathname:'/newdashboard'
            })}else{history.push({
                pathname:'/'
            })}
        
        
    }, [])

    return(
        <div className="main-Navbar"> 
                        {/* <p className="main-nav logo "> */}
                        
                            <img src={logo} className="main-nav logo "/>
                        {/* </p> */}               
                        <Link className="main-nav highlit-div" 
                                        style ={{ }}
                                     to = {{
                                      pathname: "/newdashboard",
                                      state: {
                                           detail: {
                                               id: ""
                                           }
                                       }
                                   }}
                                    >
                            <div className="mnvs">Featured</div>
                        </Link>
                        <Link className="main-nav " 
                                        style ={{ }}
                                     to = {{
                                      pathname: "/moviespage",
                                      state: {
                                           detail: {
                                               id: ""
                                           }
                                       }
                                   }}
                                    >
                            <div className=" mnvs">Movies</div>
                        </Link>

                        <Link className="main-nav" 
                                        style ={{ }}
                                     to = {{
                                      pathname: "/tvshowspage",
                                      state: {
                                           detail: {
                                               id: ""
                                           }
                                       }
                                   }}
                                    >
                            <div className=" mnvs">TV Shows</div>
                        </Link>
                        
                        <Link className="main-nav " 
                                        style ={{ }}
                                     to = {{
                                      pathname: "/channelspage",
                                      state: {
                                           detail: {
                                               id: ""
                                           }
                                       }
                                   }}
                                    >
                            <div className="">Live TV</div>
                        </Link>

                        <div className="main-nav">TV Guide</div>

                        <div className="main-nav">My List</div>

                        <button type="button" class="btn btn-danger logout-button-navbar " onClick={handleLogout}>Logout</button>
                    </div>
    )
}

export default NavbarGeneral;