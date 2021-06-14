import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import Button from '@material-ui/core/Button';

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
  }
});

function CustomTable({ classes, columns, rows, deleteComplain}) {

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column)=> (
              <StyledTableCell align="left" key={column}>{column}</StyledTableCell>
            ))}
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.date}>
              <StyledTableCell align="left">{row.userName}</StyledTableCell>
              <StyledTableCell align="left">{row.department}</StyledTableCell>
              <StyledTableCell align="left">{row.description}</StyledTableCell>
              <StyledTableCell align="left">{row.complaintType}</StyledTableCell>
              <StyledTableCell align="left">{row.date}</StyledTableCell>
              <StyledTableCell align="left">{row.state}</StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                <div className={classes.root}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        className={`${classes.button} ${classes.deleteTheme}`}
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteComplain(row)}
                      >
                        Borrar
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                          variant="contained"
                          className={`${classes.button} ${classes.updateTheme}`}
                          startIcon={<CreateIcon />}
                        >
                        Editar
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withStyles(styles)(CustomTable);