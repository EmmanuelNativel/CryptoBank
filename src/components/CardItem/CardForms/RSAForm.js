/* eslint-disable no-undef */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Switch,
  FormLabel,
  Grid,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";

import {
  generateKey,
  encrypt,
  decrypt,
  test,
  getRandomPrimeNumber,
} from "../../../scripts/RSA";

const DEFAULT = 0;
const KEY_GENERATION = 1;
const MAIN = 2;

const useStyles = makeStyles((theme) => ({
  root: {
    // overflow: "hidden"
  },
  centered: {
    textAlign: "center",
  },
  blueButton: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
  whiteTextColor: {
    color: "white",
  },
}));

export default function TranspoRectForm({
  data,
  text,
  onTextChange,
  onResult,
}) {
  const classes = useStyles();
  const [formState, setFormState] = useState(DEFAULT);
  const [keys, setKeys] = useState({ public: [], private: [] });
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [p, setP] = useState(0);
  const [q, setQ] = useState(0);
  const [error, setError] = useState({ statut: false, text: "" });
  const [e, setE] = useState("");
  const [d, setD] = useState("");
  const [n, setN] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const handleAction = (event) => {
    if (isDecrypting) {
      const dVal = BigInt(d);
      const nVal = BigInt(n);
      const key = [dVal, nVal];
      const result = decrypt(text, key);
      onResult(result);
    } else {
      const eVal = BigInt(e);
      const nVal = BigInt(n);
      const key = [eVal, nVal];
      const result = encrypt(text, key);
      onResult(result);
    }
  };

  const getForm = (statut) => {
    switch (statut) {
      case DEFAULT:
        return defaultForm();
      case KEY_GENERATION:
        return keyGenerationForm();
      case MAIN:
        return mainForm();
      default:
        break;
    }
  };

  const generatePQ = () => {
    const pVal = getRandomPrimeNumber();
    const qVal = getRandomPrimeNumber();
    setP(Number(pVal));
    setQ(Number(qVal));
  };

  const getKeys = () => {
    try {
      setError({ statut: false, text: "" });
      const [publicKey, privateKey] = generateKey(p, q);
      setKeys({ public: publicKey, private: privateKey });
      setD(privateKey[0].toString());
      setN(privateKey[1].toString());
      setE(publicKey[0].toString());
      if (publicKey[1] > 999999)
        setInfoMsg(
          "Decrypting time will be long, please, choose p and q smaller because the browser will maybe expire before."
        );
      else if (publicKey[1] > 99999)
        setInfoMsg(
          "Decrypting time start to be long, you should choose p and q smaller."
        );
      else setInfoMsg("Decrypting time should be okay !");
    } catch (e) {
      setError({ statut: true, text: e.message });
      setInfoMsg("");
    }
  };

  const defaultForm = () => (
    <Grid
      container
      direction="column"
      spacing={4}
      alignContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h4" component="h5" color="secondary">
          Do you need a RSA key ?
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="secondary"
          onClick={(e) => setFormState(KEY_GENERATION)}
        >
          Yes, generate a key
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          onClick={(e) => setFormState(MAIN)}
        >
          No, I already have a key
        </Button>
      </Grid>
      <Grid item>
        <CardActions>
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
  );

  const keyGenerationForm = () => (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Typography variant="h4" component="h5" color="secondary">
          Enter two prime numbers
        </Typography>
      </Grid>
      <Grid item container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            type="Number"
            label="p"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            value={p}
            onChange={(e) => setP(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="Number"
            label="q"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid item align="center">
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={generatePQ}
        >
          Get random prime numbers
        </Button>
      </Grid>
      {infoMsg !== "" && (
        <Grid item align="center">
          <Typography variant="caption" component="p" color="error">
            {infoMsg}
          </Typography>
        </Grid>
      )}
      {!error.statut && keys.public.length > 0 && keys.private.length > 0 && (
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="body1" component="h5" color="secondary">
              Your public Key
            </Typography>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="e"
                value={keys.public[0].toString()}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="n"
                value={keys.public[1].toString()}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body1" component="h5" color="secondary">
              Your private Key
            </Typography>
          </Grid>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="d"
                value={keys.private[0].toString()}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="n"
                value={keys.private[1].toString()}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      {error.statut && (
        <Grid item align="center">
          <Typography component="p" color="error">
            {error.text}
          </Typography>
        </Grid>
      )}
      <Grid item>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={getKeys}
                fullWidth
              >
                Generate keys
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                className={classes.whiteTextColor}
                component="button"
                onClick={(e) => setFormState(DEFAULT)}
                fullWidth
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                className={classes.blueButton}
                component="a"
                href={data.link}
                target="_blank"
                fullWidth
              >
                Learn more
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Grid>
    </Grid>
  );

  const mainForm = () => (
    <Grid container direction="column" spacing={1}>
      <Grid item className={classes.centered}>
        <FormLabel style={{ color: "black" }}>Encrypt</FormLabel>
        <Switch
          color="default"
          checked={isDecrypting}
          onChange={(e) => setIsDecrypting(e.target.checked)}
        />
        <FormLabel style={{ color: "black" }}>Decrypt</FormLabel>
      </Grid>

      <Grid item>
        <Typography variant="body1" component="h5" color="secondary">
          {isDecrypting ? "Your private key" : "Your public key"}
        </Typography>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label={isDecrypting ? "d" : "e"}
            variant="outlined"
            required
            size="small"
            fullWidth
            color="primary"
            value={isDecrypting ? d : e}
            onChange={(e) =>
              isDecrypting ? setD(e.target.value) : setE(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="n"
            variant="outlined"
            required
            size="small"
            fullWidth
            color="primary"
            value={n}
            onChange={(e) => setN(e.target.value)}
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={handleAction}
                fullWidth
              >
                {isDecrypting ? "Decrypt" : "Encrypt"}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                className={classes.whiteTextColor}
                component="button"
                onClick={(e) => setFormState(DEFAULT)}
                fullWidth
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                className={classes.blueButton}
                component="a"
                href={data.link}
                target="_blank"
                fullWidth
              >
                Learn more
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Grid>
    </Grid>
  );

  return <form className={classes.root}>{getForm(formState)}</form>;
  //return <form className={classes.root}>{test()}</form>;
}
