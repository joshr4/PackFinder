import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Image, Rail, Segment, Sticky, Button } from  'semantic-ui-react'
import {Link} from 'react-router-dom'


class ParkListItem extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }


  clickHandler(){
    this.props.history.push(`/dog-park/${this.props.currentPark.id}`)
  }


  render() {

    const currentPark = this.props.currentPark
    const i = this.props.index

    return (

      <div className="card" onMouseOver={() => this.props.mouseOverHandler(i)} onMouseLeave={() => this.props.mouseOutHandler(i)}>
        <div className="extra">
        <Grid columns={3} >
        <Grid.Column width={3}>
        {currentPark.imageUrl ? <Image size='small' centered={true} src={currentPark.imageUrl} /> : <Image size='small' centered={true} src="https://react.semantic-ui.com/assets/images/wireframe/image.png" />}

          <div className="ui star rating" data-rating="4"></div>
          </Grid.Column>
          <Grid.Column width={5}>
          <h3> {currentPark.name}</h3>
          <h4>{currentPark.address.location.distance} mi away</h4>
          </Grid.Column>
          <Grid.Column width={5}>
          <h4>{currentPark.address.line_1}</h4>
          <h4>{currentPark.address.city} {currentPark.address.state}, {currentPark.address.zipcode}</h4>
          </Grid.Column>
          <Grid.Column width={3}>


          <Button style={{backgroundColor: '#54B8BF', color: 'white'}} onClick={this.clickHandler.bind(this)}>
          See Details</Button>
          </Grid.Column>
          </Grid>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatch)(ParkListItem);
