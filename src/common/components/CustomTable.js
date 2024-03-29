import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import { compose } from 'redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const lightColor = '#009be5';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: lightColor,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const styles = (theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(0),
  },
  updateTheme: {
    backgroundColor: 'rgba(94, 222, 78, 0.7)',
    '&:hover':{
      backgroundColor: 'rgba(94, 222, 78, 0.7)'
    }

  },
  deleteTheme: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    '&:hover':{
      backgroundColor: 'rgba(255, 0, 0, 0.7)'
    }
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  searchBar: {
    marginBottom: 30,  
    borderRadius: 50,
  },
  paper: {
    borderRadius: 50,
  }
});

function CustomTable({ classes, columns, rows, deleteRequest, addButtonText, history, redirect, editRedirect, NotFoundMessage, response, showButton }) {
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              {!response &&
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.addUser}
                    onClick={() => history.push(redirect)}
                  >
                    {addButtonText}
                  </Button>
               </Grid>
              }
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column)=> (
                <StyledTableCell align="left" key={column}>{column}</StyledTableCell>
              ))}
              {showButton &&
                <StyledTableCell align="left"></StyledTableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              let dataRow = [];
              row.forEach((value, key) => {
                if(key !== 'id'){
                  dataRow.push(
                    <StyledTableCell align="left" key={value}>{value}</StyledTableCell>
                  )
                }
              });
              return (
                <StyledTableRow key={row.get('id')}>
                    {dataRow.map((val) => val)}
                  {showButton && 
                    <StyledTableCell align="left">
                      <div className={classes.root}>
                        <Grid container>
                          {response &&
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                className={`${classes.button} ${classes.updateTheme}`}
                                startIcon={<AddIcon />}
                                onClick={() => history.push(editRedirect + `/${row.get('id')}`)}
                              >
                                Responder
                              </Button>
                            </Grid>
                          }
                          {!response &&
                            <React.Fragment>
                              <Grid item xs={6}>
                                  <Button
                                    variant="contained"
                                    className={`${classes.button} ${classes.deleteTheme}`}
                                    startIcon={<DeleteIcon />}
                                    onClick={() => deleteRequest(row.get('id'))}
                                  >
                                    Borrar
                                  </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    className={`${classes.button} ${classes.updateTheme}`}
                                    startIcon={<CreateIcon />}
                                    onClick={() => history.push(editRedirect + `/${row.get('id')}`)}
                                  >
                                  Editar
                                </Button>
                              </Grid>
                          </React.Fragment>
                          }
                        </Grid>
                      </div>
                    </StyledTableCell>
                  }
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
        {rows.length <= 0 && 
          <div className={classes.contentWrapper}>
            <Typography color="textSecondary" align="center">
              {NotFoundMessage}
            </Typography>
          </div>
        }
      </TableContainer>
    </React.Fragment>
  );
}

CustomTable.propTypes = {
  showButton: PropTypes.bool
}

CustomTable.defaultProps = {
  showButton: true,
}

export default compose(withRouter, withStyles(styles))(CustomTable);