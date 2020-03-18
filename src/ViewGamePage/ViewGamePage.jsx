import React from 'react';
import {userActions} from "../_actions";
import {connect} from "react-redux";
import PrimarySearchAppBar from "../_components/layout/PrimarySearchAppBar";
import PeopleIcon from '@material-ui/icons/People';
import CakeIcon from '@material-ui/icons/Cake';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/styles';

const imgStyle = {
    maxWidth: "40%",
    marginleft: "auto",
};

const contentPanelStyle = {
    marginLeft: "5%",
    marginTop: "2%",
};

const gameNameTitleStyle = {
    textAlign: "center"
};

class ViewGamePage extends React.Component {
    constructor(props) {
        super(props);

        super(props);

        this.state = {
            game: props.location.viewProps.game.game,
        };
    };

    render() {
        return <div>
            <PrimarySearchAppBar displaySearchBar={false}/>

            <div style={contentPanelStyle}>
                <h1 style={gameNameTitleStyle}> {this.state.game.name}</h1>
                <img style={imgStyle} src={this.state.game.imageLink}/>

                <p><PeopleIcon/> Number of
                    players: {this.state.game.minimumNumberOfPlayers} - {this.state.game.maximumNumberOfPlayers}</p>
                <p><CakeIcon/> Suggested age: {this.state.game.suggestedAge}</p>
                <p><AccessAlarmIcon/> Average playing time: {this.state.game.averagePlayingTime}</p>

                <p>{this.state.game.description}</p>

                <Button variant="contained" color="secondary">
                    Play now
                </Button>
                <Button variant="contained" color="primary">
                    Back
                </Button>

            </div>

        </div>
    }
}

function mapState(state) {
    const {registering} = state.registration;
    return {registering};
}

const actionCreators = {
    register: userActions.register
}

const connectedViewGamePage = connect(mapState, actionCreators)(ViewGamePage);
export {connectedViewGamePage as ViewGamePage};
