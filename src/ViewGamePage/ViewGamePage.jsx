import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import PrimarySearchAppBar from "../_components/layout/PrimarySearchAppBar";
import PeopleIcon from '@material-ui/icons/People';
import CakeIcon from '@material-ui/icons/Cake';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from "redux";
import {userJoined, userLeft} from "../_actions/gameGroup.actions";
import {Helmet} from "react-helmet";
import {searchGame} from "../_actions";
import {history} from "../_helpers";


const imgStyle = {
    maxWidth: "20%",
    marginRight: '5%'
};

const contentPanelStyle = {
    marginLeft: "5%",
    marginTop: "2%",
    color: 'black'
};

const gameNameTitleStyle = {
    textAlign: "center",
    color: 'black',
    marginBottom: '7%',
    marginTop: '3%',
    fontWeight: 'bold'
};

const content = {
    display: 'flex',
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
}

const allContent = {
    backgroundImage: `url(` + "../../image/bg.jpg" + `)`,
    height: '1000px',
};

const gameStats = {
    fontSize: '40px'
}

const stateIcon = {
    width: '40px',
    height: '40px'
}

const button = {
    width: '100px',
    height: '50px',
    marginRight: '20px',
    marginTop: '15px',
    textAlign: 'center',
    justifyContent: 'center'
}

const buttonText = {
    fontSize: '12px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const description = {
    textAlign: 'center',
    marginTop: '50px',
};

const gamePanel = {};

export default class ViewGamePage extends React.Component {

    componentDidMount() {
        let stylesheet = document.styleSheets[0];
        stylesheet.disabled = true;
    }

    constructor(props) {
        super(props);

        this.state = {
            game: this.props.game,
        };
    };

    render() {

        const gameId = this.state.game.id;

        return <div style={allContent}>
            <PrimarySearchAppBar displaySearchBar={false}/>

            <div style={contentPanelStyle}>
                <Helmet>
                    <style>{'body { background-color: rgb(255, 255, 255); }'}</style>
                </Helmet>
                <h1 className="title" style={gameNameTitleStyle}> {this.state.game.name}</h1>
                <div style={content}>
                    <img style={imgStyle} src={this.state.game.imageLink}/>

                    <div style={gamePanel}>
                        <p style={gameStats}><PeopleIcon style={stateIcon}/> Number of
                            players: {this.state.game.minimumNumberOfPlayers} - {this.state.game.maximumNumberOfPlayers}
                        </p>
                        <p style={gameStats}><CakeIcon style={stateIcon}/> Suggested age: {this.state.game.suggestedAge}
                        </p>
                        <p style={gameStats}><AccessAlarmIcon style={stateIcon}/> Average playing
                            time: {this.state.game.averagePlayingTime}</p>

                        <Button style={button} variant="contained" color="secondary" onClick={() => {
                            this.props.searchGame(this.props.username, gameId);
                        }}>
                            <p style={buttonText}> Play now</p>
                        </Button>
                        <Button style={button} variant="contained" color="primary" onClick={() => {
                            history.push("/home");
                        }}>
                            <p style={buttonText}> Back</p>

                        </Button>
                        {this.props.gameStarted && history.push("/chat")}

                    </div>
                </div>
                <p className="description" style={description}>{this.state.game.description}</p>

            </div>
        </div>
    }
}

function mapStateToProps(state) {
    const {authentication, games, gameGroup} = state;
    return {
        username: authentication.username,
        game: games.game,
        gameStarted: gameGroup.gameStarted
    }
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators({
        userJoined: userJoined,
        userLeft: userLeft,
        searchGame: searchGame
    }, dispatch);
}

ViewGamePage.propTypes = {
    searchGame: PropTypes.func.isRequired
};

const connectedViewGamePage = connect(mapStateToProps, mapDispatchToProps)(ViewGamePage);
export {connectedViewGamePage as ViewGamePage};
