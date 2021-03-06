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

import { encrypt, decrypt } from "./../../../scripts/Playfair";

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

export default function PlayfairForm({ data, text, onTextChange, onResult }) {
  const classes = useStyles();
  const [key, setKey] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState({ statut: false, text: "" });

  const handleAction = e => {
    const result = isDecrypting ? decrypt(text, key) : encrypt(text, key);
    onResult(result);
  };

  const handleKeyChange = e => {
    const value = e.target.value.toLowerCase();
    setKey(value);
    const regex = /^[a-z0-9]+$/gi; // lettres et chiffres uniquement
    regex.test(value) || value === ""
      ? setError({ statut: false, text: "" })
      : setError({ statut: true, text: "Invalid key" });
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
        <Grid item>
          <TextField
            label="Key"
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
