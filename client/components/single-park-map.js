import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


class SingleParkMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      location: this.props.center
    }
  }

  render() {
    // const mapKey = 'AIzaSyCcL9Cp8Qdi3dT9U5Iimud0LcDowumqomY';

    const OPTIONS = {
      minZoom: 11,
    }

    const marker = <Marker
    position={this.props.center}
    />

    return (
      <GoogleMap
        ref={this.props.mapLoaded}
        options={OPTIONS}
        defaultZoom={this.props.zoom}
        center={this.props.center} >
        { marker }
      </GoogleMap>
    );
  }
}

export default withGoogleMap(SingleParkMap);
