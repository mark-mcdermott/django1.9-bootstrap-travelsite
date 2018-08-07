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
import './deals.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    color: '#fff',
  },
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }
});


class Deals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      from: '',
      to: '',
      date: '',
      returndate: '',
      formPrice: 0,
      toPrice: 0,
      searchStatus: false,
    };
  }
  componentDidMount() {
    // this.getResults();
  }

  bookFlight = (flightDetails) => {
    const { user } = this.props;
    console.log(flightDetails);
    var bodyFormData = new FormData();
    bodyFormData.set('cust_name', 'Mark McDermott');
    bodyFormData.set('airline_name', 'Delta');
    bodyFormData.set('credit_type', 'Visa');
    bodyFormData.set('credit_name', 'Mark McDermott');
    bodyFormData.set('credit_number', '1234567890123456');
    bodyFormData.set('credit_expiration', '2018-11-30 11:01');
    bodyFormData.set('credit_security', '123');
    bodyFormData.set('depart_city', flightDetails.depart_city);
    bodyFormData.set('depart_state', flightDetails.depart_state);
    bodyFormData.set('depart_datetime', flightDetails.depart_datetime);
    bodyFormData.set('arrive_city', flightDetails.arrive_city);
    bodyFormData.set('arrive_state', flightDetails.arrive_state);
    bodyFormData.set('arrive_datetime', flightDetails.arrive_datetime);
    bodyFormData.set('price_high', flightDetails.price_high);
    bodyFormData.set('hotel_name', flightDetails.hotel_name);
    bodyFormData.set('hotel_street', flightDetails.hotel_street);
    bodyFormData.set('hotel_city', flightDetails.hotel_city);
    bodyFormData.set('hotel_state', flightDetails.hotel_state);
    bodyFormData.set('hotel_zip', flightDetails.hotel_zip);
    bodyFormData.set('price_low', flightDetails.price_low);
    axios({
      method: 'post',
      url: 'http://localhost:8000/deals-api',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
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


  fromChange = event => {
    this.setState({ from: event.target.value });
  };

  dateChange = event => {
    this.setState({ date: event.target.value });
  };

  returnDateChange = event => {
    this.setState({ returndate: event.target.value });
  };

  formPriceChange = event => {
    this.setState({ formPrice: event.target.value });
  };

  toPriceChange = event => {
    this.setState({ toPrice: event.target.value });
  };

  toChange = event => {
    this.setState({ to: event.target.value });
  };

  getResults = () => {
    const { from, to, date, returndate, formPrice, toPrice } = this.state;
    if(from && to && date && returndate) {
    // Make a request for a user with a given ID
   const getURL = `http://localhost:8000/deals-api?source=${from}&destination=${to}&fromdate=${date}&todate=${returndate}&lowprice=${formPrice}&highprice=${toPrice}`;
    axios.get(getURL)
      .then((response) => {
        this.setState({
          searchResults: JSON.parse(response.data),
          searchStatus: true,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
    } else {
      alert("Please enter values");
    }
  }
  render() {
    const { classes } = this.props;

    const { searchResults } = this.state;
    const { bookingStatus, bookingResult } = this.state;
    return (
      <div className="tabContent dealsContent">
        <form className="userFormFlight userFormDeals">
          <div className="groupOne">
            <div className="userFormGroup">
              <label htmlFor="date" className="formLabel">Source:</label>
              <div className="formField">
                <input type="text" id="location" className="formControl" placeholder="From Location" onChange={this.fromChange} />
              </div>
            </div>
            <div className="userFormGroup">
              <label htmlFor="date" className="formLabel">Destination:</label>
              <div className="formField">
                <input type="text" id="location" className="formControl" placeholder="To Location" onChange={this.toChange} />
              </div>
            </div>
            <div className="userFormGroup">
              <label htmlFor="date" className="formLabel">Departure Date:</label>
              <div className="formField">
                <input type="date" id="location" className="formControl" placeholder="From Date" onChange={this.dateChange} />
              </div>
            </div>
            <div className="userFormGroup">
              <label htmlFor="date" className="formLabel">Return Date:</label>
              <div className="formField">
                <input type="date" id="location" className="formControl" placeholder="TO Date" onChange={this.returnDateChange} />
              </div>
            </div>
          </div>
          <div className="groupTwo">
            <div className="userFormGroup passengers">
              <label htmlFor="date" className="formLabel">Price From:</label>
              <div className="formField">
                <input type="number" id="location" className="formControl" placeholder="From Price" onChange={this.formPriceChange} />
              </div>
            </div>
            <div className="userFormGroup passengers">
              <label htmlFor="date" className="formLabel">Price To:</label>
              <div className="formField">
                <input type="number" id="location" className="formControl" placeholder="To Price" onChange={this.toPriceChange} />
              </div>
            </div>
            <div className="userFormGroup">
              <input type="button" name="submit" id="submit" value="Find Deals" className="SubmitButton" onClick={this.getResults} />
            </div>
          </div>
        </form>
        <Paper className={classes.root}>
          <div className="dealsDetails">
            <label> Available Deals </label>
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
                  <TableCell >Price Low</TableCell>
                  <TableCell >Price High</TableCell>
                  <TableCell >Hotel Name</TableCell>
                  <TableCell >Hotel Street</TableCell>
                  <TableCell >Hotel City</TableCell>
                  <TableCell >Hotel State</TableCell>
                  <TableCell >Hotel Zip</TableCell>
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
                      <TableCell >${eachResult.fields.price_low}</TableCell>
                      <TableCell >${eachResult.fields.price_high}</TableCell>
                      <TableCell >{eachResult.fields.hotel_name}</TableCell>
                      <TableCell >{eachResult.fields.hotel_street}</TableCell>
                      <TableCell >{eachResult.fields.hotel_city}</TableCell>
                      <TableCell >{eachResult.fields.hotel_state}</TableCell>
                      <TableCell >{eachResult.fields.hotel_zip}</TableCell>
                      <TableCell >
                        <div className="userFormGroup">
                          <input type="button" name="submit" id="submit" value="Book"
                            className="SubmitButton"
                            onClick={() => this.bookFlight(eachResult.fields)} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {this.state.searchStatus && <p className="searchStatusMessage">No results found </p>}
          </div>
        </Paper>
      </div>
    );
  }
}

Deals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Deals);

