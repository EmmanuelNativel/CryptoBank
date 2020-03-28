import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CardHeader,
  Grid
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CardForm from "./CardForm/CardForm";
import CardResultPanel from "./CardResultPanel/CardResultPanel";

const useStyles = makeStyles(theme => ({
  properties: {
    backgroundColor: theme.palette.primary.light
  },
  card: {
    height: "80vh",
    overflow: "scroll",
    backgroundColor: "#DDD"
  },
  primaryLightColor: {
    color: theme.palette.primary.light
  },
  blueButton: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText
    }
  }
}));

export default function CardItem({ data }) {
  const classes = useStyles();
  const titleTypoProps = {
    variant: "subtitle1",
    component: "h3",
    color: "secondary"
  };

  const [key, setKey] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [text, setText] = useState("");

  const handleKeyChange = e => {
    setKey(e.target.value);
  };
  const handleTextChange = e => {
    setText(e.target.value);
  };
  const handleIsDecryptingChange = e => {
    setIsDecrypting(e.target.checked);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={data.name}
        subheader={data.subtitle}
        titleTypographyProps={titleTypoProps}
      />
      <CardResultPanel text={text} />
      <CardActions className={classes.properties}>
        <Grid container spacing={1}>
        {data.properties.map(p => (
          <Grid item>
          <Chip
            icon={
              <FiberManualRecordIcon
                fontSize="small"
                className={classes.primaryLightColor}
              />
            }
            size="medium"
            label={p}
            key={data.name + p}
          />
          </Grid>
        ))}
        </Grid>
      </CardActions>
      <CardContent>
        <CardForm
          keyValue={key}
          text={text}
          isDecrypting={isDecrypting}
          onKeyChange={handleKeyChange}
          onTextChange={handleTextChange}
          onIsDecryptingChange={handleIsDecryptingChange}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" variant="contained">
          {isDecrypting ? "Decrypt" : "Encrypt"}
        </Button>
        <Button
          size="small"
          color="secondary"
          variant="contained"
          className={classes.blueButton}
          component="a"
          href={data.link}
        >
          Learn more
        </Button>
      </CardActions>
    </Card>
  );
}
