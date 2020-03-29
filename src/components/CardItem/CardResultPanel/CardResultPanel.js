import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography } from "@material-ui/core";
import headerImg from "./img.jpg";

/**
 * TODO: Rendre la taille du texte adaptif !
 *     : Ajouter un bouton reset ?? -> Pour actualiser le message (dé)crypté
 */

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

export default function CardResultPanel({
  text,
  result
}) {
  const classes = useStyles();

  return (
    <CardContent className={classes.resultPanel}>
      <Typography
        variant="h4"
        component="h4"
        className={classes.text}
        align="center"
      >
      {result ? result : text}
      </Typography>
    </CardContent>
  );
}
