import React from "react";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationActions from "./actions";

class Location extends React.Component {
    render() {
        return (
            <div>
                <Autocomplete
                    id="location"
                    disabled={this.props.disabled || false}
                    autoComplete={true}
                    options={this.props.location_suggestions || []}
                    getOptionLabel={x => x.label}
                    style={{size: 'small', width: 250}}
                    onInputChange={(e, v, r) => {
                        if (r === "clear") this.props.clearLocationSelected();
                        else if (this.props.location_suggestions && this.props.location_suggestions.length > 0) {
                            let filtered = this.props.location_suggestions.filter(x => x.label === v);
                            if (filtered.length > 0) {
                                this.props.setLocationSelected(filtered[0]["locationId"]);
                            }
                        }
                    }}
                    renderInput={params => (
                        <TextField {...params} onChange={(e) => this.props.getLocationSuggestions(e.target.value)}
                                   label="Location" variant="outlined" margin="normal" required fullWidth />
                    )}/>
                { this.props.radius ?
                    <div>
                        <Typography id="radius-slider" gutterBottom>
                            Select Radius
                        </Typography>
                        <Slider
                            defaultValue={1}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            min={1}
                            max={50}
                            marks = {[{value: 0, label: '0km'},
                                {value: 20, label: '20km'},
                                {value: 50, label: '50km'}]}
                            onChange={(e, v) => this.props.setLocationRadiusValue(v)}
                        />
                    </div> : <div/> }
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        location_suggestions: state['location']['location_suggestions'],
        radiusValue: state['location']['radiusValue']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLocationSuggestions: (location) => {
            dispatch(LocationActions.getLocationSuggestions(location))
        },
        setLocationSelected: (location) => {
            dispatch(LocationActions.setLocationSelected(location))
        },
        clearLocationSelected: () => {
            dispatch(LocationActions.clearLocationSelected())
        },
        setLocationRadiusValue: (location) => {
            dispatch(LocationActions.setLocationRadiusValue(location))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);