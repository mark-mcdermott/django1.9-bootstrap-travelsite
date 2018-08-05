import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import './feedback.css';

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


class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      rating: '',
      feedbackResult: '',
      feedbackStatus: false,
    };
  }

  feedbackUpdate = event => {
    this.setState({ feedback: event.target.value });
  };

  ratingUpdate = event => {
    this.setState({ rating: event.target.value });
  };


  submitFeedback = () => {
    const { feedback, rating } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.set('feedback_text', feedback);
    bodyFormData.set('feedback_rating', rating);

    axios({
      method: 'post',
      url: 'http://localhost:8000/feedback-api',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then((response) => {
        console.log(response);
        this.setState({
          feedbackResult: 'Feedback submitted successfully.',
          feedbackStatus: true,
        })
      })
      .catch((error) => {
        console.log(error);
        this.setState({
            feedbackResult: 'Feeback failed. Please check your details.',
          feedbackStatus: true,
        })
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={this.props.className}>
        <form className="userForm feedbackUserForm">
          <div className="userFormGroupFeedback">
            <label htmlFor="date" className="formLabel">User Feedback:</label>
            <div className="formField">
              <input type="textarea"  className=" textAreaForm" placeholder="feedback" onChange={this.feedbackUpdate} />
            </div>
          </div>

          <div className="userFormGroupFeedback">
            <label htmlFor="date" className="formLabel">User Rating:</label>
            <div className="formField">
              <input type="number" min="0" max="10" className="ratingForm" placeholder="rating" onChange={this.ratingUpdate}/>
            </div>
          </div>
          <div className="userFormGroupFeedback">
            <input type="button" name="submit" id="submit" value="Submit Feedback" className="SubmitButton" onClick={this.submitFeedback} />
          </div>
        </form>
        <div className="flightDetails">
          {this.state.feedbackStatus && <p>{this.state.feedbackResult}</p>}
        </div>
      </div>
    );
  };
}


Feedback.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feedback);
