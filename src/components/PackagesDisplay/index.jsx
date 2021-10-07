
import React, {useState} from 'react';
import './PackagesDisplay.css'

const PackagesDisplay = () =>{

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
                <table  className="tab">
                            <tr  > 
                                <td className="package-title-container">
                                    <a onClick={()=>gloThreeVodPack()} >
                                        <div className={`package-title ${dropdownThreeDayPack ? "package-title-active" : ""}`} >
                                            <p className="pkg-tle-comp">Glotv VOD  <br/> 3 days </p>
                                            
                                        </div>
                                        </a>
                                        <i class={`fa ${dropdownThreeDayPack} dropdown-active`} ></i>
                                </td>
                                <td className="package-title-container">
                                    <a onClick={()=>gloSevenVodPack()}>
                                        <div className={`package-title ${dropdownSevenDayPack ? "package-title-active" : ""}`}>
                                            <p className="pkg-tle-comp">Glotv VOD  <br/> 7 days </p>   
                                        </div>
                                        <i class={`fa ${dropdownSevenDayPack} dropdown-active`} ></i>
                                    </a>
                                </td>
                                <td className="package-title-container">
                                    <a onClick={()=>gloThirtyVodpack()}>
                                        <div className={`package-title ${dropdownThirtyDayPack ? "package-title-active" : ""}`}>
                                            <p className="pkg-tle-comp">Glotv VOD  <br/> 30 days </p>
                                        </div>
                                        <i class={`fa ${dropdownThirtyDayPack} dropdown-active`} ></i>
                                    </a>
                                </td>
                                <td className="package-title-container">
                                    <a onClick={()=>gloLitepack()}>
                                        <div className={`package-title ${dropdownGloLitePack ? "package-title-active" : ""}`}>
                                            <p className="pkg-tle-comp">Glotv Lite   </p>
                                        </div>
                                        <i class={`fa ${dropdownGloLitePack} dropdown-active`} ></i>
                                    </a>
                                </td>
                                <td className="package-title-container">
                                    <a onClick={()=>gloMaxpack()}>
                                        <div className={`package-title ${dropdownGloMaxPack ? "package-title-active" : ""}`}>
                                            <p className="pkg-tle-comp">Glotv Max  </p>
                                        </div>
                                        <i class={`fa ${dropdownGloMaxPack} dropdown-active`} ></i>
                                    </a>
                                </td>
                            </tr>
                            <tr  >
                                
                                <td >3 days</td>
                                <td >7 days</td>
                                <td >30 Days</td>
                                <td >7 days</td>
                                <td >7 days</td>
                            </tr>
                            <tr >
                                <td >All Movies </td>
                                <td >All Movies </td>
                                <td >All Movies </td>
                                <td >All Movies <br /> TV </td>
                                <td >All Movies <br /> TV </td>
                            </tr>
                            <tr >
                                <td >N150</td>
                                <td >N150</td>
                                <td >N150</td>
                                <td >N150</td>
                                <td >N150</td>
                            </tr>
                        </table>

                        { finalPackageBtn ?
                        <div className="final-package-submit-btn">
                            <button type="button" class="btn btn-success  ">Continue</button>
                        </div>
                        :
                        <div></div>}
                        
                        
        </>
    )
}

export default PackagesDisplay;