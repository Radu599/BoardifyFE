import React from 'react';
import {connect} from 'react-redux';

import {userActions} from '../_actions';
import SignInSide from "./SignInSide";
import {findCity, findMyCity} from "../_helpers/geoLocation";

class LoginPage extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });

    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;

        if (username && password) {
            this.props.login(username, password);
        }
    }


    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <SignInSide loggingIn={loggingIn} username={username} password={password} submitted={submitted} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
