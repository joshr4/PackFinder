import React, { Component } from 'react';
import { Button, Header, Image, Modal, Grid, Form } from 'semantic-ui-react';
import moment from 'moment'
import { AddEventForm } from '../index';
import { connect } from 'react-redux';
import { addEvent } from '../../store';

class EventAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      item: {
        description: '',
        date: moment().format('YYYY-MM-DD'),
        startTime: moment().format('HH:mm'),
        parkId: 1,
        private: true,
      }
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange = (e) => {
    let variable = e.target.name
    let value
    if (variable === 'private') value = !this.state.item.private
    else value = e.target.value
    this.setState({ isDirty: true, item: Object.assign(this.state.item, { [variable]: value }) })
  }

  handleFieldChange = data => {
    this.setState({
      item: Object.assign(this.state.item, { parkId: data.value }),
    })
  }

  handleSubmit = (event) => {
    let stateEvent = event
    let year = parseInt(stateEvent.date.split('-')[0]);
    let month = parseInt(stateEvent.date.split('-')[1]) - 1;
    let day = parseInt(stateEvent.date.split('-')[2]);
    let fromHour = parseInt(stateEvent.startTime.split(':')[0]);
    let fromMin = parseInt(stateEvent.startTime.split(':')[1]);
    let startTime = new Date(year, month, day, fromHour, fromMin);
    let newEvent = Object.assign(stateEvent, { start: startTime, creatorId: this.props.user.id })
    this.props.addEvent(newEvent)
    this.props.onClose()
  }
  render() {
    let { onClose, showModal, onDelete, parkDropDownList } = this.props
    let { description, item, isDirty } = this.state
    return (
      <Modal open={showModal} onClose={() => onClose()} style={{ width: 'console' }} >
        <Button color="blue" style={{ marginLeft: 20, marginTop: 20 }} onClick={() => onClose()}>Close</Button>

        <Button negative floated="right" style={{ marginRight: 20, marginTop: 20 }} onClick={() => onDelete(this.props.item.id)}>Delete Event</Button>
        <Modal.Content image>
          <Modal.Description>
            <h3> {description}</h3>
            <AddEventForm
              item={item}
              parkDropDownList={parkDropDownList}
              handleChange={this.handleChange}
              handleFieldChange={this.handleFieldChange}
              handleSubmit={() => isDirty ? this.handleSubmit(item) : onClose() }
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {

  let dropDownParks = state.parkList.map(park => {
    let newPark = {
      key: park.id,
      value: park.id,
      text: park.name
    }
    return newPark
  })

  return {
    email: state.user.email.toString(),
    nearbyUsers: state.nearbyUsers,
    user: state.user,
    events: state.events,
    parkDropDownList: dropDownParks
  };
};

const mapDispatch = dispatch => {
  return {
    addEvent(event) {
      dispatch(addEvent(event));
    },
    getUserLocation() {
      dispatch(getGeolocation());
    },
    getNearbyParks(lat, lng, dist) {
      dispatch(getNearByParksAddresses(lat, lng, dist));
    },
    getNearByUsers(location) {
      dispatch(getNearByUsersInfo(location));
    },
  };
};


export default connect(mapStateToProps, mapDispatch)(EventAddModal);
