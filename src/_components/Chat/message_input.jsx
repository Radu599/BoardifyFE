import React from 'react';
import {sendMessage} from '../../_actions/chat';
import {connect} from 'react-redux';
import './styles/messages.scss';
import {bindActionCreators} from "redux";
import Chat from "./chat";
import PropTypes from 'prop-types';
import {gameGroup} from "../../_reducers/gameGroupReducer";


class MessageInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            groupId: '',
        };
    }

    onInputChange(message) {
        this.setState({message});
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.props.user, this.props.groupId, this.state.message);
        this.setState({message: ''});
        return false;
    }

    render() {
        return (
            <div className="container-fluid">
                <form className="form-horizontal" role="form" onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-addon">Type Message</div>
                            <input type="text"
                                   value={this.state.message}
                                   onChange={event => this.onInputChange(event.target.value)}
                                   className="form-control input-lg"></input>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
  const {authentication, gameGroup} = state;

  return {
    user: authentication.username,
    groupId: gameGroup.groupId
  }
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators({
        sendMessage: sendMessage
    }, dispatch);
}

MessageInput.propTypes = {
    sendMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
