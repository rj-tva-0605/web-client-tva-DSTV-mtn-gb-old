
import React, {useState} from 'react';

import './PackagesPage.css'
import NewPackagesDisplay from 'components/NewPackagesDisplay';
import Purchasemodal from './modals/Purchasemodal';
// import TriggerPurchasemodal from './modalsFirstConfirmation/TriggerPurchasemodal'




const PackagesPage = () =>{
    const [packageContent, setPackageContent] = useState("");
    const [showPayAlert, setShowPayAlert] = useState(false)


    

    return (
        <>          
            <div className="package-nav" style={{width: "70%", margin: "0 auto", border: "2px red solid"}}>
                <br />                        
                <h1 >Choose a Package</h1>
                {/* <div>Home</div>
                <div></div>
                <div></div> */}
            </div>

             <br />
             <br />
             <br />
             <br />
             <br />  
            <NewPackagesDisplay showTitle={true} packageContent={packageContent}  setPackageContent={setPackageContent} />
        
        </>
    )
}

export default PackagesPage;