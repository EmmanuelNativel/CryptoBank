import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import CardItem from "./../CardItem/CardItem";
import ScrollableAnchor from "react-scrollable-anchor";

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
    margin: "0 auto",
    marginTop: "100px"
  }, 
  text: {
    textAlign: "center",
    color: "white",
    marginBottom: "100px",
    marginTop: "50px",
  }
}));

export default function CardsCollection({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <ScrollableAnchor id={"result"}>
      <Grid container spacing={5}>
        {data.length === 0 ? (
          <div className={classes.text}>
            <Typography variant="h3" component="p" color="secondary" paragraph>
              Sorry, your search did not match any algorithm.
            </Typography>
            <Typography variant="h5" component="p">
              You can request using algorithm name or properties like
              "Polyalphabetic", "Super-encryption", "Vigenère" ect...
            </Typography>
          </div>
        ) : (
          data.map(e => (
            <Grid item xs={12} sm={6} key={e.id}>
              <CardItem data={e} />
            </Grid>
          ))
        )}
      </Grid>
      </ScrollableAnchor>
    </div>
  );
}
