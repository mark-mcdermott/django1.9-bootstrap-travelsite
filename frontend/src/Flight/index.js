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
    };
  }

  fromChange = event => {
    this.setState({ from: event.target.value });
  };

  dateChange = event => {
    this.setState({ date: event.target.value });
  };

  toChange = event => {
    this.setState({ to: event.target.value });
  };


  getResults = () => {
    const { date, to, from } = this.state;
    console.log(date, to, from);
    if (date && to && from){
   // Make a request for a user with a given ID
    axios.get(`http://localhost:8000/flights-api?fromcity=${from}&tocity=${to}`)
      .then((response) => {
        // handle success
        console.log(JSON.parse(response.data));
        this.setState({
          searchResults: JSON.parse(response.data)
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
      <form className="userForm">
      <div className="userFormGroup">
        <label htmlFor="date" className="formLabel">From:</label>
          <div className="formField">
            <input type="text" id="location" className="formControl" placeholder="Search Location" onChange={this.fromChange} />
          </div>
          </div>
          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">To:</label>
            <div className="formField">
              <input type="text" id="location" className="formControl" placeholder="Search Location" onChange={this.toChange} />
            </div>
          </div>
          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">When:</label>
            <div className="formField">
              <input type="text" id="location" className="formControl" placeholder="Search Location" onChange={this.dateChange} />
            </div>
          </div>
          <div className="userFormGroup">
            <input type="button" name="submit" id="submit" value="Find Flights" className="SubmitButton" onClick={this.getResults} />
          </div>
        </form>
        <div className="flightDetails">
          {(this.state.searchResults && this.state.searchResults.length > 0) && (<FlightResults
            searchResults={this.state.searchResults}
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
