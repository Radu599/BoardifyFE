import React from 'react';
import './styles/index.scss';
import Nav from "./nav";
import OnlineUsers from './online_users';
import Messages from './messages';
import MessageInput from './message_input';
import UserProfile from './user_profile';
import {connectToChatServer} from "../../_actions/chat";
import {connect} from 'react-redux';


export default class Chat extends React.Component {
    render() {
        console.log("group=" + this.props.location.state.groupId);
        return (
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
                        <div className="full-height">
                            <Messages/>
                            <MessageInput groupId={this.props.location.state.groupId}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
