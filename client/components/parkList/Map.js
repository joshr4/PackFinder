import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


class Map extends Component {

  constructor(props){
    super(props);
    const { center } = props;

    this.state = {
      defaultCenter: center
    }
  }




  render() {

    // const mapKey = 'AIzaSyCcL9Cp8Qdi3dT9U5Iimud0LcDowumqomY';



    const markers = this.props.markers.map((park, i) => {

      const image = `/../../../images/markers/marker_red${i+1}.png`

      const marker = {
        position: {
          lat: park.address.location.lat,
          lng: park.address.location.lng,
        },
        icon: image
      }

      return <Marker key={i} {...marker} />
    })

    console.log(markers)

    // <Marker
    // position={{ lat: -34.397, lng: 150.644 }}
    // />
    // <Marker
    // position={{lat:41.895266, lng:-87.6412237}}
    // />

    return (
      <GoogleMap
      ref={this.props.mapLoaded}
      onDragEnd={this.props.mapMoved}
      onZoomChanged={this.props.zoomChanged}
      defaultZoom={this.props.zoom}
      center={this.props.center} >
      { markers }


    </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);
