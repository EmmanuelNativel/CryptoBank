import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Switch,
  FormLabel,
  Grid,
  CardActions,
  Button
} from "@material-ui/core";

import { cesar } from "./../../../scripts/Cesar";

/**
 * TODO: Enlever le switch ?
 */

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

export default function CesarForm({
  data,
  keyValue,
  text,
  isDecrypting,
  onKeyChange,
  onTextChange,
  onIsDecryptingChange,
  onResult
}) {
  const classes = useStyles();

  const handleAction = e => {
    const result = cesar(text, parseInt(keyValue));
    onResult(result);
  };

  return (
    <form className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item className={classes.centered}>
          <FormLabel style={{ color: "black" }}>Encrypt</FormLabel>
          <Switch
            color="default"
            checked={isDecrypting}
            onChange={onIsDecryptingChange}
          />
          <FormLabel style={{ color: "black" }}>Decrypt</FormLabel>
        </Grid>
        <Grid item>
          <TextField
            type="number"
            label="Key"
            variant="outlined"
            fullWidth
            required
            color="primary"
            size="small"
            value={keyValue}
            onChange={onKeyChange}
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
