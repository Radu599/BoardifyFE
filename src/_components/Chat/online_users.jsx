import React from 'react';
import {connect} from 'react-redux';
import './styles/users.scss';
import HumanizedTime from "./humanized_time";

class OnlineUsers extends React.Component {

    renderUsers() {
        if(this.props.stats==undefined)
            return;
        return Object.values(this.props.stats).map(userStats => {
            console.log("map");
            console.log(userStats);
            let jsonObject = JSON.parse(userStats);
            return (
                <li className="media" key={jsonObject.email}>
                   {/* <div className="media-left"><img className="media-object" src={jsonObject.avatar}/></div>*/}
                    <div className="media-body">

                        <div className="row">
                            <div className="col-md-9"><span className="span8">{jsonObject.email}</span></div>
                            <div className="col-md-3"><span
                                className="span4 pull-right label label-success">{jsonObject.messageCount}</span></div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <small className="text-info"><HumanizedTime prefix="last seen" suffix="ago"
                                                                            date={jsonObject.lastMessage}/></small>
                            </div>
                        </div>
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="panel panel-default">
                <ul className="media-list online-users">
                    {this.renderUsers()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {

    const {stats} = state;
    return {
        stats: stats.usersArray
    }
}

export default connect(mapStateToProps)(OnlineUsers);
