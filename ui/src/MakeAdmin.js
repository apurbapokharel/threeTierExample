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
import { makeAdmin } from './Apicaller'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    }));

export default function MakeAdmin() {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [username, setUsername] = useState('');
  const [admin, setAdmin] = useState('');

  useEffect(() => {
    
  }, []);

  const postForm = (title, adminstatus) => {
    var data={"username":title, "isAdmin":adminstatus};
    makeAdmin(data)
    .then((val) => ReactDOM.render(<>{val}</>, document.getElementById("postStatus")))
    .catch((val) => ReactDOM.render(<>{val}</>, document.getElementById("postStatus")));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    setAdmin(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardActions disableSpacing>
        Make or Remove Admin
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
        <CardContent >
          <form onSubmit={(event) => {
            event.preventDefault();
            postForm(username, admin);
          }}>
            <TextField value={username} id="title" label="Username" type="text" onChange={e => setUsername(e.target.value)} required/>
            &nbsp;
            <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={admin}
            onChange={handleChange}
            className={classes.selectEmpty}
            required={true}
            >
            <MenuItem value={true}>Make</MenuItem>
            <MenuItem value={false}>Remove</MenuItem>
            </Select>
            <Button variant="contained" color="default" className={classes.button} startIcon={<CloudUploadIcon /> }  type="submit"> Upload </Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

