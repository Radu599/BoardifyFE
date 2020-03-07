import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {gameActions} from '../_actions';
import PrimarySearchAppBar from "../_components/layout/PrimarySearchAppBar";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getGames();
    }

    render() {
        const {user, games} = this.props;
        return (
            <div>
                <PrimarySearchAppBar></PrimarySearchAppBar>
                <div className="col-md-6 col-md-offset-3">
                    <h1>Hi {user.firstName}!</h1>
                    <h3>All games:</h3>
                    {games.loading && <em>Loading games...</em>}
                    {games.error && <span className="text-danger">ERROR: {games.error}</span>}
                    {games.items &&
                    <ul>
                        {games.items.map((game, index) =>
                            <li key={user.id}>
                                {game.id + ' ' + game.name}
                                {
                                }
                            </li>
                        )}
                    </ul>
                    }
                    <p>
                        <Link to="/login">Logout</Link>
                    </p>
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
