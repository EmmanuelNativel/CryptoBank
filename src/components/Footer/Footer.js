import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginTop: "5vh",
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    height: 50
  },
  text: {
    margin: "auto"
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.text} variant="body2" noWrap>
        ©2020 - Emmanuel Nativel - Université de la Réunion
      </Typography>
    </div>
  );
}
