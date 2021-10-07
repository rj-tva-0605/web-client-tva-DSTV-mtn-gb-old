import React, {useState} from 'react';
import  './style.css';


const NewPackagesDisplay = () =>{

    const [selectedpakagetitle, setSelectedPackageTitle] = useState(false);
    const [finalPackageBtn, setfinalPackageBtn] = useState(false)
    const [dropdownThreeDayPack, setDropdownThreeDayPack] = useState("");
    const [dropdownSevenDayPack, setDropdownSevenDayPack] = useState("");
    const [dropdownThirtyDayPack, setDropdownThirtyDayPack] = useState("");
    const [dropdownBlockbusterPack, setDropdownBlockbusterPack] = useState("");
    const [dropdownGloLitePack, setDropdownGloLitePack] = useState("");
    const [dropdownGloMaxPack, setDropdownGloMaxPack] = useState("");
   

    // const selectTitle = () =>{
    //     if(selectedpakagetitle){
    //         setSelectedPackageTitle("")
    //     }
    // }

    const clearingDropdowns = () =>{
        setDropdownThreeDayPack("")
        setDropdownThirtyDayPack("")
        setDropdownSevenDayPack("")
        setDropdownBlockbusterPack("")
        setDropdownGloLitePack("")
        setDropdownGloMaxPack("")
    }

    const finalPackageSubmitButton = () =>{


    }

    const gloThreeVodPack = () =>{
        clearingDropdowns()
        setSelectedPackageTitle("glo3dayspack")
        setDropdownThreeDayPack('fa-caret-down')
        setfinalPackageBtn(true)
        console.log(selectedpakagetitle)
    }

    const gloSevenVodPack = () =>{
        clearingDropdowns()
        setSelectedPackageTitle("glo7dayspack")
        setDropdownSevenDayPack('fa-caret-down')
        setfinalPackageBtn(true)
        console.log(selectedpakagetitle)
    }

    const gloThirtyVodpack = () => {
        clearingDropdowns()
        setSelectedPackageTitle("glo30dayspack")
        setDropdownThirtyDayPack('fa-caret-down')
        setfinalPackageBtn(true)
        console.log(selectedpakagetitle)
    
    }

    const gloBlockbusterVodpack = () => {
        clearingDropdowns()
        setSelectedPackageTitle("gloBlockBusterpack")
        setDropdownBlockbusterPack('fa-caret-down')
        setfinalPackageBtn(true)
        console.log(selectedpakagetitle)
    
    }

    const gloLitepack = () => {
        clearingDropdowns()
        setSelectedPackageTitle("gloBlockBusterpack")
        setDropdownGloLitePack('fa-caret-down')
        setfinalPackageBtn(true)
        console.log(selectedpakagetitle)
    }

    const gloMaxpack = () => {
        clearingDropdowns()
        setSelectedPackageTitle("gloBlockBusterpack")
        setDropdownGloMaxPack('fa-caret-down')
        setfinalPackageBtn(true)
        console.log(selectedpakagetitle)
    }







    return(
        <>
            <div>
                <h3 className="main-package-title"> Choose a plan that is right for you</h3>
                <div className="row-of-cards">
                    
                    <div className="one-card package-title">
                        <p>Glotv VOD 3 days</p>
                        <h1>₦150</h1>
                        <p>Movies only <br/>3 days</p>
                        </div>
                    <div className="one-card package-title">
                        <p>Glotv VOD 7 days</p>
                        <h1>₦150</h1>
                        <p>Movies only <br/>7 days</p>
                        </div>
                    <div className="one-card package-title">
                        <p>Glotv VOD 30 days</p>
                        <h1>₦150</h1>
                        <p>Movies only <br/> 30 days</p>
                        </div>
                    <div className="one-card package-title">
                        <p>Glotv Lite</p>
                        <h1>₦150</h1>
                        <p>Movies & Live TV <br/> 7 days</p>
                        </div>
                    <div className="one-card package-title">
                        <p>Glotv Max</p>
                        <h1>₦150</h1>
                        <p>Movies & Live TV <br/> 7 days</p>
                        </div>
                </div>
            </div>
        </>
    )
}

export default NewPackagesDisplay;