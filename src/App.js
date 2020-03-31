import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./Theme";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
import Banner from "./components/Banner/Banner";
import CardsCollection from "./components/CardsCollection/CardsCollection";
import Footer from "./components/Footer/Footer";

import './config';
import backgroundImg from "./background.jpg";
import data from "./data";

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
  const [dataCurrent, setDataCurrent] = useState(data);

  const handleResearch = value => {
    setDataCurrent(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        <AppBar onResearching={handleResearch} />
        <Banner />
          <CardsCollection data={dataCurrent} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
