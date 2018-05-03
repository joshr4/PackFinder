import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"


class Map extends Component {

  render() {

    // const myKey = 'AIzaSyCcL9Cp8Qdi3dT9U5Iimud0LcDowumqomY';
    const markers = this.props.markers || []

    return (
      <GoogleMap
      defaultZoom={this.props.zoom}
      defaultCenter={this.props.center} >
      {markers.map((marker, index) => (
        <Marker {...marker} />
      )
    )}
    </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);
