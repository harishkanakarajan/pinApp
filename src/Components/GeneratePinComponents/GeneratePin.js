import React from "react"
import { connect } from "react-redux"
import classes from '../../Styles/Common.module.css'
import config from '../CommonComponents/config'
/* Common functions file to invoke common methods */
import * as Common from '../CommonComponents/Common'
import * as GenPinFunc from './GeneratePinFunctions'

import { saveGeneratedPins } from '../../Redux/Actions/ActionCreators'

class GeneratePin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            validPins: [],
            currentGeneratedPins: [],
            responseMsg: "",
            responseType: ""
        }
    }

    /* Generates the actual pin */
    generatePin() {
        var currentPin = ""
        var currentArr = []
        for (let i = 1; i <= config.inputBoxes.length; i++) {
            // Fetch random pin from Valid keys
            currentPin = GenPinFunc.generateSinglePin(this.state.validPins)

            // Push each of 4 digit pin into array to validate duplicate
            if (!currentArr.includes(currentPin)) {
                currentArr.push(currentPin)

                // Filter Pins based on current selection to avoid duplicates
                var validPins = this.state.validPins
                var currentValIndex = this.state.validPins.indexOf(currentPin);

                if (currentValIndex > -1) {
                    validPins.splice(currentValIndex, 1);
                }

                this.setState({
                    ["box_" + i]: currentPin,
                    //currentGeneratedPins: currentArr,
                    validPins: validPins
                })
            }
        }
    }

    savePin() {
        var savedPins = this.props.savedPins.length === 0 ? this.props.savedPins : []
         if (savedPins.length === 0 && this.props.savedPins) {
            savedPins = this.props.savedPins.savedPins ? this.props.savedPins.savedPins : []
        } 

        var finalKey = []
        // Merging the PINS together
        for (let i = 1; i <= config.inputBoxes.length; i++) {
            // Validating empty pin
            if (!Common.hasValue(this.state['box_' + i])) {
                this.setState({
                    box_1: "", box_2: "", box_3: "", box_4: "", box_5: "",
                    responseType: config.errorRes,
                    responseMsg: config.pinEmptyMsg
                })
                return false
            }

            finalKey.push(this.state['box_' + i])
        }

        // Verifiying whether PIN already exists
        if (!Common.pinAlreadyExists(savedPins, finalKey.join('-'))) {
            // Preparing data
            var saveArr = {
                name: "Pin " + new Date().getTime(), // Preloading Name field to be used for future purpose
                pin: finalKey.join('-')
            }

            // Pushing build object to final data
            savedPins.push(saveArr)

            // Invoking Save of pin
            this.props.saveGeneratedPins({ savedPins });

            // Resetting pin after saving
            this.setState({
                box_1: "", box_2: "", box_3: "", box_4: "", box_5: "",
                responseType: config.successRes,
                responseMsg: config.pinSavedSuccess
            })
        } else {
            this.setState({
                box_1: "", box_2: "", box_3: "", box_4: "", box_5: "",
                responseType: config.errorRes,
                responseMsg: config.pinExistsMsg
            })
        }
    }

    componentDidMount() {
        this.prepareExcludeNumbers()
    }

    /* Preparing validation upfront to get valid numbers alone for pin generation */
    prepareExcludeNumbers() {
        const validPins = Common.prepareExcludeNumbers()
        this.setState({ validPins })
    }

    render() {

        return (
            <div className={classes.generateWrapper}>
                {/* SUCCESS MSG HANDLER */}
                {this.state.responseType === config.successRes && <div className={classes.alertMsg + " " + classes.successMsg}>
                    {this.state.responseMsg}
                </div>}

                {/* ERROR MSG HANDLER */}
                {this.state.responseType === config.errorRes && <div className={classes.alertMsg + " " + classes.errorMsg}>
                    {this.state.responseMsg}
                </div>}

                {/* Rendering Inputboxes based on config */}
                <div>
                    {config.inputBoxes.map(index =>
                        <input key={index} defaultValue={this.state["box_" + index]} type="text" placeholder="1111" maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                    )}
                </div>

                <div className={classes.alignCenter}>
                    <button className={classes.eventGenerateButton} onClick={() => this.generatePin()}>Generate</button>
                    <button className={classes.eventSaveButton} onClick={() => this.savePin()}>Save</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        savedPins: state.savedPins
    }
}

const mapDispatchToProps = dispatch => ({
    saveGeneratedPins: (savedPins) => dispatch(saveGeneratedPins(savedPins))
})

export default connect(mapStateToProps, mapDispatchToProps)(GeneratePin)