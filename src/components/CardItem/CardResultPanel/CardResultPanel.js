import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography } from "@material-ui/core";
import headerImg from "./img.jpg";

const useStyles = makeStyles(theme => ({
  resultPanel: {
    backgroundImage: `url(${headerImg})`,
    height: "6rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    display: "flex",
    overflow: "scroll"
  },
  text: {
    margin: "auto",
    color: "white"
  }
}));

export default function CardResultPanel({ text }) {
  const classes = useStyles();
  return (
    <CardContent className={classes.resultPanel}>
      <Typography
        variant="h4"
        component="h4"
        className={classes.text}
        align="center"
      >
        {text}
      </Typography>
    </CardContent>
  );
}
