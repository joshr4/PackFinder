import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { Grid } from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DayColumn } from './index';

/**
 * COMPONENT
 */

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class Schedule extends Component {
  state = {
    column1: [
      { id: 1, content: 'Walk dog1', start: { hour: 4, minute: 30 }, end: { hour: 5, minute: 30 } },
      { id: 2, content: 'Walk dog2', start: { hour: 10, minute: 30 }, end: { hour: 11, minute: 30 } }
    ],
    column2: [
      { id: 13, content: 'Walk dog4', start: { hour: 14, minute: 30 }, end: { hour: 15, minute: 0 } },
      { id: 14, content: 'Walk dog5', start: { hour: 12, minute: 30 }, end: { hour: 13, minute: 30 } },
    ],
    column3: [
      { id: 16, content: 'Walk dog7', start: { hour: 9, minute: 30 }, end: { hour: 10, minute: 0 } },
      { id: 17, content: 'Walk dog8', start: { hour: 2, minute: 0 }, end: { hour: 3, minute: 0 } },
    ],
    column4: [
      { id: 19, content: 'Walk dog10', start: { hour: 18, minute: 30 }, end: { hour: 19, minute: 30 } },
      { id: 20, content: 'Walk dog11', start: { hour: 17, minute: 0 }, end: { hour: 18, minute: 0 } },
    ],
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'column1',
    droppable2: 'column2',
    droppable3: 'column3',
    droppable4: 'column4',
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable2') {
        state = { column2: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        column1: result.droppable,
        column2: result.droppable2,
      });
    }
  };

  render() {
    return (
      <Grid columns={4}>
        <Grid.Row>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Grid.Column>
              <DayColumn droppableId="droppable" events={this.state.column1} />
            </Grid.Column>
            <Grid.Column>
              <DayColumn droppableId="droppable2" events={this.state.column2} />
            </Grid.Column>
            <Grid.Column>
              <DayColumn droppableId="droppable3" events={this.state.column3} />
            </Grid.Column>
            <Grid.Column>
              <DayColumn droppableId="droppable4" events={this.state.column4} />
            </Grid.Column>
          </DragDropContext>
        </Grid.Row>
      </Grid>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapState = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export default connect(mapState, mapDispatch)(Schedule);

/**
 * PROP TYPES
 */
Schedule.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
