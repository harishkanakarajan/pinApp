import React, { useState } from "react";
/* Dependancy CSS */
import classes from '../Styles/Common.module.css'
/* Dependancy Components */
import GeneratePin from "./GeneratePinComponents/GeneratePin";
import ListPin from "./ListPinComponents/ListPin";

function Home() {
    const [menu, setMenu] = useState('generate');

    return (
        <div className={classes.mainWrapper}>
            {/* Link Button to navigate pages */}
            <div className={classes.nanBtnWrapper}>
                <button type="button" value="generate" onClick={() => setMenu("generate")} className={classes.navButton + " " + (this.state.activeMenu==="generate" ? classes.navActiveClass : "")}>Generate</button>
                <button type="button" value="saved" onClick={() => setMenu("saved")} className={classes.navButton + " " + (this.state.activeMenu==="saved" ? classes.navActiveClass : "")}>Saved</button>
            </div>

            {/* Rendering respective pages */}
            <div className={classes.bgWrapper}>
                {this.state.activeMenu==="generate" ? <GeneratePin /> : <ListPin />}
            </div>
        </div>
    )    
}

export default class Home extends React.Component {
    constructor(props) {
        super(props)

        /* Setting Initial State */
        this.state = {
            activeMenu: "generate"
        }
    }

    handleBtnClick(e) {
        /* State flag to identify active menu */
        console.log(e.target.value )
        this.setState({
            activeMenu: e.target.value 
        })
    }

    render() {
        return (
            <div className={classes.mainWrapper}>
                {/* Link Button to navigate pages */}
                <div className={classes.nanBtnWrapper}>
                    <button type="button" value="generate" onClick={(e) => this.handleBtnClick(e)} className={classes.navButton + " " + (this.state.activeMenu==="generate" ? classes.navActiveClass : "")}>Generate</button>
                    <button type="button" value="saved" onClick={(e) => this.handleBtnClick(e)} className={classes.navButton + " " + (this.state.activeMenu==="saved" ? classes.navActiveClass : "")}>Saved</button>
                </div>

                {/* Rendering respective pages */}
                <div className={classes.bgWrapper}>
                    {this.state.activeMenu==="generate" ? <GeneratePin /> : <ListPin />}
                </div>
            </div>
        )
    }
}