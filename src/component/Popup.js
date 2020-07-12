import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 500,
    justifyContent: "center",
    display: "flex",
  },
  media: {
    height: 300,
    width: 300,
  },
});

function Popup({ selected, closePopup }) {
  const classes = useStyles();
  const open = true;
  const body = (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={selected.Poster}
          title={selected.Title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {selected.Title}
            <Typography variant="span"> ({selected.Year}) </Typography>
          </Typography>
          <Typography variant="body" component="p">
            Rating: {selected.imdbRating}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {selected.Plot}
          </Typography>
          <Button onClick={closePopup} color="secondary">
            Close
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={closePopup}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}

export default Popup;
