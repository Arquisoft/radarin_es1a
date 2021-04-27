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
}));

export default function Album() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("students-data.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => setData(data));

    }, []);

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />

            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Creators
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            We are a group of students who are in their third year of Computer Software Engineering.
                            This application is developed for the Software Architecture subject.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" target="_blank" rel="noopener" href={"https://github.com/Arquisoft/radarin_es1a"}>
                                        Group Github
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary" target="_blank" rel="noopener" href={"https://arquisoft.github.io/"}>
                                        Subject Github
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {data.map((student) => (
                            <Grid item key={student.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={student.image}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {student.fullName}
                                        </Typography>
                                        <Typography>
                                            {student.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" target="_blank" rel="noopener" href={student.github}>
                                            Github account
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
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