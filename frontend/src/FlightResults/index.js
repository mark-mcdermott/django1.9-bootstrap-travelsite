import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
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
  constructor(props) {
    super(props);
    this.state = {
      bookingResult:'',
      bookingStatus: false,
    }
  }
  bookFlight = (flightDetails) => {
   const { user } = this.props;

    axios.post('http://localhost:8000/booking-api', {
      cust_name: 'Mark McDermott',
      airline_name: 'Delta',
      credit_type: 'Visa',
      credit_name: 'Mark McDermott',
      credit_number: 1234567890123456,
      credit_expiration: '2018-11-30 11:01',
      credit_security: 123,
      depart_city: 'Austin',
      depart_state: 'TX',
      depart_datetime: '2018-11-30 11:01',
      arrive_city: 'Dallas',
      arrive_state: 'TX',
      arrive_datetime: '2018-11-30 11:01',
      num_passengers: 1,
      mileage: 100,
    })
    .then((response) => {
      console.log(response);
      this.setState({
        bookingResult: response,
        bookingStatus: true,
      })
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        bookingResult: 'Booking failed. Please check your details',
        bookingStatus: true,
      })
    });
  }
  render(){
  const { classes, searchResults } = this.props;
  const { bookingStatus, bookingResult } = this.state;
  return (
    <Paper className={classes.root}>
      <label> Please select flight from below </label>
      <p className="bookingResponse">{bookingStatus && bookingResult}</p>
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
                      onClick={(eachResult) => { this.bookFlight(eachResult); }} />
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
