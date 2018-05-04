import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


class Map extends Component {

  constructor(){
    super();
    this.state = {
      map: null,
    }
  }

  mapMoved(){
      console.log('mapMoved: ', JSON.stringify(this.state.map.getCenter()))
    }

    mapLoaded(map){
      if (this.state.map !== null){
        return
      }

      this.setState({ map })
    }

    zoomChanged(){
      console.log('zoomChanged: ', this.state.map.getZoom())
    }



  render() {

    // const mapKey = 'AIzaSyCcL9Cp8Qdi3dT9U5Iimud0LcDowumqomY';
    const markers = this.props.markers.map((park, i) => {

      const marker = {
        position: {
          lat: park.address.location.lat,
          lng: park.address.location.lng,
        }
      }

      return <Marker key={park.address.location.lat.toString() + park.address.location.lng.toString()} {...marker} />
    })

    // <Marker
    // position={{ lat: -34.397, lng: 150.644 }}
    // />
    // <Marker
    // position={{lat:41.895266, lng:-87.6412237}}
    // />

    return (
      <GoogleMap
      ref={this.mapLoaded.bind(this)}
      onDragEnd={this.mapMoved.bind(this)}
      onZoomChanged={this.zoomChanged.bind(this)}
      defaultZoom={this.props.zoom}
      defaultCenter={this.props.center} >
      { markers }


    </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);
