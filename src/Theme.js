import { createMuiTheme } from "@material-ui/core/styles";
import {blue, red, grey} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4da9b7",
      //main: "#262626",
      main: grey[900],
      dark: "#004e5a",
      contrastText: "#000"
    },
    secondary: {
      light: "#ff8e8c",
       //main: "#ff5a5f",
      main: red["A700"],
      dark: "#c62035",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif"
    ].join(","),
    h1: {
        fontFamily: "Pacifico",
        fontSize: "6rem",
        marginTop: "1rem"
    }, 
    h2: {
        fontFamily: "Helvetica Neue",
        fontSize: "2.5rem",
        fontWeight: 200,
    },
    h6: {
        fontFamily: "Nunito",
        fontSize: "2.5rem",
    }
  }, 
});

export default theme;
