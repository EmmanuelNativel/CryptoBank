import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, CardActions, Button } from "@material-ui/core";

import { cesar } from "../../../scripts/Cesar";

const useStyles = makeStyles(theme => ({
  blueButton: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText
    }
  }
}));

export default function CesarForm({ data, text, onTextChange, onResult }) {
  const classes = useStyles();

  const [key, setKey] = useState("");
  const [error, setError] = useState({ statut: false, text: "" });

  const handleAction = e => {
    const keyValue = parseInt(key, 10);
    if (isNaN(keyValue)) {
      setError({ statut: true, text: "Key is not a number" });
    } else {
      setError({ statut: false, text: "" });
      const result = cesar(text, keyValue);
      onResult(result);
    }
  };

  const handleKeyChange = e => {
    const value = e.target.value;
    setKey(value);
    isNaN(parseInt(value, 10)) || value === ""
      ? setError({ statut: true, text: "Key is not a number" })
      : setError({ statut: false, text: "" });
  };

  return (
    <form>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <TextField
            type="number"
            label="Key (Number)"
            variant="outlined"
            fullWidth
            required
            color="primary"
            size="small"
            value={key}
            onChange={handleKeyChange}
            error={error.statut}
            helperText={error.text}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Write yout text here"
            multiline
            rows="6"
            variant="outlined"
            fullWidth
            required
            color="primary"
            style={{ height: "10rem" }}
            value={text}
            onChange={onTextChange}
          />
        </Grid>
        <Grid item>
          <CardActions>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={handleAction}
              disabled={error.statut}
            >
              Start
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              className={classes.blueButton}
              component="a"
              href={data.link}
              target="_blank"
            >
              Learn more
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </form>
  );
}
