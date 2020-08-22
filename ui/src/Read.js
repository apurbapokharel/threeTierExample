import React, { useEffect, useState } from 'react';
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
import SearchIcon from '@material-ui/icons/Search';
import Table1 from './Table'

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
    }
    }));

export default function Read() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [itemToSearch, setItemToSearch] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActions disableSpacing>
        READ
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
          <form onSubmit={(event) => {
            event.preventDefault();
            setItemToSearch(searchItem);
          }}>
          <TextField value={searchItem} id="seachItem" label="Search via Id" type="text" onChange={e => setSearchItem(e.target.value)} />
          <Button variant="contained" color="default" className={classes.button} startIcon={<SearchIcon /> }  type="submit"> Search </Button>
          </form>
          <Table1 searchItem={itemToSearch}/>
        </CardContent>
      </Collapse>
    </Card>
  );
}

