import React from 'react';
import {leaveGroup} from "../../_actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Nav = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">Boardify</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li onClick={() => {
                            props.leaveGroup();
                            history.back();
                        }}>Leave group
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const actionCreators = {
    leaveGroup: leaveGroup
}

export default connect(
    null,
    actionCreators
)(Nav);
