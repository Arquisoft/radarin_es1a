import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    // typography: {
    //     fontFamily: [
    //         "SF Pro Display",
    //         "SF Pro Icons",
    //         "Helvetica Neue",
    //         "Helvetica",
    //         "Arial",
    //         "sans-serif"
    //     ].join(','),
    // },
    palette: {
        primary:{
            main: "#303030"
        },
        secondary:{
            main: "#F8F5F3"
        },
    },
});

export default theme;