import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './hotelresults.css';
import axios from 'axios';

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

class HotelResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingResult:'',
      bookingStatus: false,
    }
  }

  bookHotel = (hotelDetails) => {
    
    const { user } = this.props;
    var bodyFormData = new FormData();
    bodyFormData.set('cust_name', 'Mark McDermott');
    bodyFormData.set('credit_type', 'Visa');
    bodyFormData.set('credit_name', 'Mark McDermott');
    bodyFormData.set('credit_number', '1234567890123456');
    bodyFormData.set('credit_expiration', '2018-11-30 11:01');
    bodyFormData.set('credit_security', '123');
    bodyFormData.set('num_rooms', '1');
    bodyFormData.set('num_occupant', '1');
    bodyFormData.set('hotel_name', 'test');
    bodyFormData.set('hotel_street', '123 street');
    bodyFormData.set('hotel_city', 'Austin');
    bodyFormData.set('hotel_state', 'TX');
    bodyFormData.set('hotel_zip', '12345');
    bodyFormData.set('hotel_price', '100');
    bodyFormData.set('arrive_datetime', '2018-11-30 13:01');
    bodyFormData.set('depart_datetime', '2018-11-30 13:01');
 
    /*cust_name: Mark
    credit_type: Visa
    credit_name: Mark
    credit_number: 1234
    credit_expiration: 2018-11-30 13:01
    credit_security: 123
    num_rooms: 1
    num_occupant: 1
    hotel_name: "test
    hotel_street: 123 street
    hotel_city: Austin
    hotel_state: TX
    hotel_zip: 12345
    hotel_price: 100
    arrive_datetime: 2018-11-30 13:01
    depart_datetime: 2018-11-30 13:01*/
  
    
    
 

     axios({
       method: 'post',
       url: 'http://localhost:8000/reservation-api',
       data: bodyFormData,
       config: { headers: {'Content-Type': 'multipart/form-data' }}
       })
     .then((response) => {
       console.log(response);
       this.setState({
         bookingResult: 'Booking completed successfully',
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
    <p className="bookingResponse">{bookingStatus && bookingResult}</p>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Hotel Name</TableCell>
            <TableCell numeric>City</TableCell>
            <TableCell numeric>Address</TableCell>
            <TableCell numeric>State</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >Book</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((eachResult, index) => {
            return (
              <TableRow key={`${eachResult.fields.depart_city}-${eachResult.fields.depart_datetime}-${index}`}>
                <TableCell component="th" scope="row">
                  {eachResult.fields.name}
                </TableCell>
                <TableCell >{eachResult.fields.city}</TableCell>
                <TableCell >{eachResult.fields.street}, {eachResult.fields.zip}</TableCell>
                <TableCell >{eachResult.fields.state}</TableCell>
                <TableCell >{eachResult.fields.price}</TableCell>
                <TableCell >
                  <div className="userFormGroup">
                    <input type="button" name="submit" id="submit" value="Book Hotel" className="SubmitButton"  
                    onClick={(eachResult) => { this.bookHotel(eachResult); }} />
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

HotelResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelResults);
