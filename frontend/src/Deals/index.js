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
});


  class Deals extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchResults: [],
      };
    }
    componentDidMount() {
      this.getResults();
    }

    getResults = () => {
      // Make a request for a user with a given ID
      axios.get(`http://localhost:8000/deals-api?`)
        .then((response) => {
          this.setState({
            searchResults: JSON.parse(response.data),
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
      const { classes } = this.props;

      const { searchResults } = this.state;

      return (
        <div className="tabContent dealsContent">
          <Paper className={classes.root}>
            <div className="dealsDetails">
              <label> Available Deals </label>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Depart City</TableCell>
                    <TableCell >Departure State </TableCell>
                    <TableCell >Departure Time</TableCell>
                    <TableCell >Arrival City</TableCell>
                    <TableCell >Arrival State</TableCell>
                    <TableCell >Arrival Time</TableCell>
                    <TableCell >Actual Price</TableCell>
                    <TableCell >Deal Price</TableCell>
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
                        <TableCell >{eachResult.fields.price_high}</TableCell>
                        <TableCell >{eachResult.fields.price_low}</TableCell>

                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
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

