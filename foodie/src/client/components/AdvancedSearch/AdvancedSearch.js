import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import AppMenuActions from "../AppMenu/actions";
import HomeActions from "../Home/actions";
import Location from "../Location/Location";

class AdvancedSearch extends React.Component {

    onTextChanged = async (event) => {
        await this.props.setInput(event.target.value);
        if (this.props.searchInput.length > 0) {
            this.props.loadSuggestions(this.props.searchInput)
        }
        else this.props.resetSuggestions();
    };

    async suggestionSelected (value) {
        await this.props.setInput(value);
        await this.props.resetSuggestions();
    }

    onAverageSelect = async (selection) => {
        await this.props.setAverageSelect(selection);
    };

    onSearchClick = async () => {
        let query = {};
        if (this.props.location_selected && this.props.radiusValue) {
            query["prox"] = this.props.location_selected.DisplayPosition.Latitude + "," +
                this.props.location_selected.DisplayPosition.Longitude + "," + this.props.radiusValue * 1000;
        }
        if (this.props.location_selected && !this.props.radiusValue) {
            query["locationid"] = this.props.location_selected.LocationId;
        }
        if (this.props.averageInput) {
            query["average_rating"] = this.props.averageInput;
        }
        if (this.props.searchInput) {
            const name = this.props.searchInput.replace('&', '%26');
            query["name"] = name;
        }
        await this.props.loadRestaurantByFilterAction(query);
    };

    render() {
        return (
            <div style={{margin: 'auto', padding: '10px', float: 'left'}}>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.props.suggestions || []}
                    getOptionLabel={option => option}
                    getOptionSelected={(option) => console.log(option)}
                    onInputChange={(event, value) => this.suggestionSelected(value)}
                    style={{size: 'small', width: 250}}
                    renderInput={params => (
                        <TextField size="small" onChange={this.onTextChanged} {...params} label="Search By Name"
                                   variant="outlined" fullWidth/>
                    )}
                />
                <Location radius={true}/>
                <h4>Select Average Rating</h4>
                <DropdownButton id="dropdown-basic-button" variant='secondary' title="Choose Average Rating">
                    <Dropdown.Item onClick={() => this.onAverageSelect(1)}>1</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.onAverageSelect(2)}>2</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.onAverageSelect(3)}>3</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.onAverageSelect(4)}>4</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.onAverageSelect(null)}>Choose Average Rating</Dropdown.Item>
                </DropdownButton>
                <Button onClick={() => this.onSearchClick()} variant="dark">Search</Button>
            </div>)
    }
}




const mapStateToProps = (state) => {
    return {
        searchInput: state['AppMenu']['searchInput'],
        averageInput: state['restaurants']['averageInput'],
        suggestions: state['restaurants']['suggestions'],
        radiusValue: state['location']['radiusValue'],
        location_selected: state['location']['location_selected']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setInput: (searchInput) => {
            dispatch(AppMenuActions.setInput(searchInput))
        },
        setAverageSelect: (selection) => {
            dispatch(HomeActions.setAverageSelect(selection))
        },
        resetSuggestions: () => {
            dispatch(HomeActions.resetSuggestions())
        },
        loadRestaurantByFilterAction: (queryParams) => {
            dispatch(HomeActions.loadRestaurantByFilterAction(queryParams))
        },
        loadSuggestions: async (searchInput) => {
            await dispatch(HomeActions.loadSuggestions(searchInput))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);