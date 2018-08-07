import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import './flightstatus.css';

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


class FlightStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightNumber: '',
      date: '',
      airline: '',
      searchResults: '',
      showError: false,
      errorMsg: '',
    };
  }

  flightNumberChange = event => {
    this.setState({ flightNumber: event.target.value });
  };

  dateChange = event => {
    this.setState({ date: event.target.value });
  };

  airlineChange = (event) => {
    this.setState({ airline: event.target.value });
  }



  getResults = () => {
    const { flightNumber, date, airline } = this.state;
    if (flightNumber && date) {
      // Make a request for a user with a given ID
      axios.get(`http://localhost:8000/get-flight-status-api?flight=${flightNumber}&date=${date}&airline=${airline}`)
        .then((response) => {
          // handle success
          console.log(response);
          this.setState({
            showError: false,
            searchResults: response.data
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
          this.setState({
            showError: true,
            errorMsg: 'Flight does not exists'
          });
        })
        .then(() => {
          // always executed
        });
    } else {
      alert('Please enter values');
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={this.props.className}>
        <form className="userForm">
          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">Flight Number:</label>
            <div className="formField">
              <input type="text" id="location" className="formControl" placeholder="Flight Number" onChange={this.flightNumberChange} />
            </div>
          </div>

          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">Airline Name:</label>
            <div className="formField">
              <input type="text" id="location" className="formControl" placeholder="Airline Name" onChange={this.airlineChange}/>
            </div>
          </div>
          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">Departure Date:</label>
            <div className="formField">
              <input type="date" id="location" className="formControl" placeholder="Departure Date" onChange={this.dateChange}/>
            </div>
          </div>
          <div className="userFormGroup">
            <input type="button" name="submit" id="submit" value="Find Status" className="SubmitButton" onClick={this.getResults} />
          </div>
        </form>
        <div className="flightDetails">
          {/* <label> Selected flight status is: </label> */}
          <p>{this.state.searchResults}</p>
          {this.state.showError && <p>{this.state.errorMsg}</p>}
        </div>
      </div>
    );
  };
}


FlightStatus.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightStatus);
