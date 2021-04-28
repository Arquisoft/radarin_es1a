import React, { useEffect, useState } from "react";
import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
    Divider,
    Drawer,
    Hidden,
    ListItem,
    ListItemText
} from "@material-ui/core";
import theme from "./Theme";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 280;

function ListItemLink(props) {
    return <ListItem button component={RouterLink} {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    button: {
        '&:hover': {
            color: "#99DE9F"
        }
    }
}));

export default function WelcomeMenu() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        drawer: false
    });

    // eslint-disable-next-line
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, drawer: open });
    };

    return (

        <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
                <AppBar position="relative" color="primary" className={classes.appBar}>
                    <Toolbar>
                        <Hidden mdUp>
                            <IconButton color="secondary" edge="start" className={classes.menuButton} aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Typography variant="h6" className={classes.title}>
                            Radarin
                        </Typography>
                        <Hidden smDown>
                            <Button className={classes.button} color="inherit" component={RouterLink} to="/welcome">Welcome</Button>
                            <Button className={classes.button} color="inherit" component={RouterLink} to="/creators">Creators</Button>
                            <Button className={classes.button} color="inherit" component={RouterLink} to="/login">Login</Button>
                        </Hidden>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open = {state.drawer}
                    onClick = {toggleDrawer(false)}

                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <ListItemLink to="/welcome">
                            <ListItemText class={"sidebar"} primary="Welcome" />
                        </ListItemLink>
                        <ListItemLink to="/creators">
                            <ListItemText class={"sidebar"} primary="Creators" />
                        </ListItemLink>
                        <Divider />
                        <ListItemLink to="/login">
                            <ListItemText class={"sidebar"} primary="Login" />
                        </ListItemLink>
                    </div>
                </Drawer>
            </MuiThemeProvider>
        </div>


    );
}