import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#1A4461",
      main: "#030F19",
      dark: "#111111",
      contrastText: "#0A2333"
    },
    secondary: {
      light: red,
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
      marginTop: "1rem",
      lineHeight: "9rem"
    },
    h2: {
      fontFamily: "Helvetica Neue",
      fontSize: "2.5rem",
      fontWeight: 200
    },
    h4: {
      fontFamily: "Roboto",
      fontSize: "1.5rem",
      fontWeight: 200
    },
    h6: {
      fontFamily: "Nunito",
      fontSize: "2.5rem"
    },
    subtitle1: {
      fontFamily: "Helvetica Neue",
      fontSize: "1.5rem",
      fontWeight: 300
    }
  }
});

export default theme;
