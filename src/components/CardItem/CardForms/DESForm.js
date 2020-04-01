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

/**
 * TODO: ENLEVER LES \x00 \x00 dans le message décrypté
 */

export default function DESForm({ data, text, onTextChange, onResult }) {
  const classes = useStyles();
  const [key, setKey] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isKeyBinary, setIsKeyBinary] = useState(false);
  const [error, setError] = useState({statut: false, text: ""});

  const handleAction = e => {
    const KEY = isKeyBinary ? key : getKeyFromHexa(key);
    console.log("BINARY KEY =", KEY);
    const isValid = isKeyCorrect(KEY);
    if (isValid) {
      setError({statut: false, text: ""});
      const keysArray = getKeys(KEY);
      if (isDecrypting) {
        const decryptKeysArray = keysArray.reverse();
        const decryptedMessage = DES(text, decryptKeysArray);
        onResult(readBinaryText(decryptedMessage));
      } else {
        const cryptedMessage = DES(text, keysArray);
        onResult(readBinaryText(cryptedMessage));
      }
    } else setError({statut: true, text: "Invalid key"});
  };

  const handleKeyChange = e => {
    const value = e.target.value;
    setKey(value);
    const k = isKeyBinary ? value : getKeyFromHexa(value);
    const isValid = isKeyCorrect(k);
    isValid || value === "" ? setError({statut: false, text:""}) : setError({statut: true, text:"Invalid key"});
  }

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
              onChange={handleKeyChange}
              error={error.statut}
              helperText={error.text}
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
