import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import './flight.css';
import FlightResults from '../FlightResults';

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


class Flight extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      from: '',
      to: '',
      date: '',
      searchResults: null,
      returndate: '',
      passengers: 0,
      bookingInputs: {
        date: '',
         to: '',
          from: '',
           returndate: '', passengers:0
      },
      // from: 'austin',
      // to: 'houston',
      // date: '2018-10-30',
      // searchResults: null,
      // returndate: '2018-11-02',
      // passengers: 1,
      // bookingInputs: {
      //   date: '',
      //    to: '',
      //     from: '',
      //      returndate: '', passengers:0
      // },
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
    const { date, to, from, returndate, passengers } = this.state;
    //console.log(date, to, from, returndate, passengers);
    if (date && to && from){
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
    }else {
      alert('Please enter values');
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
            <input type="button" name="submit" id="submit" value="Find Flights" className="SubmitButton" onClick={this.getResults} />
          </div>
        </form>
        <div className="flightDetails">
          {(this.state.searchResults && this.state.searchResults.length > 0) && (<FlightResults
            searchResults={this.state.searchResults}
            bookingInputs={this.state.bookingInputs}
            userDetails={this.props.userDetails}
            disableItemBooking={this.props.disableItemBooking}
          />)}
          {((this.state.searchResults !== null) && (this.state.searchResults.length === 0)) && (<p> No results found. Please change your search data.</p>)}
          {(this.state.searchResults === null) && (<p> Please enter search values</p>)}
        </div>

        </div>
    );
  };
}


Flight.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Flight);
