import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Chip,
  CardHeader,
  Grid
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CardResultPanel from "./CardResultPanel/CardResultPanel";
import AlgoManager from "./AlgoManager";

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
  const [result, setResult] = useState("");

  const handleKeyChange = e => {
    setKey(e.target.value);
  };
  const handleTextChange = e => {
    setText(e.target.value);
  };
  const handleIsDecryptingChange = e => {
    setIsDecrypting(e.target.checked);
  };
  const handleResult = val => {
    console.log("HANDLE RESULT", val);
    setResult(val);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={data.name}
        subheader={data.subtitle}
        titleTypographyProps={titleTypoProps}
      />
      <CardResultPanel text={text} result={result}/>
      <CardActions className={classes.properties}>
        <Grid container spacing={1}>
          {data.properties.map(p => (
            <Grid item key={data.name + p}>
              <Chip
                icon={
                  <FiberManualRecordIcon
                    fontSize="small"
                    className={classes.primaryLightColor}
                  />
                }
                size="medium"
                label={p}
              />
            </Grid>
          ))}
        </Grid>
      </CardActions>
      <CardContent>
        {/*
        Mettre un controlleur qui attribura le bon composant (formulaire en fonction de l'id). 
        --> Un switch qui renvoi un composant avec passage des props. 
        --> Le Cryptage/Décryptage se fera dans le composant formulaire directement, 
        ce qui va permettre de gérer le type des données entrées et de personnaliser le 
        formulaire en fonction de l'algorithme traité.  
       
        <CardForm
          data={data}
          keyValue={key}
          text={text}
          isDecrypting={isDecrypting}
          onKeyChange={handleKeyChange}
          onTextChange={handleTextChange}
          onIsDecryptingChange={handleIsDecryptingChange}
        />
         */}
        <AlgoManager
          data={data}
          keyValue={key}
          text={text}
          isDecrypting={isDecrypting}
          onKeyChange={handleKeyChange}
          onTextChange={handleTextChange}
          onIsDecryptingChange={handleIsDecryptingChange}
          onResult={handleResult}
        />
      </CardContent>
    </Card>
  );
}
