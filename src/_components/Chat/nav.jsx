import React from 'react';
import {userActions} from "../../_actions";
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";
import Menu from "@material-ui/core/Menu";

const Nav = (props) => {
  return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Boardify</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li onClick={() => props.logout()}><Link to="/login">Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

const actionCreators = {
  logout: userActions.logout
}


export default connect(
    null,
    actionCreators
)(Nav);
