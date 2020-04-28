import React, {Component} from 'react';
import {connect} from 'react-redux';
import HumanizedTime from './humanized_time';
import './styles/messages.scss';

class Messages extends Component {
    renderMessages() {
        console.log(this.props.chatMessages);
        return this.props.chatMessages.map(message => {
            message = JSON.parse(message);
            console.log("MESSAGE");
            console.log(message);
            console.log(message.timestamp);
            return (
                //TODO set a proper key
                <div key={Math.floor(Math.random() * 9999999)} className="list-group-item">
                    <div className="media">
                        <div className="media-left">
                            {/*               <img className="media-object img-circle" src={message.user.avatar}/>*/}
                        </div>
                        <div className="media-body">
                            <div className="row">
                                <div className="col-md-2 text-left text-info">
                                    {message.senderEmail}
                                </div>
                                <div className="col-md-8 text-left">{message.message}</div>
                                <div className="col-md-2 text-right text-info">
                                    <small><HumanizedTime date={message.timestamp}/></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="list-group chat-messages panel">
                {this.renderMessages()}
                <div ref={(div) => {
                    if (div) div.scrollIntoView({block: 'end', behavior: 'smooth'});
                }}></div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {messages} = state;
    return {
        chatMessages: messages.messageArray
    }
}


export default connect(mapStateToProps)(Messages);
