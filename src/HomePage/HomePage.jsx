import React from 'react';
import {connect} from 'react-redux';
import {gameActions} from '../_actions';
import PrimarySearchAppBar from "../_components/layout/PrimarySearchAppBar";
import Album from "../_components/Album";
import RangeSlider from "../_components/RangeSlider";
import {gameFiltersConstants} from "../_constants/gamefilters.constants"
import {Helmet} from 'react-helmet';


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            numberOfPlayers: gameFiltersConstants.numberOfPlayersDefault,
            suggestedAge: gameFiltersConstants.suggestedAgeDefault,
            playingTime: gameFiltersConstants.suggestedAgeDefault,
        }
    }


    componentWillMount() {
        this.props.getGames();
    }

    handleSearchTextChange(searchText) {
        return this.setState({searchText});
    }

    handleNumberOfPlayersChange(numberOfPlayers){
        return this.setState({numberOfPlayers});
    }

    handleSuggestedAgeChange(suggestedAge){
        return this.setState({suggestedAge});
    }

    handlePlayingTimeChange(playingTime){
        return this.setState({playingTime});
    }

    render() {
        const {user, games} = this.props;

        return (
            <div>

                <PrimarySearchAppBar handleSearchTextChange={this.handleSearchTextChange.bind(this)} displaySearchBar={true} />
                <RangeSlider defaultValues={gameFiltersConstants.numberOfPlayersDefault} rangeValues={gameFiltersConstants.numberOfPlayersRange} handleSliderChange={this.handleNumberOfPlayersChange.bind(this)} text={"Number of players"}/>
                <RangeSlider defaultValues={gameFiltersConstants.suggestedAgeDefault} rangeValues={gameFiltersConstants.suggestedAgeRange} handleSliderChange={this.handleSuggestedAgeChange.bind(this)} text={"Suggested age"}/>
                <RangeSlider defaultValues={gameFiltersConstants.playingTimeDefault} rangeValues={gameFiltersConstants.playingTimeRange} handleSliderChange={this.handlePlayingTimeChange.bind(this)} text={"Playing time"}/>

                <div className="col-md-6 col-md-offset-3">
                    {games.items && <Album games={games} searchText={this.state.searchText} numberOfPlayers={this.state.numberOfPlayers} suggestedAge={this.state.suggestedAge} playingTime={this.state.playingTime}/>}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const {games, authentication} = state;
    const {user} = authentication;
    return {user, games};
}

const actionCreators = {
    getGames: gameActions.getAllGames
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
