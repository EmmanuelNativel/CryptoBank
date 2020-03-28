import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./Theme";
import "./App.css";

import AppBar from "./components/AppBar/AppBar";
import Banner from "./components/Banner/Banner";
import CardsCollection from "./components/CardsCollection/CardsCollection";

import backgroundImg from "./background.jpg";

const useStyles = makeStyles(theme => ({
  App: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    margin: 0
  }
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        <AppBar />
        <Banner />
        <CardsCollection />
      </div>
    </ThemeProvider>
  );
}

export default App;
