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
            return (
                <li className="media" key={userStats.email}>
                   {/* <div className="media-left"><img className="media-object" src={jsonObject.avatar}/></div>*/}
                    <div className="media-body">

                        <div className="row">
                            <div className="col-md-9"><span className="span8">{userStats.email}</span></div>
                            <div className="col-md-3"><span
                                className="span4 pull-right label label-success">{userStats.messageCount}</span></div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <small className="text-info"><HumanizedTime prefix="last seen" suffix="ago"
                                                                            date={userStats.lastMessage}/></small>
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
        stats: stats
    }
}

export default connect(mapStateToProps)(OnlineUsers);
