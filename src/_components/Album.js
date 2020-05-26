import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {history} from "../_helpers";
import {useDispatch} from "react-redux";
import {gameConstants} from "../_constants";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '135%'

    },
    cardMedia: {
        paddingTop: '100%', // 16:9
        paddingLeft: '100%',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const album = {

};

export default function Album(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    let {games, searchText, numberOfPlayers, suggestedAge, playingTime} = props;

    function isBetween(x, min, max) {
        return x >= min && x <= max;
    }

    return (
        <React.Fragment>
            <CssBaseline/>

            <main>
                <Container style={album} className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={10}>
                        {games.items.filter(game => game.name.toLowerCase().startsWith(searchText.toLowerCase())
                            && numberOfPlayers[0] <= game.minimumNumberOfPlayers
                            && numberOfPlayers[1] >= game.maximumNumberOfPlayers
                            && isBetween(game.suggestedAge, suggestedAge[0], suggestedAge[1])
                            && isBetween(game.averagePlayingTime, playingTime[0], playingTime[1])
                        ).map(game => (
                            <Grid item key={game.id} xs={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={game.imageLink}
                                        title={game.name}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {game.name}
                                        </Typography>
                                        <Typography>
                                            {game.description.substring(0,100) + "..."}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => {
                                            dispatch({
                                                type: gameConstants.SELECT_GAME,
                                                payload: {game: game}
                                            })
                                            history.push("/viewGame");
                                        }}>View
                                        </Button>
                                        <Button size="small" color="primary">
                                            Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

        </React.Fragment>
    );
}
