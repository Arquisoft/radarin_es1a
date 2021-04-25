import React, { useEffect, useState } from "react";
import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Switch, Route ,Link } from "react-router-dom";
import { LoginView } from "../../components/layouts/LoginView";
import {
    Divider,
    Drawer,
    Hidden,
    ListItem,
    ListItemText
} from "@material-ui/core";
import theme from "./Theme";

const drawerWidth = 280;

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
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
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
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
            
                <Switch>
                    <Route path="/login" component={LoginView} />
                </Switch>
            
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
                        <Button color="inherit" href="/welcome">Welcome</Button>
                        <Button color="inherit" href="/creators">Creators</Button>
                        <Link className="login" to="/login" label="Login" value="Login" onClick={()=>this.handleLinkClick()}>
                            <Button color="inherit" href="/login">Login</Button>
                        </Link>
                        
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
                <Link className="link" to="/welcome" label="Welcome" value="Welcome" onClick={()=>this.handleLinkClick()}>
                    <ListItemLink href="/welcome">
                        <ListItemText primary="Welcome" />
                    </ListItemLink>
                </Link>
                <Link className="creators" to="/creators" label="Creators" value="Creators" onClick={()=>this.handleLinkClick()}>
                    <ListItemLink href="/creators">
                        <ListItemText primary="Creators" />
                    </ListItemLink>
                </Link>
                <Divider />
                <Link className="login" to="/login" label="Login" value="Login" onClick={()=>this.handleLinkClick()}>
                    Login
                </Link>
                </div>
            </Drawer>
            </MuiThemeProvider>
        </div>


    );
}


