import React, { Component }  from 'react';
import { connect } from 'react-redux';
import './styles/profile.scss';

class UserProfile extends Component {
  render() {
    return (
      <div className="list-group user-profile">
        <div className="list-group-item">
          {<img src={encodeURI(`https://robohash.org/${this.props.authentication.username.toLowerCase()}.png`)} className="img-responsive img-circle center-block profile-image" />}
        </div>
        <div className="list-group-item">
          {<p className="text-center">{this.props.authentication.username}</p>}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {

    const {authentication} = state;
    return {
        authentication: authentication
    }
}

export default connect(mapStateToProps)(UserProfile);
