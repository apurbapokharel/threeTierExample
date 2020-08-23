import React, { useState, useEffect, createRef, useRef } from 'react'
import ReactDOM from 'react-dom'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Input, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { postReq } from './Apicaller'
import randomWords from 'random-words'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1200,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    button: {
      margin: theme.spacing(1),
    },
    }));

export default function Create() {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    
  }, []);

  const generateRandom = async () => {
    console.log("random called");
    var data = [];
    let i;
    for(i=0; i<2; i++){
        data.push({"title":randomWords().toString(), "description":randomWords().toString()});
    }
    postReq(data)
    .then(() => ReactDOM.render(<>success</>, document.getElementById("postStatus")))
    .catch(error => ReactDOM.render(<>failed</>, document.getElementById("postStatus")));
};

  const postForm = (title, description) => {
    var data=[{"title":title, "description":description}];
    setTitle('');
    setDescription('');
    postReq(data)
    .then(() => ReactDOM.render(<>success</>, document.getElementById("postStatus")))
    .catch(error => ReactDOM.render(<>failed</>, document.getElementById("postStatus")));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActions disableSpacing>
        CREATE
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <p id="postStatus"></p>
        </CardContent>
        <CardContent>
            <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={generateRandom}>Random Upload</Button>
            <br/>    
        </CardContent>
        <CardContent >
          <form  onSubmit={(event) => {
            event.preventDefault();
            postForm(title, description);
          }}>
            <TextField value={title} id="title" label="String" type="text" onChange={e => setTitle(e.target.value)} required/>
            &nbsp;
            <TextField value={description} id="description" label="Description" type="text" onChange={e => setDescription(e.target.value)}  required/>
            <Button variant="contained" color="default" className={classes.button} startIcon={<CloudUploadIcon /> }  type="submit"> Upload </Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

