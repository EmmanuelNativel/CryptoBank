import React from "react";
import AppBar from "./components/AppBar";
import Banner from "./components/Banner/Banner";
import './App.css';

import { ThemeProvider } from '@material-ui/styles';
import theme from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar />
        <Banner />
        <h1>Hello World !</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
