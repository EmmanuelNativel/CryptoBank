import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import background from "./banner.jpg";

import ScrollableAnchor from "react-scrollable-anchor";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "relative",
    overflow: "hidden",
    height: "91vh",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left center",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "40vh",
    }
  },
  container: {
    height: "inherit",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  asideBox: {
    height: "inherit",
    width: "40%",
    float: "right",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: 'none'
    }
  },
  asideText: {
    textAlign: "left",
    marginBottom: "20%"
  }
}));

export default function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScrollableAnchor id={"start"}>
        <div className={classes.container}>
          <div className={classes.asideBox}>
            <section className={classes.asideText}>
              <Typography variant="h2" component="h2" color="secondary">
                Online implementation of
              </Typography>
              <Typography variant="h1" component="h1">
                Cryptography algorithms
              </Typography>
            </section>
          </div>
        </div>
      </ScrollableAnchor>
    </div>
  );
}
