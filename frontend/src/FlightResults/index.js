import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './flightresults.css';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class FlightResults extends React.Component {
  render(){
  const { classes, searchResults } = this.props;

  return (
    <Paper className={classes.root}>
      <label> Please select flight from below </label>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Depart City</TableCell>
            <TableCell >Departure State </TableCell>
            <TableCell >Departure Time</TableCell>
            <TableCell >Arrival City</TableCell>
            <TableCell >Arrival State</TableCell>
            <TableCell >Arrival Time</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >Book</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((eachResult, index) => {
            return (
              <TableRow key={`${eachResult.fields.depart_city}-${eachResult.fields.depart_datetime}-${index}`}>
                <TableCell component="th" scope="row">
                  {eachResult.fields.depart_city}
                </TableCell>
                <TableCell >{eachResult.fields.depart_state}</TableCell>
                <TableCell >{eachResult.fields.depart_datetime}</TableCell>
                <TableCell >{eachResult.fields.arrive_city}</TableCell>
                <TableCell >{eachResult.fields.arrive_state}</TableCell>
                <TableCell >{eachResult.fields.arrive_datetime}</TableCell>
                <TableCell >{eachResult.fields.price}</TableCell>
                <TableCell >
                  <div className="userFormGroup">
                    <input type="button" name="submit" id="submit" value="Book Flight"
                     className="SubmitButton"
                      onClick={() => { this.bookFlight(); }} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
 }
}

FlightResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightResults);
