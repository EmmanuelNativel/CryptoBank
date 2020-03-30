import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Switch,
  FormLabel,
  Grid,
  CardActions,
  Button,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

import {
  isKeyCorrect,
  getKeyFromHexa,
  DES,
  getKeys,
  readBinaryText
} from "./../../../scripts/DES";

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

export default function DESForm({ data, text, onTextChange, onResult }) {
  const classes = useStyles();
  const [key, setKey] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isKeyBinary, setIsKeyBinary] = useState(false);

  const handleAction = e => {
    const KEY = isKeyBinary ? key : getKeyFromHexa(key);
    console.log("BINARY KEY =", KEY);
    const isValid = isKeyCorrect(KEY);
    if (isValid) {
      const keysArray = getKeys(KEY);
      if (isDecrypting) {
        // Si le texte est en héxa on le traduit en binaire -> à faire dans la fct DES (ajout d'un bool)
        // Sinon on lance l'algo sur le texte en clair
        const decryptKeysArray = keysArray.reverse();
        //const decryptedMessage = DES(readBinaryText(text), decryptKeysArray);
        const decryptedMessage = DES(text, decryptKeysArray);
        onResult(readBinaryText(decryptedMessage));
      } else {
        // Si le texte est en héxa on le traduit en binaire -> à faire dans la fct DES (ajout d'un bool)
        // Sinon on lance l'algo sur le texte en clair
        const cryptedMessage = DES(text, keysArray);
        onResult(readBinaryText(cryptedMessage));
      }
    }
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

        <Grid item container direction="row" spacing={1} alignItems="center">
          <Grid item xs={9}>
            <TextField
              label={isKeyBinary ? "Binary key" : "Hexadecimal Key"}
              variant="outlined"
              fullWidth
              required
              color="primary"
              size="small"
              value={key}
              onChange={e => setKey(e.target.value)}
            />
          </Grid>
          <Grid item xs={3} align="right">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={isKeyBinary}
                  onChange={e => setIsKeyBinary(e.target.checked)}
                />
              }
              label="Binary key"
            />
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            label={`Text to ${
              isDecrypting ? "decrypt" : "encrypt"
            }. For hexadecimal character use this format : \\xFF `}
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
