import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Avatar,
  Grid
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import data from "../../data";
import { goToAnchor, removeHash } from "react-scrollable-anchor";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    width: "100%",
    zIndex: 100
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: theme.palette.secondary.dark,
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  avatar1: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    color: theme.palette.secondary.dark,
    cursor: "pointer"
  },
  avatar2: {
    backgroundColor: fade(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.8)
    },
    color: theme.palette.secondary.dark,
    cursor: "pointer",

    opacity: "1",
    animationName: "$blinker",
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite"
  },
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0.5 }
  },
  labelC: {
    color: "white"
  },
  containerSearch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
}));

export default function SearchAppBar({ onResearching }) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [resultCount, setResultCount] = useState(data.length);
  const [countClass, setCountClass] = useState(classes.avatar1); // Changement classe

  const handleResearching = e => {
    const value = e.target.value;
    setSearchText(value);
    const selectedData = data.filter(
      e =>
        e.name.toLowerCase().includes(value.toLowerCase()) ||
        e.properties.some(p => p.toLowerCase().includes(value.toLowerCase()))
    );
    setResultCount(selectedData.length);
    onResearching(selectedData);
    selectedData.length === 0
      ? setCountClass(classes.avatar1)
      : setCountClass(classes.avatar2);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      scrollToAnchor(e);
    }
  };

  const scrollToAnchor = e => {
    setCountClass(classes.avatar1);
    goToAnchor("result", false);
    setTimeout(() => {
      removeHash();
    }, 500);
  };

  const scrollToStart = e => {
    goToAnchor("start", false);
    setTimeout(() => {
      removeHash();
    }, 500);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={scrollToStart}
          >
            <img src="favicon.ico" alt="cryptobank" height="50" />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            CryptoBank
          </Typography>
          <div className={classes.containerSearch}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                autoComplete={data.map(e => e.name).join(" ")}
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={handleResearching}
                helperText="Incorrect entry."
                onBlur={e => setCountClass(classes.avatar1)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <Grid
              direction="column"
              style={{ marginLeft: "20px", marginTop: "15px" }}
            >
              <Grid item style={{ marginBottom: "2px" }}>
                <Avatar
                  className={countClass}
                  alt="Number of result"
                  onClick={scrollToAnchor}
                >
                  {resultCount}
                </Avatar>
              </Grid>
              <Grid item align="center">
                <Typography variant="h5" className={classes.labelC} noWrap>
                  results
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
