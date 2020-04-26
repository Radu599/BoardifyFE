import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import PrimarySearchAppBar from "../_components/layout/PrimarySearchAppBar";
import PeopleIcon from '@material-ui/icons/People';
import CakeIcon from '@material-ui/icons/Cake';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Button from '@material-ui/core/Button';
import {openWebSocket} from '../core/api';
import Singleton from "../_helpers/socket";
import {gameGroupConstants} from "../_constants/gameGroup.constants";
import {bindActionCreators} from "redux";
import {userJoined, userLeft} from "../_actions/gameGroup.actions";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {searchGame} from "../_actions";
import {authentication} from "../_reducers/authentication.reducer";

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

        this.state = {
            game: props.location.viewProps.game.game,
            groupId: null
        };
    };

    render() {

        const gameId = this.state.game.id;

        return <div>
            <PrimarySearchAppBar displaySearchBar={false}/>

            <div style={contentPanelStyle}>

                <Helmet>
                    <style>{'body { background-color: rgb(255, 255, 255); }'}</style>
                </Helmet>
                <h1 style={gameNameTitleStyle}> {this.state.game.name}</h1>
                <img style={imgStyle} src={this.state.game.imageLink}/>

                <p><PeopleIcon/> Number of
                    players: {this.state.game.minimumNumberOfPlayers} - {this.state.game.maximumNumberOfPlayers}</p>
                <p><CakeIcon/> Suggested age: {this.state.game.suggestedAge}</p>
                <p><AccessAlarmIcon/> Average playing time: {this.state.game.averagePlayingTime}</p>

                <p>{this.state.game.description}</p>

                <Button variant="contained" color="secondary" onClick={() => {
                    this.props.searchGame(this.props.username,gameId);
                }}>
                    Play now
                </Button>
                <Button variant="contained" color="primary" onClick={() =>{
                    let socket = Singleton.getInstance();
                    let testDto = JSON.stringify({ senderEmail: localStorage.getItem("username"), message: localStorage.getItem("username"), targetGroup: localStorage.getItem("groupId"), type:'SEND_MESSAGE'});
                    socket.send(testDto);
                }}>
                    <Link to = {{
                        pathname: '/home',
                    }}>Back
                    </Link>
                </Button>

            </div>

        </div>
    }

}


function mapStateToProps(state) {
    const {authentication} = state;
    return {
        messages: state.message,
        users: state.users,
        thisUser: state.thisUser,
        username: authentication.username,
    }
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators({
        userJoined: userJoined,
        userLeft: userLeft,
        searchGame: searchGame
    }, dispatch);
}

ViewGamePage.propTypes = {
    searchGame: PropTypes.func.isRequired
};

const connecteddViewGamePage =  connect(mapStateToProps, mapDispatchToProps)(ViewGamePage);
export {connecteddViewGamePage as ViewGamePage};
