import React from "react"
import { connect } from "react-redux"
import classes from '../../Styles/Common.module.css'
import config from '../CommonComponents/config'

class ListPin extends React.Component {

    render() {
        var data = this.props.savedPins ? this.props.savedPins : []
        return (
            <div className={classes.listPinWrapper}>
                {data.savedPins ? data.savedPins.map((pinData, index) =>
                    <div key={index}>
                        <input type="text" name="" placeholder="Name" className={classes.pinInputBox} style={{ width: "150px" }} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[0]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[1]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[2]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[3]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <input type="text" name="" placeholder="1111" value={pinData.pin.split('-')[4]} maxLength={config.maxLengthPin} readOnly className={classes.pinInputBox} />
                        <button className={classes.eventDeleteButton}>Delete</button>
                    </div>
                ) : "No Pins generated yet"}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        savedPins: state.savedPins
    }
}

export default connect(mapStateToProps)(ListPin)