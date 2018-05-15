import React, { Component } from 'react';
import { Map, ParkListItem } from '../index.js';
import { connect } from 'react-redux';
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react';
import { getParksAddresses, getGeolocation, getNearByParksAddresses, getNearByUsersInfo } from '../../store/index.js'

class ParkList extends Component {

  constructor(props){
    super(props)
    this.state = {
      map: null,
      location: {
        lat: 41.8781,
        lng: -87.6298
      },
      isHover: -1,
      range: 3218, // 2 miles
      slider: 1
    }

  }

  componentDidMount() {
    // this.props.getEveryAddresses();
    this.props.getUserLocation();
    this.props.getNearbyParks(this.state.location, this.state.range) //3218 = 2 miles in meters
    // this.props.getNearByUsers(this.state.location)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.userPosition !== this.props.userPosition){
      this.setState({location: {lat: nextProps.userPosition.latitude, lng: nextProps.userPosition.longitude}}, () => {
        this.props.getNearbyParks(this.state.location, this.state.range)})
    }
  }

  mapMoved(){
    const tempLocation = this.state.map.getCenter().toJSON();

    this.setState({location: {
        lat: (Math.round(tempLocation.lat * 10000000) / 10000000),
        lng: (Math.round(tempLocation.lng * 10000000) / 10000000)}
    }, () => {
      this.props.getNearbyParks(this.state.location, this.state.range)})

  }

  zoomChanged(){
  }

  mapLoaded(map){
    if (this.state.map !== null){
      return
    }
    this.setState({ map })
  }

  mouseOverHandler(index){
    if (this.state.isHover !== index) {
      this.setState({isHover: index})
    }
  }

  mouseOutHandler(index){
    this.setState({isHover: -1})
  }

  sliderChangeHandler(evt){
    let range = 0
    let tempValue = Number(evt.target.value)

    if (tempValue === 0){
      range = 1609
    }
    else if (tempValue === 1){
      range = 3218
    }
    else if (tempValue === 2){
      range = 6437
    }
    else if (tempValue === 3){
      range = 8046
    }

    this.setState({ slider: tempValue, range }, () => {
      this.props.getNearbyParks(this.state.location, this.state.range)
    })
  }


  handleContextRef = contextRef => this.setState({ contextRef });

  render() {

    const markers = this.props.nearbyParks
    const { contextRef } = this.state;

    let distance = 0
    if (this.state.slider === 0){
      distance = 1
    }
    else if (this.state.slider === 1){
      distance = 2
    }
    else if (this.state.slider === 2){
      distance = 4
    }
    else if (this.state.slider === 3){
      distance = 5
    }

    // const markers = [{
    //   location: {lat: 41.895266, lng: -87.641223}
    //   }, {
    //     location: {lat: 41.8788652, lng: -87.6262237}
    //   }
    // ]

    return (
      <div className="container" ref={this.handleContextRef}>

      <div style={{marginLeft: '15px', marginTop: '15px', marginBottom: '15px', width: '140px'}} className="slidecontainer">
      <input type="range" min="0" max="3" className="slider" id="viewDistance" value={this.state.slider} onChange={this.sliderChangeHandler.bind(this)} />
      <p>{`Distance: ${distance} miles `}</p>
    </div>

      <Grid columns={2}>

      <Grid.Column width={9}>
      <div className="ui one cards">

      {this.props.nearbyParks.map((park, index) => {
         return <ParkListItem
         key={park.id}
         index={index}
         currentPark={park}
         history={this.props.history}
         mouseOverHandler={this.mouseOverHandler.bind(this)}
         mouseOutHandler={this.mouseOutHandler.bind(this)} />
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
        isHover={this.state.isHover}

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
    getNearbyParks(location, dist){
      dispatch(getNearByParksAddresses(location, dist))
    },
    // getNearByUsers(location){
    //   dispatch(getNearByUsersInfo(location))
    // }
  };
};

export default connect(mapStateToProps, mapDispatch)(ParkList);
