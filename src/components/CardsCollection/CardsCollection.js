import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import data from "./../../data";
import CardItem from './../CardItem/CardItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
    margin: "0 auto",
    marginTop: "100px"
  }
}));

export default function CardsCollection() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        {data.map(e => (
          <Grid item xs={12} sm={6} key={e.id}>
            <CardItem data={e}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
