import React from 'react';
import {userActions} from "../_actions";
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
        };
    };

    componentDidMount() {
        this.registerSocket(this.state.game.id);
    }

    render() {

        const gameId = this.state.game.id;
        console.log("This:" + gameId);

        function sendMessage() {
            this.registerSocket();
            return;
            const socket = Singleton.getInstance();
            //TODO: security issue
            let messageDto = JSON.stringify({ email: localStorage.getItem("username"), gameId: gameId, type: gameGroupConstants.SEARCH_GAME});

            socket.send(messageDto);
        }


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

                <Button variant="contained" color="secondary" onClick={() => {
                    this.onPlayNow(gameId);
                }}>
                    Play now
                </Button>
                <Button variant="contained" color="primary">
                    <Link to = {{
                        pathname: '/home',

                    }}>Back
                    </Link>
                </Button>

            </div>

        </div>
    }

    registerSocket(gameId) {
        let self = this;
        this.socket = Singleton.getInstance();

        this.socket.onmessage = (response) => {
            let message = JSON.parse(response.data);
            let users;

            console.log("\"server's response:\" + ");
            console.log(message);

            switch (message.type) {
                case gameGroupConstants.USER_JOINED:
                    users = JSON.parse(message.data);
                    self.props.userJoined(users);
                    break;
                case gameGroupConstants.USER_LEFT:
                    users = JSON.parse(message.data);
                    self.props.userLeft(users);
                    break;
                default:
            }
        }

        this.socket.onopen = () => {
        }

        window.onbeforeunload = () => {
            let messageDto = JSON.stringify({ user: localStorage.getItem('user'), type: gameGroupConstants.USER_LEFT });
            this.socket.send(messageDto);
        }



    }

    onPlayNow(gameId) {
        function sendJoinedMessage(gameId) {
            let messageDto = JSON.stringify({ email: localStorage.getItem("username"), gameId: gameId, type: gameGroupConstants.SEARCH_GAME});
            let socket = Singleton.getInstance();
            socket.send(messageDto);
        }
        sendJoinedMessage(gameId);
    }
}


function mapStateToProps(state) {
    return {
        messages: state.message,
        users: state.users,
        thisUser: state.thisUser
    }
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators({
        userJoined: userJoined,
        userLeft: userLeft,
    }, dispatch);
}


function mapState(state) {
    const {registering} = state.registration;
    return {registering};
}

const actionCreators = {
    register: userActions.register
}

const connecteddViewGamePage =  connect(mapStateToProps, mapDispatchToProps)(ViewGamePage);
//const connectedViewGamePage = connect(mapState, actionCreators)(ViewGamePage);
export {connecteddViewGamePage as ViewGamePage};
