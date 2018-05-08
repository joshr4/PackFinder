import React, { Component } from 'react';
import { Map, ParkListItem } from '../index.js';
import { connect } from 'react-redux';
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react';
import { getParksAddresses, getGeolocation, getNearByParksAddresses } from '../../store/index.js'

class ParkList extends Component {

  constructor(props){
    super(props)
    this.state = {
      map: null,
      location: {
        lat: 41.895266,
        lng: -87.6412237
      }
    }


  }

  componentDidMount() {
    // this.props.getEveryAddresses();
    this.props.getUserLocation();
    this.props.getNearbyParks(this.state.location.lat, this.state.location.lng, 3218) //3218 = 2 miles in meters
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.userPosition !== this.props.userPosition){
      this.setState({location: {lat: nextProps.userPosition.latitude, lng: nextProps.userPosition.longitude}}, () => {
        this.props.getNearbyParks(this.state.location.lat, this.state.location.lng, 3218)})
    }
  }

  mapMoved(){

    const tempLocation = this.state.map.getCenter().toJSON();

    this.setState({location: {
        lat: (Math.round(tempLocation.lat * 10000000) / 10000000),
        lng: (Math.round(tempLocation.lng * 10000000) / 10000000)}
    }, () => {
      this.props.getNearbyParks(this.state.location.lat, this.state.location.lng, 3218)})

  }


  zoomChanged(){
    console.log('zoomChanged: ', this.state.map.getZoom())
  }

  mapLoaded(map){
    if (this.state.map !== null){
      return
    }

    this.setState({ map })
  }

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {

    const markers = this.props.nearbyParks
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
         return <ParkListItem key={park.id} currentPark={park}
         history={this.props.history} />
      })}


    </div>
      </Grid.Column>

      <Grid.Column width={7}>
      <Sticky context={contextRef} offset={130}>
      <Map
        zoom={14}
        center={this.state.location}
        markers={markers}
        mapMoved={this.mapMoved.bind(this)}
        mapLoaded={this.mapLoaded.bind(this)}
        zoomChanged={this.zoomChanged.bind(this)}
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
  return {nearbyParks: state.parkList,
    userPosition: state.location.coords
  };

};

const mapDispatch = dispatch => {
  return {
    getEveryAddresses() {
      dispatch(getParksAddresses());
    },
    getUserLocation() {
      dispatch(getGeolocation())
    },
    getNearbyParks(lat, lng, dist) {
      dispatch(getNearByParksAddresses(lat, lng, dist))
    }
  };
};

export default connect(mapStateToProps, mapDispatch)(ParkList);
