import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import './flightresults.css';

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
    const { userDetails, bookingInputs: { date, to, from, returndate, passengers }, selectedFlights } = this.props;
    // console.log(user)
    const flightDetails = selectedFlights[0];
    var bodyFormData = new FormData();
    // console.log(user);
    // console.log('passengers' + passengers);
    // console.log(flightDetails)
    bodyFormData.set('cust_name', userDetails.name_first);
    bodyFormData.set('airline_name', 'Delta');
    bodyFormData.set('credit_type', 'Visa');
    bodyFormData.set('credit_name', userDetails.credit_name);
    bodyFormData.set('credit_number', '1234567890123456');
    bodyFormData.set('credit_expiration', userDetails.credit_expiration);
    bodyFormData.set('credit_security', '123');
    bodyFormData.set('depart_city', flightDetails.depart_city);
    bodyFormData.set('depart_state', flightDetails.depart_state);
    bodyFormData.set('depart_datetime', flightDetails.depart_datetime);
    bodyFormData.set('arrive_city', flightDetails.arrive_city);
    bodyFormData.set('arrive_state', flightDetails.arrive_state);
    bodyFormData.set('arrive_datetime', flightDetails.arrive_datetime);
    bodyFormData.set('num_passengers', passengers);
    bodyFormData.set('mileage', userDetails.user_miles);
    if (selectedFlights[1]) {
      bodyFormData.set('depart_city2', selectedFlights[1].depart_city);
      bodyFormData.set('depart_state2', selectedFlights[1].depart_state);
      bodyFormData.set('depart_datetime2', selectedFlights[1].depart_datetime);
      bodyFormData.set('arrive_city2', selectedFlights[1].arrive_city);
      bodyFormData.set('arrive_state2', selectedFlights[1].arrive_state);
      bodyFormData.set('arrive_datetime2', selectedFlights[1].arrive_datetime);
      bodyFormData.set('num_passengers2', passengers);
      bodyFormData.set('mileage2', userDetails.user_miles);
      // bodyFormData.set('flight2', JSON.stringify(selectedFlights[1]));
    }
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
  }
  render() {
    Moment.locale('en');
    var dt = '2016-05-02T00:00:00';
    const { classes, selectedFlights, bookingInputs, userDetails } = this.props;
    const { bookingStatus, bookingResult } = this.state;
    const bull = <span className={classes.bullet}>•</span>;
    let totlPrice = parseInt(selectedFlights[0].price);
    if (selectedFlights[1]) {
      totlPrice += parseInt(selectedFlights[1].price);
    }
    totlPrice += (totlPrice * 15 / 100);
    let milesFactor = 25000;
    if (selectedFlights[0].intl) {
      milesFactor = 50000;
    }
    const creditCard = "" + userDetails.credit_number;
    return (
      <div className="confirmationSection" id="confirmationSection">
        <Paper>
          <div className="reviewFlights">
            {selectedFlights.map((eachResult, index) => {
              return (<List component="nav" className="reviewFlightsEach">
                <ListItem button>
                  <Typography className={`reviewFlightHeading ${classes.title}`} color="textPrimary">
                    Flight-{index + 1} Details:
                </Typography>
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Depart City:
                </Typography>
                  <ListItemText primary={eachResult.depart_city} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Depart State:
                </Typography>
                  <ListItemText primary={eachResult.depart_state} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Depart Date:
                </Typography>
                  <ListItemText primary={Moment(eachResult.depart_datetime).format('MM/DD/YYYY')} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Depart Time:
                </Typography>
                  <ListItemText primary={Moment(eachResult.depart_datetime).format('h:mm a')} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Arrival City:
                </Typography>
                  <ListItemText primary={eachResult.arrive_city} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Arrival State:
                </Typography>
                  <ListItemText primary={eachResult.arrive_state} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Arrival Date:
                </Typography>
                  <ListItemText primary={Moment(eachResult.arrive_datetime).format('MM/DD/YYYY')} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Arrival Time:
                </Typography>
                  <ListItemText primary={Moment(eachResult.arrive_datetime).format('h:mm a')} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Passengers:
                </Typography>
                  <ListItemText primary={bookingInputs.passengers} />
                </ListItem>
                <ListItem button>
                  <Typography className={classes.title} color="textSecondary">
                    Price:
                </Typography>
                  <ListItemText primary={eachResult.price} />
                </ListItem>

              </List>)
            })}
          </div>
          <List component="nav" className="reviewFlightsUser">
            <ListItem button>
              <Typography className={`reviewFlightHeading ${classes.title}`} color="textPrimary">
                Total Price(Including 15% taxes):
                  </Typography>
              <ListItemText primary={totlPrice} />
            </ListItem>
            <ListItem button>
              <Typography className={`reviewFlightHeading ${classes.title}`} color="textPrimary">
                User Miles:
                  </Typography>
              <ListItemText primary={userDetails.user_miles} />
            </ListItem>
            <ListItem button>
              <Typography className={`reviewMileageHeading ${classes.title}`} color="textPrimary">
                Please check this box if you want use miles for this booking:
                * Checkbox will be enabled only if you have enough mileage
                  </Typography>
              {(<Checkbox
                checked={this.state.userMiles}
                onChange={this.handleUserMilesSelected}
                value="checkedB"
                color="primary"
                disabled={(userDetails.user_miles < milesFactor)}
              />)}
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

const ShowConfirmationSection = withStyles(styles)(ShowConfirmationSectionClass);


class FlightResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingResult: '',
      bookingStatus: false,
      selectedFlights: [],
      showConfirmationBox: false,
      orderBy: '1234'
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      searchResults: nextProps.searchResults
    };
  }

  showConfirmationSec = () => {
    const { selectedFlights } = this.state;
    //console.log(selectedFlights)
    if (selectedFlights.length < 1 && selectedFlights.length > 2) {
      alert("Please select two flights");
    } else {
      this.setState({
        showConfirmationBox: true,
      });
    }
  }

  selectFlight = (flightDetails) => {
    const { selectedFlights, searchResults } = this.state;
    // const newSearchResults = searchResults.map(eachitem => (eachitem.checked = true));
    if (selectedFlights.length === 2) {
      selectedFlights[1] = flightDetails;
    } else {
      selectedFlights.push(flightDetails);
    }
    this.setState({
      selectedFlights,
    });
    if(this.props.getSelectedFlight){
      this.props.getSelectedFlight(flightDetails);
    }
    
  }

  createSortHandler = (id) => {
    const { order } = this.state;
    let newOrder = '';
    if(order === 'desc') {
      newOrder = 'asc'
    } else if(order === 'asc') {
      newOrder = 'desc'
    }
    this.setState({
      orderBy: id,
      order: newOrder,
    });
  }

  render() {
    Moment.locale('en');
    var dt = '2016-05-02T00:00:00';
    const { classes, bookingInputs } = this.props;
    const { searchResults, showConfirmationBox, selectedFlights, orderBy, order } = this.state;
    const tableHeaders = [
      {id: '1234', label: 'Depart City', numeric: false },
      {id: '1235', label: 'Departure State', numeric: false },
      {id: '1242', label: 'Depart Date', numeric: false },
      {id: '1236', label: 'Depart Time', numeric: false },
      {id: '1237', label: 'Arrival City', numeric: false },
      {id: '1238', label: 'Arrival State', numeric: false },
      {id: '1239', label: 'Arrival Date', numeric: false },
      {id: '1240', label: 'Arrival Time', numeric: false },
      {id: '1241', label: 'Price', numeric: true },
    ];
    return (
      <Paper className={classes.root}>
        <label> Please select flight from below </label>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            {/* {tableHeaders.map(column => {
                return (
                  <TableCell
                    key={column.id}
                    numeric={column.numeric}
                    padding={column.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <Tooltip
                      title="Sort"
                      placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                      enterDelay={300}
                    >
                      <TableSortLabel
                        direction={order}
                        active={orderBy === column.id}
                        onClick={() => this.createSortHandler(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                );
              }, this)} */}
              <TableCell>Depart City</TableCell>
              <TableCell>Departure State </TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival City</TableCell>
              <TableCell>Arrival State</TableCell>
              <TableCell>Arrival Date</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Book</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((eachResult, index) => {
              return (
                <TableRow key={`${eachResult.fields.depart_city}-${eachResult.fields.depart_datetime}-${index}`}>
                  <TableCell component="th" scope="row">
                    {eachResult.fields.depart_city}
                  </TableCell>
                  <TableCell>{eachResult.fields.depart_state}</TableCell>
                  <TableCell>{Moment(eachResult.fields.depart_datetime).format('MM/DD/YYYY')}</TableCell>
                  <TableCell>{Moment(eachResult.fields.depart_datetime).format('h:mm a')}</TableCell>
                  <TableCell>{eachResult.fields.arrive_city}</TableCell>
                  <TableCell>{eachResult.fields.arrive_state}</TableCell>
                  <TableCell>{Moment(eachResult.fields.arrive_datetime).format('MM/DD/YYYY')}</TableCell>
                  <TableCell>{Moment(eachResult.fields.arrive_datetime).format('h:mm a')}</TableCell>
                  <TableCell>{eachResult.fields.price}</TableCell>
                  <TableCell>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={eachResult.fields.checked}
                            onChange={() => this.selectFlight(eachResult.fields)}
                            value="checkedB"
                            color="primary"
                          />
                        }
                        label="Select this flight"
                      />
                    </FormGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {!this.props.disableItemBooking && (<div className="userFormGroup">
          <input type="button" name="submit" id="submit" value="Book Selected Flights"
            className="SubmitButton"
            onClick={() => { this.showConfirmationSec(); }} />
        </div>)}

        {showConfirmationBox && <ShowConfirmationSection
          selectedFlights={selectedFlights}
          bookingInputs={bookingInputs}
          userDetails={this.props.userDetails}
        />}
      </Paper>
    );
  }
}

FlightResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightResults);
