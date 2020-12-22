import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import ReviewsActions from "./actions";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";


class Sorting extends React.Component {

    render() {
        const oldest = 0;
        const sinceLastWeek = 7;
        const sinceLastMonth = 31;
        const sinceLastYear = 365;
        const options = [1, 2, 3, 4, 5];
        // const buttonNames = `At least ${index} stars`;
        return (
            <TreeView
                className={makeStyles({
                    root: {
                        height: 216,
                        flexGrow: 1,
                        maxWidth: 400,
                    },
                }).root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                <TreeItem nodeId="1" label="Sort By Creation Date">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={ () => this.props.loadReviewsAction({restaurant_id: this.props.restId})}>Newest</Button> /* this is default */
                        <Button onClick={ () => this.props.loadReviewsAction({restaurant_id: this.props.restId, creation_date: oldest})}>Oldest</Button>
                        <Button onClick={ () => this.props.loadReviewsAction({restaurant_id: this.props.restId, creation_date: sinceLastWeek})}>Since last week</Button>
                        <Button onClick={ () => this.props.loadReviewsAction({restaurant_id: this.props.restId, creation_date: sinceLastMonth})}>Since last month</Button>
                        <Button onClick={ () => this.props.loadReviewsAction({restaurant_id: this.props.restId, creation_date: sinceLastYear})}>Since last year</Button>
                    </ButtonGroup>
                </TreeItem>
                <TreeItem nodeId="7" label="Sort By Topics">
                    <TreeItem nodeId="8" label="Bathroom Quality">
                        <ButtonGroup color="primary" aria-label="outlined dark button group">
                            {options.map( (option , index) =>
                                <Button key={index} onClick={ () => this.props.loadReviewsAction(
                                    {restaurant_id: this.props.restId, bathroom_quality: index + 1})}>
                                    At Least {index + 1} stars</Button>)}
                        </ButtonGroup>
                    </TreeItem>
                    <TreeItem nodeId="9" label="Staff Kindness">
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            {options.map( (option , index) =>
                                <Button key={index} onClick={ () => this.props.loadReviewsAction(
                                    {restaurant_id: this.props.restId, staff_kindness: index + 1})}>
                                    At Least {index + 1} stars</Button>)}
                        </ButtonGroup>
                    </TreeItem>
                    <TreeItem nodeId="10" label="Cleanliness">
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            {options.map( (option , index) =>
                                <Button key={index} onClick={ () => this.props.loadReviewsAction(
                                    {restaurant_id: this.props.restId, cleanliness: index + 1})}>
                                    At Least {index + 1} stars</Button>)}
                        </ButtonGroup>
                    </TreeItem>
                    <TreeItem nodeId="11" label="Drive-thru quality">
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            {options.map( (option , index) =>
                                <Button key={index} onClick={ () => this.props.loadReviewsAction(
                                    {restaurant_id: this.props.restId, drive_thru_quality: index + 1})}>
                                    At Least {index + 1} stars</Button>)}
                        </ButtonGroup>
                    </TreeItem>
                    <TreeItem nodeId="12" label="Delivery Speed">
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            {options.map( (option , index) =>
                                <Button key={index} onClick={ () => this.props.loadReviewsAction(
                                    {restaurant_id: this.props.restId, delivery_speed: index + 1})}>
                                    At Least {index + 1} stars</Button>)}
                        </ButtonGroup>
                    </TreeItem>
                    <TreeItem nodeId="13" label="Food Quality">
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            {options.map( (option , index) =>
                                <Button key={index} onClick={ () => this.props.loadReviewsAction(
                                    {restaurant_id: this.props.restId, food_quality: index + 1})}>
                                    At Least {index + 1} stars</Button>)}
                        </ButtonGroup>
                    </TreeItem>
                </TreeItem>
            </TreeView>
        );
    }
}


const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadReviewsAction: (restId, userId, creationDate, bathroom_quality,
                            staff_kindness, cleanliness, drive_thru_quality,
                            delivery_speed, food_quality) => {
            console.log("hh");
            dispatch(ReviewsActions.loadReviewsAction(
                restId, userId, creationDate,
                bathroom_quality, staff_kindness, cleanliness, drive_thru_quality,
                delivery_speed, food_quality))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);