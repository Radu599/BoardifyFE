import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {RegisterPage} from '../RegisterPage';
import {ViewGamePage} from "../ViewGamePage";
import Chat from "../_components/Chat/chat";
import {connectToChatServer} from "../_actions/chat";

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    componentDidMount(){
      //  this.props.connectToChatServer(`ws://${location.host}/websocket/chat`);
    }

    render() {
        const {alert} = this.props;
        return (
            <div>
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/viewGame" component={ViewGamePage}/>
                        <Route exact path="/chat" component={Chat}/>

                        <Redirect from="*" to="/"/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapState(state) {
    const {alert} = state;
    return {alert};
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);

export {connectedApp as App};
