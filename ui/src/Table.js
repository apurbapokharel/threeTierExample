import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getReq, deleteReq } from './Apicaller';
import { useSelector, useDispatch } from 'react-redux';
import { changeRenderer } from './action/index';
import Modal from './Modal';

const Ttable = (props) => {

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [tableData, setTableData] = useState([]);
  // const reduxForceRerender = useSelector(state => state.forceRerender);
  // const [forceRerender, setForceRerender] = useState(reduxForceRerender);
  // const dispatch = useDispatch();
  const [forceRerender, setForceRerender] = useState(false);

 useEffect(() => {
    
    const fetchAPI = async() => {
        await getReq(props.searchItem)
        .then((value) => {
          setTableData(value);
        })
        .catch(() => {
          console.log("error");
          setTableData([]);
          ReactDOM.render(<>Table Data Not Found</>, document.getElementById("tableTitle"));
        })
        setLoadingStatus(false);
        setPage(0);
        setForceRerender(false);
    }
  fetchAPI();
  }, [props.searchItem || forceRerender]);

  // useEffect(() => store.subscribe(() => {
  //   const jsonValue = store.getState().jsonVal.jsonVal
  //   setJsonVal(jsonValue)
  //   })
  //  , [store]); 
  //need to find a way to use redux state chages to trigger useeffect!

  function createData(id, title, description, dateAdded) {
    return { id, title, description, dateAdded};
  }

  const rows = []
  tableData.map((value, key) => {
    var date = new Date(value.date).toLocaleDateString().concat(" ").concat(new Date(value.date).toLocaleTimeString());
    rows.push(createData( value._id, value.title, value.description, date))
  })

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'date', numeric: false, disablePadding: true, label: 'Date Created' },
  ];

  if(props.deleteRow == 1){
    headCells.push({ id: 'delete', numeric: false, disablePadding: true, label: 'Delete' },
    )
  }

  if(props.updateRow == 1){
    headCells.push({ id: 'update', numeric: false, disablePadding: true, label: 'Update' },
    )
  }

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"> S.N </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
      textAlign: 'center'
    },
  }));

  function EnhancedTableToolbar () {
    const classes = useToolbarStyles();
    return (
      <Toolbar className={clsx(classes.root)}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Table Data
        </Typography>
      </Toolbar>
    );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const deleteCell = async (id) => {
    await deleteReq(id);
    setForceRerender(true);
    // dispatch(changeRenderer());
  };

  const updateRow = async (id, title, description) => {
    ReactDOM.render(<Modal id={id} defaultTitle={title} defaultDescription={description} />, document.getElementById("modal"));
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div id="modal"></div>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            {
              loadingStatus ? 
                <Typography>Fetching..</Typography>
              : 
                <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (                 
                      <TableRow>
                        <TableCell padding="checkbox">{index + 1 }</TableCell>       
                        <TableCell component="th" id={labelId} scope="row" padding="none">{row.id}</TableCell>
                        <TableCell >{row.title}</TableCell>
                        <TableCell >{row.description}</TableCell>
                        <TableCell >{row.dateAdded}</TableCell>
                        {/* //ES5 of doing this */}
                        {/* {props.deleteRow == 1 ? <TableCell onClick={deleteCell.bind(this, row.id)}>{<DeleteIcon />}</TableCell>: null}  */}
                        {props.deleteRow == 1 ? <TableCell onClick={() => {deleteCell(row.id)}}>{<DeleteIcon />}</TableCell>: null}
                        {props.updateRow == 1 ? <TableCell onClick={() => {updateRow(row.id, row.title, row.description)}}>{<EditIcon />}</TableCell>: null}
                      </TableRow>
                    );                  
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            } 
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
export default Ttable;