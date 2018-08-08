import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import './HotelFlights.css';
import FlightResults from '../FlightResults';
import HotelResults from '../HotelResults';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import Paper from '@material-ui/core/Paper';

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
});


class ShowConfirmationSectionClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingResult: '',
      bookingStatus: false,
    }
  }

  handleUserMilesSelected = () => {
    const { userMiles } = this.state;
    this.setState({
      userMiles: !userMiles,
    });
  }

  bookFlight = () => {
    const { userDetails , selectedFlight, selectedHotel} = this.props;
    // const {  } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.set('cust_name', userDetails.name_first);
    bodyFormData.set('airline_name', 'Delta');
    bodyFormData.set('credit_type', 'Visa');
    bodyFormData.set('credit_name', userDetails.credit_name);
    bodyFormData.set('credit_number', '1234567890123456');
    bodyFormData.set('credit_expiration', userDetails.credit_expiration);
    bodyFormData.set('credit_security', '123');
    bodyFormData.set('depart_city', selectedFlight.depart_city);
    bodyFormData.set('depart_state', selectedFlight.depart_state);
    bodyFormData.set('depart_datetime', selectedFlight.depart_datetime);
    bodyFormData.set('arrive_city', selectedFlight.arrive_city);
    bodyFormData.set('arrive_state', selectedFlight.arrive_state);
    bodyFormData.set('arrive_datetime', selectedFlight.arrive_datetime);
    bodyFormData.set('num_passengers', 1);
    bodyFormData.set('mileage', userDetails.user_miles);
    axios({
      method: 'post',
      url: 'http://localhost:8000/booking-api',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then((response) => {
        //console.log(response);
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

    var postFormData = new FormData();
    postFormData.set('cust_name', userDetails.name_first);
    postFormData.set('credit_type', 'Visa');
    postFormData.set('credit_name', userDetails.credit_name);
    postFormData.set('credit_number', '1234567890123456');
    postFormData.set('credit_expiration', userDetails.credit_expiration);
    postFormData.set('credit_security', '123');
    postFormData.set('num_rooms', '1');
    postFormData.set('num_occupant', '1');
    postFormData.set('hotel_name', selectedHotel.name);
    postFormData.set('hotel_street', selectedHotel.street);
    postFormData.set('hotel_city', selectedHotel.city);
    postFormData.set('hotel_state', selectedHotel.state);
    postFormData.set('hotel_zip', selectedHotel.zip);
    postFormData.set('hotel_price', selectedHotel.price);
    postFormData.set('arrive_datetime', '2018-11-30 13:01');
    postFormData.set('depart_datetime', '2018-11-30 13:01');

 

     axios({
       method: 'post',
       url: 'http://localhost:8000/reservation-api',
       data: postFormData,
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
  render() {
    Moment.locale('en');
    var dt = '2016-05-02T00:00:00';
    const { classes, selectedFlight, selectedHotel, userDetails } = this.props;
    const { bookingStatus, bookingResult } = this.state;
    const bull = <span className={classes.bullet}>•</span>;
    let totalPrice = parseInt(selectedFlight.price) + parseInt(selectedHotel.price);
    totalPrice -= (totalPrice * 20 / 100);
    totalPrice += (totalPrice * 15 / 100);
    const creditCard = "" + userDetails.credit_number;
    return (
      <div className="confirmationSection" id="confirmationSection">
        <Paper>
          <div className="reviewFlights">
          <List component="nav" className="reviewFlightsEach">
                <ListItem button>
                  <Typography className={`reviewFlightHeading ${classes.title}`} color="textPrimary">
                    Flight Details:
                </Typography>
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Depart City:
                </Typography>
                  <ListItemText primary={selectedFlight.depart_city} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Depart State:
                </Typography>
                  <ListItemText primary={selectedFlight.depart_state} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Depart Date:
                </Typography>
                  <ListItemText primary={Moment(selectedFlight.depart_datetime).format('MM/DD/YYYY')} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Depart Time:
                </Typography>
                  <ListItemText primary={Moment(selectedFlight.depart_datetime).format('h:mm a')} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Arrival City:
                </Typography>
                  <ListItemText primary={selectedFlight.arrive_city} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Arrival State:
                </Typography>
                  <ListItemText primary={selectedFlight.arrive_state} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Arrival Date:
                </Typography>
                  <ListItemText primary={Moment(selectedFlight.arrive_datetime).format('MM/DD/YYYY')} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Arrival Time:
                </Typography>
                  <ListItemText primary={Moment(selectedFlight.arrive_datetime).format('h:mm a')} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Price:
                </Typography>
                  <ListItemText primary={selectedFlight.price} />
                </ListItem>
                <ListItem button>
                  <Typography className={`reviewFlightHeading ${classes.title}`} color="textPrimary">
                    Hotel Details:
                </Typography>
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Hotel Name:
                </Typography>
                  <ListItemText primary={selectedHotel.name} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Hotel Street:
                </Typography>
                  <ListItemText primary={selectedHotel.street} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Hotel Price:
                </Typography>
                  <ListItemText primary={selectedHotel.price} />
                </ListItem>
                
              </List>
          </div>
          <List component="nav" className="reviewFlightsUser">
            <ListItem button>
              <Typography className={`reviewFlightHeading ${classes.title}`} color="textPrimary">
                Total Price(Including 20% Discount and 15% taxes):
                  </Typography>
              <ListItemText primary={totalPrice} />
            </ListItem>
            <ListItem button>
              <Typography className={`reviewFlightHeading ${classes.title}`} color="textPrimary">
                Default Payment Card Number:
                  </Typography>
              <ListItemText primary={creditCard.replace(/\d(?=\d{4})/g, "*")} />
            </ListItem>
          </List>
          <div className="userFormGroup">
            <input type="button" name="submit" id="submit" value="Confirm your Booking"
              className="SubmitButton"
              onClick={() => { this.bookFlight(); }} />
          </div>
          <p className="bookingResponse">{bookingStatus && bookingResult}</p>
        </Paper>
      </div>
    )
  }
}

const ShowConfirmationSection = withStyles(styles)(ShowConfirmationSectionClass);


class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // from: '',
      // to: '',
      // date: '',
      // searchResults: null,
      // returndate: '',
      // passengers: 0,
      // bookingInputs: {
      //   date: '',
      //    to: '',
      //     from: '',
      //      returndate: '', passengers:0
      // },
      from: 'Philadelphia',
      to: 'Dallas',
      date: '2018-12-30',
      searchResults: null,
      searchHotelResults: [],
      returndate: '2019-01-01',
      passengers: 1,
      bookingInputs: {
        date: '',
        to: '',
        from: '',
        returndate: '', passengers: 0
      },
    };
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

  passengersChange = event => {
    this.setState({ passengers: event.target.value });
  };

  toChange = event => {
    this.setState({ to: event.target.value });
  };


  getResults = () => {
    this.getHotels();
    const { date, to, from, returndate, passengers } = this.state;
    //console.log(date, to, from, returndate, passengers);
    if (date && to && from) {
      // Make a request for a user with a given ID
      axios.get(`http://localhost:8000/flights-api?fromcity=${from}&tocity=${to}&date=${date}&returndate=${returndate}&passengers=${passengers}`)
        .then((response) => {
          // handle success
          //console.log(JSON.parse(response.data));

          this.setState({
            searchResults: JSON.parse(response.data),
            bookingInputs: {
              date, to, from, returndate, passengers
            }
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
      alert('Please enter values');
    }
  }

  getHotels = () => {
    const { date, to } = this.state;
    if (date && to) {
      // Make a request for a user with a given ID
      axios.get(`http://localhost:8000/hotels-api?city=${to}`)
        .then((response) => {
          // handle success
          console.log(response);
          this.setState({
            searchHotelResults: JSON.parse(response.data)
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
      alert('Please enter values');
    }
  }

  getSelectedFlight = (flight) => {
    console.log('called', flight);
     this.setState({
       selectedFlight: flight,
     });
  }

  getSelectedHotel = (hotel) => {
    console.log('called', hotel);
    this.setState({
      selectedHotel: hotel,
    });
  }

  showConfirmationSec = () => {
    const { selectedFlight, selectedHotel } = this.state;
    if (selectedFlight && selectedHotel) {
      this.setState({
        showConfirmationBox: true,
      }); 
    } else {
      alert("Please select Hotel & Flight");
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <form className="userFormFlight">
          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">Source:</label>
            <div className="formField">
              <input type="text" id="location" className="formControl" placeholder="Search Location" onChange={this.fromChange} />
            </div>
          </div>
          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">Destination:</label>
            <div className="formField">
              <input type="text" id="location" className="formControl" placeholder="Search Location" onChange={this.toChange} />
            </div>
          </div>
          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">Departure Date:</label>
            <div className="formField">
              <input type="date" id="location" className="formControl" placeholder="Search Location" onChange={this.dateChange} />
            </div>
          </div>
          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">Return Date:</label>
            <div className="formField">
              <input type="date" id="location" className="formControl" placeholder="Search Location" onChange={this.returnDateChange} />
            </div>
          </div>
          <div className="userFormGroup passengers">
            <label htmlFor="date" className="formLabel">Passengers:</label>
            <div className="formField">
              <input type="number" id="location" className="formControl" placeholder="Passengers" onChange={this.passengersChange} />
            </div>
          </div>
          <div className="userFormGroup">
            <input type="button" name="submit" id="submit" value="Find Flights & Hotels" className="SubmitButton" onClick={this.getResults} />
          </div>
        </form>
        <div className="flightDetails">
          {(this.state.searchResults && this.state.searchResults.length > 0) && (<FlightResults
            searchResults={this.state.searchResults}
            bookingInputs={this.state.bookingInputs}
            userDetails={this.props.userDetails}
            disableItemBooking
            getSelectedFlight={this.getSelectedFlight}
          />)}
          {((this.state.searchResults !== null) && (this.state.searchResults.length === 0)) && (<p> No Flight results found. Please change your search data.</p>)}
          {(this.state.searchResults === null) && (<p> Please enter search values</p>)}
        </div>
        <div className="hotelDetails hotelDetailsCommon">
        {(this.state.searchHotelResults && this.state.searchHotelResults.length > 0) && (<HotelResults
            searchResults={this.state.searchHotelResults}
            disableItemBooking
            getSelectedHotel={this.getSelectedHotel} />)}

         {/* {!this.props.disableItemBooking && (<div className="userFormGroup">
          <input type="button" name="submit" id="submit" value="Book Selected Flights"
            className="SubmitButton"
            onClick={() => { this.showConfirmationSec(); }} />
        </div>)}

        {showConfirmationBox && <ShowConfirmationSection
          selectedFlights={selectedFlights}
          bookingInputs={bookingInputs}
          userDetails={this.props.userDetails}
        />}    */}

        <div className="userFormGroup">
          <input type="button" name="submit" id="submit" value="Book Selected Flights"
            className="SubmitButton"
            onClick={() => { this.showConfirmationSec(); }} />
        </div>

        {this.state.showConfirmationBox && <ShowConfirmationSection
          selectedFlight={this.state.selectedFlight}
          selectedHotel={this.state.selectedHotel}
          userDetails={this.props.userDetails}
        />}
          
        </div>
      </div>
    );
  };
}


Flight.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Flight);
