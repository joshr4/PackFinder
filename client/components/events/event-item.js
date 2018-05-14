import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Image, Rail, Segment, Sticky, Button } from  'semantic-ui-react'
import {Link} from 'react-router-dom'
import history from '../../history';
import moment from 'moment';


class EventItem extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }


  clickHandler(){
    this.props.history.push(`/dog-park/${this.props.currentPark.id}`)
  }


  render() {

    const { event } = this.props
    const i = this.props.index
    return (
      event ?
      <div className="card" onMouseOver={() => {}} onMouseLeave={() => {}}>
        <div className="extra">
        <Grid columns={3} >
        <Grid.Column width={3}>
        <Image size='small' centered={true} src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
          <div className="ui star rating" data-rating="4"></div>
          </Grid.Column>
          <Grid.Column width={5}>
          <h3>{event.park.name}</h3>
          </Grid.Column>
          <Grid.Column width={5}>
          <h3>Attendees: {event.attendees.length}</h3>
          </Grid.Column>
          <Grid.Column width={5}>
          <h3>Date: {moment(event.start).format('MMMM Do YYYY, h:mm a')}</h3>
          </Grid.Column>
          <Grid.Column width={3}>


          <Button style={{backgroundColor: '#54B8BF', color: 'white'}} onClick={() => history.push(`/event/${event.id}`)}>
          See Details</Button>
          </Grid.Column>
          </Grid>
        </div>
      </div>
      : <div />
    );
  }
}

const mapStateToProps = state => {
  return{

  }
};

const mapDispatch = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatch)(EventItem);
