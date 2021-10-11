

import React from 'react';
import './style.css';
import logo from '../../assets/images/mtn-logo.png';



 const DstvDashboard = () =>{

    return(

            <div className="main-dashboard">

                <div className="navbars-ctrl">
                    <div className="main-Navbar"> 
                        {/* <p className="main-nav logo "> */}
                            <img src={logo} className="main-nav logo "/>
                        {/* </p> */}
                        <div className="main-nav">Live Tv</div>
                        <div className="main-nav highlit-div">TV Shows</div>
                        <div className="main-nav">Movies</div>
                        <div className="main-nav">Sport</div>
                        <div className="main-nav">TV Guide</div>
                    </div>

                    <div className="sec-Navbar"> 
                        <p className="sec-nav sec-highlit-div ">All</p>
                        <div className="sec-nav">Action</div>
                        <div className="sec-nav ">Adventure</div>
                        <div className="sec-nav">Animation</div>
                        <div className="sec-nav">Sport</div>
                        <div className="sec-nav">Mystery</div>
                        <div className="sec-nav">Adventure</div>
                        <div className="sec-nav">Family</div>
                        <div className="sec-nav">Dance</div>
                        <div className="sec-nav">Crime</div>
                        <div className="sec-nav">Comedy</div>
                        <div className="sec-nav">Documentary</div>
                        <div className="sec-nav">Drama</div>
                        <div className="sec-nav">Sport</div>
                        <div className="sec-nav">Romance</div>
                    </div>
                </div>
                <div className="scroll-in-centrediv">
                    <div className="centered">
                        <div className="cards">
                            
                            <div className="card">
                            <p>content for card one</p>
                            </div>
            
                            <div className="card">
                            <p>content for card two</p>
                            </div>
            
                            <div className="card">
                            <p>content for card three</p>
                            </div>
            
                            <div className="card">
                            <p>content for card four</p>
                            </div>

                            <div className="card">
                                <p>content for card four</p>
                            </div>
                            <div className="card">
                            <p>content for card four</p>
                            </div>
                            <div className="card">
                            <p>content for card three</p>
                            </div>
            
                            <div className="card">
                            <p>content for card four</p>
                            </div>

                            <div className="card">
                                <p>content for card four</p>
                            </div>
                            <div className="card">
                            <p>content for card four</p>
                            </div>
                            <div className="card">
                            <p>content for card three</p>
                            </div>
            
                            <div className="card">
                            <p>content for card four</p>
                            </div>

                            <div className="card">
                                <p>content for card four</p>
                            </div>
                            <div className="card">
                            <p>content for card four</p>
                            </div>
                            <div className="card">
                            <p>content for card three</p>
                            </div>
            
                            <div className="card">
                            <p>content for card four</p>
                            </div>

                            <div className="card">
                                <p>content for card four</p>
                            </div>
                            <div className="card">
                            <p>content for card four</p>
                            </div>
            
                        </div>
                    </div>
                </div>
                    <div className="footer-box"></div>

                    <div className= "footer">
                        <div className="footer-initial">
                            <div className="footer-fst footer-cards ">Globacom</div>
                            <div className="footer-sec footer-cards">FAQs</div>
                            <div className="footer-thr footer-cards">Live chat</div>
                        </div>
                    </div>
                
            </div>
    )


}

export default DstvDashboard;