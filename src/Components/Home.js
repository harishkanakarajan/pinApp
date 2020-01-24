import React, { useState } from "react";
/* Dependancy CSS */
import classes from '../Styles/Common.module.css'
/* Dependancy Components */
import GeneratePin from "./GeneratePinComponents/GeneratePin";
import ListPin from "./ListPinComponents/ListPin";

/* Simple Implementation of Hooks with state management instead of traditional classes */
function Home() {
    const [menu, setMenu] = useState('generate');

    return (
        <div className={classes.mainWrapper}>
            {/* Link Button to navigate pages */}
            <div className={classes.nanBtnWrapper}>
                <button type="button" value="generate" onClick={() => setMenu("generate")} className={classes.navButton + " " + (menu==="generate" ? classes.navActiveClass : "")}>Generate</button>
                <button type="button" value="saved" onClick={() => setMenu("saved")} className={classes.navButton + " " + (menu==="saved" ? classes.navActiveClass : "")}>Saved</button>
            </div>

            {/* Rendering respective pages */}
            <div className={classes.bgWrapper}>
                {menu==="generate" ? <GeneratePin /> : <ListPin />}
            </div>
        </div>
    )    
}

export default Home