import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notes } from "../actions";

class Travel extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to Travel Site!</h2>
        <hr />

        <h3>Notes</h3>
        <table>
          <tbody>
            {this.props.notes.map(note => (
              <tr>
                <td>{note.text}</td>
                <td><button>edit</button></td>
                <td><button>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    notes: state.notes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: (text) => {
      dispatch(notes.addNote(text));
    },
    updateNote: (id, text) => {
      dispatch(notes.addNote(id, text));
    },
    deleteNote: (id) => {
      dispatch(notes.deleteNote(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Travel)
