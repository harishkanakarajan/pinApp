import React from "react"
import { connect } from "react-redux"
import classes from '../../Styles/Common.module.css'
import config from '../CommonComponents/config'
/* Common functions file to invoke common methods */
import * as Common from '../CommonComponents/Common'

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
            currentPin = this.generateSinglePin()

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
        //debugger;
        var savedPins = this.props.savedPins.length === 0 ? this.props.savedPins : this.props.savedPins.savedPins
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

    prepareExcludeNumbers() {
        var validPins = []

        //Total exclusion between 1010 - 9899 is 2579
        for (let i = config.minPinValue; i <= config.maxPinValue; i++) {
            // Breaking the 4 digit pin into array
            var numArray = i.toString().split('')

            // Validate whether 2 digits are been repeated
            if (Common.validateConsecutiveDigits(numArray)) {
                continue
            } else if (Common.validateConsecutiveSequence(numArray)) {
                // Checking consective 3 or more ascending or descending digits in both ASC & DESC order
                continue
            } else {
                validPins.push(i)
            }
        }
        //console.log(validPins) - 6310
        this.setState({ validPins })
    }

    /* Generates a 4 digit pin for each input box */
    generateSinglePin() {
        var validPins = this.state.validPins
        return validPins[Math.floor(Math.random() * validPins.length)]
    }

    render() {

        return (
            <div className={classes.generateWrapper}>
                {this.state.responseType === config.successRes && <div className={classes.alertMsg + " " + classes.successMsg}>
                    {this.state.responseMsg}
                </div>}

                {this.state.responseType === config.errorRes && <div className={classes.alertMsg + " " + classes.errorMsg}>
                    {this.state.responseMsg}
                </div>}

                <div>
                    {config.inputBoxes.map(index =>
                        <input key={index} defaultValue={this.state["box_" + index]} type="text" name="" placeholder="1111" maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
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