import "./css/Welcome.css";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardMedia: {
        paddingTop: "60.25%",
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    externallink: {
        '&:hover': {
            color: "#425C5A"
        }
    }
}));

export default function WelcomePage() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("welcome-data.json")
            .then((res) => {
                return res.json();
            } )
            .then((data) => setData(data));

    }, []);

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />

            <main>
                {/* Hero unit */}
                <div className={classes.heroContent} class="box">
                    <Box maxWidth="sm">
                        <img src="/img/welcome-page/principal-image.png" alt="principal"/>
                        <Button class="btn" variant="contained" color="primary" target="_blank" rel="noopener" href={"https://github.com/Arquisoft/radarin_es1a"}>
                            Watch the trailer <i className="fas fa-play-circle"></i>
                        </Button>
                    </Box>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {data.map((infor) => (
                            <Grid item key={infor.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={ infor.image }
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            { infor.title }
                                        </Typography>
                                        <Typography>
                                            { infor.description }
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button className={classes.externallink} size="small" color="primary" target={infor.target} rel="noopener" href={infor.url}>
                                            {infor.urlName}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <div className={classes.heroContent} class="box">
                    <Box maxWidth="sm">
                        <img src="/img/welcome-page/radarin.png" alt="radarin"/>
                    </Box>
                </div>
                <div className={classes.heroContent} class="box">
                    <Box maxWidth="sm">
                        <img src="/img/welcome-page/usability.png" alt="usability"/>
                    </Box>
                </div>
                <div className={classes.heroContent} class="box">
                    <Box maxWidth="sm">
                        <img src="/img/welcome-page/meeting.png" alt="meeting"/>
                    </Box>
                </div>
                <div className={classes.heroContent} class="box">
                    <Box maxWidth="sm">
                        <img src="/img/welcome-page/functionalities.png" alt="functionalities"/>
                    </Box>
                </div>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Radarin
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    University of Oviedo - Software Architecture
                </Typography>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}