import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {gameActions} from '../_actions';
import PrimarySearchAppBar from "../_components/layout/PrimarySearchAppBar";
import Album from "../_components/Album";

class HomePage extends React.Component {
    componentWillMount() {
        this.props.getGames();
    }

    render() {
        const {user, games} = this.props;

        return (
            <div>

                <PrimarySearchAppBar></PrimarySearchAppBar>
                <div className="col-md-6 col-md-offset-3">
                    {games.items && <Album games={games} />}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const {games, authentication} = state;
    const {user} = authentication;
    return {user, games};
}

const actionCreators = {
    getGames: gameActions.getAllGames
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
