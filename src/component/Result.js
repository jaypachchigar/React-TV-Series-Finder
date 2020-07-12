import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 400,
    padding: 30,
  },
  media: {
    height: 250,
  },
});

function Result({ result, openPopup }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => openPopup(result.imdbID)}>
        <CardMedia
          className={classes.media}
          image={result.Poster}
          title={result.Title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {result.Title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Result;
