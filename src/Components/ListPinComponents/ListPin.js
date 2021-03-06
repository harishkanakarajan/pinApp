import React from "react"
import { connect } from "react-redux"
import classes from '../../Styles/Common.module.css'
import config from '../CommonComponents/config'
import * as ListFun from './ListPinFunctions'

import { saveGeneratedPins } from '../../Redux/Actions/ActionCreators'

class ListPin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            responseType: ""
        }
    }

    deleteCurrentRow(pinData) {
        var savedPins = ListFun.deleteCurrentRow(this.props.savedPins, pinData)

        // Triggering save with the updated rows
        this.props.saveGeneratedPins({ savedPins: savedPins })
    }

    updateName(e, pinData) {
        var data = this.props.savedPins ? this.props.savedPins : []
        // Validate whether Duplicate value exists
        if (data.savedPins.some((row) => row.name.toLowerCase() === e.target.value.toLowerCase()) || e.target.value === "") {
            e.target.value = pinData.name

            this.setState({ responseType: config.errorRes })
        } else {
            var savedPins = ListFun.updateName(this.props.savedPins, pinData, e.target.value)

            // Send request to Save the data
            this.props.saveGeneratedPins({ savedPins: savedPins })

            this.setState({ responseType: "" })
        }
    }

    render() {
        var data = this.props.savedPins ? this.props.savedPins : []

        return (
            <div className={classes.listPinWrapper}>
                {this.state.responseType === config.errorRes && <div className={classes.alertMsg + " " + classes.errorMsg}>
                    {"Empty PIN/PIN name already exists, Try other name"}
                </div>}

                {data.savedPins && data.savedPins.length > 0 ? data.savedPins.map((pinData, index) =>
                    <div key={index}>
                        <input type="text" placeholder="Name" defaultValue={pinData.name} className={classes.pinInputBox} style={{ width: "150px" }} onBlur={(e) => this.updateName(e, pinData)} />
                        <input type="text" placeholder="1111" value={pinData.pin.split('-')[0]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" placeholder="1111" value={pinData.pin.split('-')[1]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" placeholder="1111" value={pinData.pin.split('-')[2]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" placeholder="1111" value={pinData.pin.split('-')[3]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" placeholder="1111" value={pinData.pin.split('-')[4]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <button className={classes.eventDeleteButton} onClick={() => this.deleteCurrentRow(pinData)}>Delete</button>
                    </div>
                ) : <div className={classes.alertMsg + " " + classes.infoMsg}>{config.noPinGenerated}</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPin)