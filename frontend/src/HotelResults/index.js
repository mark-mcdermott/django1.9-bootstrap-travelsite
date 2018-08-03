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
  render(){
  const { classes, searchResults } = this.props;

  return (
    <Paper className={classes.root}>
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
                    <input type="button" name="submit" id="submit" value="Book Flight" className="SubmitButton" onClick={() => { this.bookHotel();}} />
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
