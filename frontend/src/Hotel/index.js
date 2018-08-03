import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import './hotel.css';
import HotelResults from '../HotelResults';

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


class Hotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      date: '',
      searchResults: [],
    };
  }

  cityChange = event => {
    this.setState({ city: event.target.value });
  };

  dateChange = event => {
    this.setState({ date: event.target.value });
  };



  getResults = () => {
    const { date, city } = this.state;
    console.log(date, city);
    if (date && city) {
      // Make a request for a user with a given ID
      axios.get(`http://localhost:8000/hotels-api?city=${city}`)
        .then((response) => {
          // handle success
          console.log(response);
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
            <label htmlFor="date" className="formLabel">City:</label>
            <div className="formField">
              <input type="text" id="location" className="formControl" placeholder="Search Location" onChange={this.cityChange} />
            </div>
          </div>

          <div className="userFormGroup">
            <label htmlFor="date" className="formLabel">When:</label>
            <div className="formField">
              <input type="text" id="location" className="formControl" placeholder="Search Location" onChange={this.dateChange}/>
            </div>
          </div>
          <div className="userFormGroup">
            <input type="button" name="submit" id="submit" value="Find Hotels" className="SubmitButton" onClick={this.getResults} />
          </div>
        </form>
        <div className="flightDetails">
          <label> Please select hotel from below </label>
          <HotelResults
            searchResults={this.state.searchResults} />
        </div>

      </div>
    );
  };
}


Hotel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hotel);
