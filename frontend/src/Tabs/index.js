import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FlightIcon from '@material-ui/icons/Flight';
import HotelIcon from '@material-ui/icons/Hotel';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import './tabs.css';
import Flight from '../Flight';
import Hotel from '../Hotel';

function TabContainer(props) {
  return (
    <Typography component="div" className={props.className} style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabSelected: {
    background: '#2C2E3E !important',
    color: '#fff !important',
  },
  tabWrapper: {
    background: '#FFDD00',
    marginRight: '2px',
  },
});

class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Flight" icon={<FlightIcon />}
              classes={{ root: classes.tabWrapper , selected: classes.tabSelected, }}/>
            <Tab label="Hotel" icon={<HotelIcon />}
              classes={{ root: classes.tabWrapper , selected: classes.tabSelected, }}/>
            <Tab label="Flight+Hotel" icon={<FlightTakeoff />}
              classes={{ root: classes.tabWrapper , selected: classes.tabSelected, }}/>
            <Tab label="Deals" icon={<HelpIcon />}
              classes={{ root: classes.tabWrapper , selected: classes.tabSelected, }}/>
          </Tabs>
        </AppBar>
        {value === 0 && <Flight className="tabContent" />}
        {value === 1 && <Hotel className="tabContent" />}
        {value === 2 && <TabContainer className="tabContent">Item Three</TabContainer>}
        {value === 3 && <TabContainer className="tabContent">Item Four</TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);
