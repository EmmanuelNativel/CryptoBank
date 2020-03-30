import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Switch,
  FormLabel,
  Grid,
  CardActions,
  Button
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

  const handleAction = e => {
    const determinant = getDeterminant(A, B, C, D);
    const isValid = isMAtrixValid(determinant);
    console.log("HILL -> ", text, A, B, C, D, determinant, isValid);
    if (isValid) {
      const result = isDecrypting
        ? decrypt(determinant, A, B, C, D, text)
        : encrypt(A, B, C, D, text);
      onResult(result);
    } // SINON GERER LES ERREURS
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
              onChange={e => setA(e.target.value)}
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
              onChange={e => setB(e.target.value)}
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
              onChange={e => setC(e.target.value)}
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
              onChange={e => setD(e.target.value)}
            />
          </Grid>
        </Grid>
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
