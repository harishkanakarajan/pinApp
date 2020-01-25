import React from "react"
import { connect } from "react-redux"
import classes from '../../Styles/Common.module.css'
import config from '../CommonComponents/config'

import { saveGeneratedPins } from '../../Redux/Actions/ActionCreators'

class ListPin extends React.Component {
    constructor(props) {
        super(props)
    }

    deleteCurrentRow(pinData) {
        var data = this.props.savedPins ? this.props.savedPins : []
        const savedPins = data.savedPins.filter((row) => row.pin !== pinData.pin)
        this.props.saveGeneratedPins({savedPins: savedPins})
    }

    render() {
        var data = this.props.savedPins ? this.props.savedPins : []

        return (
            <div className={classes.listPinWrapper}>
                {data.savedPins && data.savedPins.length > 0 ? data.savedPins.map((pinData, index) =>
                    <div key={index}>
                        <input type="text" name="" placeholder="Name" defaultValue={pinData.name} className={classes.pinInputBox} style={{ width: "150px" }} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[0]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[1]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[2]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[3]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[4]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
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