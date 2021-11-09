import React, {useState} from 'react';
import  './style.css';

import Purchasemodal from '../../pages/PackagesPage/modals/Purchasemodal';
import Triggermodal from '../../pages/PackagesPage/modals/TriggerModal';
import ResponsePurchaseModal from 'pages/PackagesPage/modals/ResponsePurchaseModal';
import LoadingModal from 'pages/PackagesPage/modals/LoadingModal';




const NewPackagesDisplay = ({showTitle, packageContent, setPackageContent }) =>{

   



    const [showPayAlert, setShowPayAlert] = useState(false);
    const [triggerControl, setTriggerControl] = useState(false);
    const [showtrigPurchase, setShowTrigPurchase] = useState(false)
    const [showResponsePurchModal, setShowResponsePurchModal] = useState(false)

    const [packageRateDetails, setPackageRateDetails] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false)

    // const [triggerpay, setTriggerPay] = useState(false);


   



    const showModalfunc = (e , packttle, ratecode, price ) =>{
        e.preventDefault();
        if(!triggerControl){
            setTriggerControl(true)
            setShowPayAlert(true);
            console.log("value here" )
            setPackageRateDetails(
                {
                    packageName: packttle,
                    phoneNumber: "+234647477474",
                    price: price,
                    rateCode: ratecode
                }
            )

            console.log("showPayAlert", showPayAlert)
          }
        
    }

    const testButtonsFunc = (e) =>{
        console.log("Button pressed")
    }

    




    return(
        <>
            <div>
                {/* <div> {process.env.REACT_APP_NOT_SECRET_CODE}</div> */}
                {!showTitle? 
                    <h3 className="main-package-title"> Choose a plan that is right for you</h3>
                    :
                    ""
                }
                <div className="row-of-cards">

                    <Purchasemodal 
                        showPayAlert={showPayAlert} 
                        setShowPayAlert={setShowPayAlert} 
                        setTriggerControl={setTriggerControl}                         
                        showtrigPurchase = {showtrigPurchase}
                        setShowTrigPurchase ={setShowTrigPurchase}
                        setPackageRateDetails={setPackageRateDetails}
                        packageRateDetails ={packageRateDetails}
                        setLoadingModal= {setLoadingModal}


                        />

                    <Triggermodal
                        showtrigPurchase = {showtrigPurchase}
                        setShowTrigPurchase ={setShowTrigPurchase}
                        setShowResponsePurchModal={setShowResponsePurchModal}
                        packageRateDetails ={packageRateDetails}
                        setPackageRateDetails={setPackageRateDetails}
                        setLoadingModal= {setLoadingModal}

                        />

                    <ResponsePurchaseModal
                        showResponsePurchModal={showResponsePurchModal}
                        setShowResponsePurchModal={setShowResponsePurchModal}
                        packageRateDetails ={packageRateDetails}
                        setLoadingModal= {setLoadingModal}


                    />

                    <LoadingModal
                        loadingModal= {loadingModal}
                        setLoadingModal= {setLoadingModal}
                        />
                       
                    



                    <button className="one-card package-title" value="1st test value " onClick={(e) => {showModalfunc(e ,"MTN TV One Day 1", "24501220000005301", "400 CFA" ); }} >
                        <p style={{fontSize: "98%"}}>MTN TV One Day 1</p>
                        <h1 style={{fontSize: "220%"}}>CFA 200</h1>
                        <p>Movies & Live TV<br/>3 days</p>
                        </button>
                    <button className="one-card package-title" onClick={(e) => {showModalfunc(e ,"MTN TV One Day 2", "24501220000005303", "450 CFA"); }}>
                        <p style={{fontSize: "98%"}}>MTN TV One Day 2</p>
                        <h1 style={{fontSize: "220%"}}>CFA 450</h1>
                        <p>Movies only<br/>7 days</p>
                        </button>
                    <button className="one-card package-title" onClick={(e) => {showModalfunc(e ,"MTN TV 3 Days", "24501220000005304", "1200 CFA"); }}>
                        <p style={{fontSize: "98%"}}>MTN TV 3 Days</p>
                        <h1 style={{fontSize: "190%"}}>CFA 1200</h1>
                        <p>Movies only<br/> 3 days</p>
                        </button>
                    <button className="one-card package-title" onClick={(e) => {showModalfunc(e ,"MTN TV 7 Days", "24501220000005306", "3350 CFA"); }}>
                        <p style={{fontSize: "98%"}}>MTN TV 7 Days</p>
                        <h1 style={{fontSize: "190%"}}>CFA 3350</h1>
                        <p>Movies & Live TV <br/> 7 days</p>
                        </button>
                    <button className="one-card package-title" onClick={(e) => {showModalfunc(e ,"Glotv Max", "24501220000005307", "1000 CFA"); }}>
                        <p style={{fontSize: "98%"}}>MTN TV 14 Days</p>
                        <h1 style={{fontSize: "190%"}}>CFA 7000</h1>
                        <p>Movies & Live TV <br/> 14 days</p>
                        </button>
                </div>
            </div>
        </>
    )
}

export default NewPackagesDisplay;