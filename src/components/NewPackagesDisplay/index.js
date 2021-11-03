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
                       
                    



                    <button className="one-card package-title" value="1st test value " onClick={(e) => {showModalfunc(e ,"VOD 3days", "4356", "400 CFA" ); }} >
                        <p>Glotv VOD 3 days</p>
                        <h1>₦150</h1>
                        <p>Movies only <br/>3 days</p>
                        </button>
                    <button className="one-card package-title" onClick={(e) => {showModalfunc(e ," Glotv VOD 7days", "5876", "500 CFA"); }}>
                        <p>Glotv VOD 7 days</p>
                        <h1>₦150</h1>
                        <p>Movies only <br/>7 days</p>
                        </button>
                    <button className="one-card package-title" onClick={(e) => {showModalfunc(e ,"Glotv VOD 30days", "9647", "700 CFA"); }}>
                        <p>Glotv VOD 30 days</p>
                        <h1>₦150</h1>
                        <p>Movies only <br/> 30 days</p>
                        </button>
                    <button className="one-card package-title" onClick={(e) => {showModalfunc(e ,"Glotv Lite", "10047", "800 CFA"); }}>
                        <p>Glotv Lite</p>
                        <h1>₦150</h1>
                        <p>Movies & Live TV <br/> 7 days</p>
                        </button>
                    <button className="one-card package-title" onClick={(e) => {showModalfunc(e ,"Glotv Max", "80047", "1000 CFA"); }}>
                        <p>Glotv Max</p>
                        <h1>₦150</h1>
                        <p>Movies & Live TV <br/> 7 days</p>
                        </button>
                </div>
            </div>
        </>
    )
}

export default NewPackagesDisplay;