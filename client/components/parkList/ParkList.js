import React, { Component } from 'react';
import { Map, ParkListItem } from '../index.js';
import { connect } from 'react-redux';
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react';
import { getParksAddresses } from '../../store/index.js';

export class ParkList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getEveryAddresses();
  }
  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const location = { lat: 41.895266, lng: -87.6412237 };

    const markers = this.props.nearbyParks;
    const { contextRef } = this.state;
    // const markers = [{
    //   location: {lat: 41.895266, lng: -87.641223}
    //   }, {
    //     location: {lat: 41.8788652, lng: -87.6262237}
    //   }
    // ]

    return (
      <div className="container" ref={this.handleContextRef}>
        <Grid columns={2}>
          <Grid.Column width={9}>
            <div className="ui one cards">
              {this.props.nearbyParks.map(park => {
                return (
                  <ParkListItem
                    key={park.id}
                    currentPark={park}
                    history={this.props.history}
                  />
                );
              })}
            </div>
          </Grid.Column>
          <Grid.Column width={7}>
            <Sticky context={contextRef} offset={130}>
              <Map
                zoom={14}
                center={location}
                markers={markers}
                containerElement={<div style={{ height: `80vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Sticky>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { nearbyParks: state.parkList };
};

const mapDispatch = dispatch => {
  return {
    getEveryAddresses() {
      dispatch(getParksAddresses());
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(ParkList);
