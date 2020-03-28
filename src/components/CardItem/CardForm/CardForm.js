import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Switch, FormLabel, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden"
  },
  centered: {
    textAlign: "center"
  }
}));

export default function CardForm({ keyValue, text, isDecrypting, onKeyChange, onTextChange, onIsDecryptingChange}) {
  const classes = useStyles();
  
  return (
    <form onSubmit={""} className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item className={classes.centered}>
          <FormLabel style={{ color: "black" }}>Encrypt</FormLabel>
          <Switch
            color="disabled"
            checked={isDecrypting}
            onChange={onIsDecryptingChange}
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
            value={keyValue}
            onChange={onKeyChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label={isDecrypting ? "Text to decrypt": "Text to encrypt"}
            multiline
            rows="6"
            variant="outlined"
            fullWidth
            required
            color="primary"
            style={{height: "10rem"}}
            value={text}
            onChange={onTextChange}
          />
        </Grid>
      </Grid>
    </form>
  );
}
