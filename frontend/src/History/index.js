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
import './history.css';


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


class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchStatus: false,
      searched: false,
    }
  }

  componentDidMount(){
    this.getResults();
  }

  getResults = () => {
    const { userDetails } = this.props;

    // Make a request for a user with a given ID
   const getURL = `http://localhost:8000/history-api?user=${userDetails.name_first}`;
    axios.get(getURL)
      .then((response) => {
        this.setState({
          searchResults: JSON.parse(response.data),
          searchStatus: true,
          searched: true,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  render() {
    Moment.locale('en');
    var dt = '2016-05-02T00:00:00';
    const { classes } = this.props;
    const { searchResults } = this.state;
    return (
      <div className={this.props.className}>
      <Paper className={`historyTable ${classes.root}`}>
        {(this.state.searchResults && this.state.searchResults.length > 0) && (<Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Depart City</TableCell>
              <TableCell>Departure State </TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival City</TableCell>
              <TableCell>Arrival State</TableCell>
              <TableCell>Arrival Date</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Price</TableCell>
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>)}
        {(!(this.state.searchResults && this.state.searchResults.length > 0) && this.state.searched) && (<p> No results Found </p>)}
        
      </Paper>
      </div>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(History);
