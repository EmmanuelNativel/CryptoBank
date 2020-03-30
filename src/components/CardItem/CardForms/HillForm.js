import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Switch,
  FormLabel,
  Grid,
  CardActions,
  Button,
  Typography
} from "@material-ui/core";

import {
  encrypt,
  decrypt,
  getDeterminant,
  isMAtrixValid
} from "./../../../scripts/Hill";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden"
  },
  centered: {
    textAlign: "center"
  },
  blueButton: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText
    }
  }
}));

export default function HillForm({ data, text, onTextChange, onResult }) {
  const classes = useStyles();
  const [A, setA] = useState(0);
  const [B, setB] = useState(0);
  const [C, setC] = useState(0);
  const [D, setD] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState({ statut: false, text: "" });

  const handleAction = e => {
    const determinant = getDeterminant(A, B, C, D);
    const isValid = isMAtrixValid(determinant);
    if (isValid) {
      const result = isDecrypting
        ? decrypt(determinant, A, B, C, D, text)
        : encrypt(A, B, C, D, text);
      onResult(result);
    }
  };

  const handleAchange = e => {
    const value = e.target.value;
    setA(value);
    handleKeyChange(value, B, C, D);
  };
  const handleBchange = e => {
    const value = e.target.value;
    setB(value);
    handleKeyChange(A, value, C, D);
  };
  const handleCchange = e => {
    const value = e.target.value;
    setC(value);
    handleKeyChange(A, B, value, D);
  };
  const handleDchange = e => {
    const value = e.target.value;
    setD(value);
    handleKeyChange(A, B, C, value);
  };

  const handleKeyChange = (A, B, C, D) => {
    const determinant = getDeterminant(A, B, C, D);
    const isValid = isMAtrixValid(determinant);
    isValid
      ? setError({ statut: false, text: "" })
      : setError({ statut: true, text: `${determinant} is a wrong determinant !` });
  };

  return (
    <form className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item className={classes.centered}>
          <FormLabel style={{ color: "black" }}>Encrypt</FormLabel>
          <Switch
            color="default"
            checked={isDecrypting}
            onChange={e => setIsDecrypting(e.target.checked)}
          />
          <FormLabel style={{ color: "black" }}>Decrypt</FormLabel>
        </Grid>
        <Grid item container direction="row" spacing={2}>
          <Grid item xs={6} sm={3}>
            <TextField
              type="number"
              label="A"
              variant="outlined"
              required
              color="primary"
              size="small"
              value={A}
              onChange={handleAchange}
              error={error.statut}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              type="number"
              label="B"
              variant="outlined"
              required
              color="primary"
              size="small"
              value={B}
              onChange={handleBchange}
              error={error.statut}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              type="number"
              label="C"
              variant="outlined"
              required
              color="primary"
              size="small"
              value={C}
              onChange={handleCchange}
              error={error.statut}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              type="number"
              label="D"
              variant="outlined"
              required
              color="primary"
              size="small"
              value={D}
              onChange={handleDchange}
              error={error.statut}
            />
          </Grid>
        </Grid>
        {error.statut && (
          <Grid item align="center">
            <Typography variant="body1" color="error">
              {error.text}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <TextField
            label={isDecrypting ? "Text to decrypt" : "Text to encrypt"}
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
              {isDecrypting ? "Decrypt" : "Encrypt"}
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
