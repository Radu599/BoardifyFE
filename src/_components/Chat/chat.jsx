import React from 'react';
import './styles/index.scss';
import Nav from "./nav";
import OnlineUsers from './online_users';
import Messages from './messages';
import MessageInput from './message_input';
import UserProfile from './user_profile';
import "../../styles/Chat.scss";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {history} from "../../_helpers";

class Chat extends React.Component {
    render() {
        return (
            <div>
                {this.props.gameStarted === false && history.push("/viewGame")}
                <div className="full-height">
                    <div className="row">
                        <Nav/>
                    </div>
                    <div className="row full-height">
                        <div className="col-md-3 full-height">
                            <UserProfile/>
                            <OnlineUsers/>
                        </div>
                        <div className="col-md-9 full-height">
                            <div className="full-height chatField">
                                <Messages/>
                                <MessageInput/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {gameGroup} = state;

    return {
        groupId: gameGroup.groupId,
        gameStarted: gameGroup.gameStarted
    }
}

Chat.propTypes = {
    sendMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Chat);
