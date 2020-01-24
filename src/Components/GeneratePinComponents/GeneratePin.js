import React from "react"
import { connect } from "react-redux"
import classes from '../../Styles/Common.module.css'
import config from '../CommonComponents/config'

import {saveGeneratedPins} from '../../Redux/Actions/ActionCreators'

class GeneratePin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            validPins: [],
            currentGeneratedPins: []
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
        var savedPins = this.props.savedPins.length===0 ? this.props.savedPins : this.props.savedPins.savedPins
        var finalKey = []

        // Merging the PINS together
        for(let i = 1; i <= config.inputBoxes.length; i++) {
            finalKey.push(this.state['box_'+i])
        }

        // Preparing data
        var saveArr = {
            name: "", // Preloading Name field to be used for future purpose
            pin: finalKey.join('-')
        }
        
        // Pushing build object to final data
        savedPins.push(saveArr)

        // Invoking Save of pin
        this.props.saveGeneratedPins({ savedPins });
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
            if (this.validateConsecutiveDigits(numArray)) {
                continue
            } else if (this.validateConsecutiveSequence(numArray)) {
                // Checking consective 3 or more ascending or descending digits in both ASC & DESC order
                continue
            } else {
                validPins.push(i)
            }
        }
        //console.log(validPins) - 6310
        this.setState({ validPins })
    }

    // Validate whether 2 digits are been repeated
    validateConsecutiveDigits(numArray) {
        for (let i = 0; i < numArray.length - 1; i++) {
            if (numArray[i] === numArray[i + 1]) {
                return true
            } else {
                continue
            }
        }
        return false
    }

    // Validate value in ASC & DESC order
    validateConsecutiveSequence(numArray) {
        var loopIndex = numArray.length % config.consecutiveSequence

        for (let i = 0; i <= loopIndex; i++) {
            if (parseInt(numArray[i]) + 1 === parseInt(numArray[i + 1]) && parseInt(numArray[i + 1]) + 1 === parseInt(numArray[i + 2])) {
                return true
            } else if (parseInt(numArray[i]) - 1 === parseInt(numArray[i + 1]) && parseInt(numArray[i + 1]) - 1 === parseInt(numArray[i + 2])) {
                return true
            } else {
                continue
            }
        }
        return false
    }

    /* Generates a 4 digit pin for each input box */
    generateSinglePin() {
        var validPins = this.state.validPins
        return validPins[Math.floor(Math.random() * validPins.length)]
    }

    render() {
        console.log("State :  ")
        console.log(this.props)
        return (
            <div className={classes.generateWrapper}>
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