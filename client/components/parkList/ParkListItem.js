import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Header,
  Image,
  Rail,
  Segment,
  Sticky,
  Button,
  Icon,
  Label,
} from 'semantic-ui-react';

import { Link, NavLink } from 'react-router-dom';

class ParkListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickHandler() {
    this.props.history.push(`/dog-park/${this.props.currentPark.id}`);
  }

  render() {
    const currentPark = this.props.currentPark;
    const i = this.props.index;
    const { id, name, address, imageUrls } = this.props.park;
    return (
      <div
        className="card"
        style={{ margin: 0, padding: 0 }}
        onMouseOver={() => this.props.mouseOverHandler(i)}
        onMouseLeave={() => this.props.mouseOutHandler(i)}
      >
        {/* <div className="extra"> */}
        <Segment style={{ margin: '0px', width: '100%' }}>
          <Grid>
            <Grid.Row
              style={{
                padding: '0.25em',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Header
                  style={{ flex: 2, margin: '0', fontSize: '1em' }}
                  as={NavLink}
                  to={`/dog-park/${id}`}
                >
                  {name}
                </Header>
                <Header
                  style={{
                    flex: 1,
                    margin: '0',
                    fontSize: '0.8em',
                    color: 'grey',
                  }}
                  as="h4"
                >
                  {address.fullAddress}
                </Header>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 2,
                  justifyContent: 'flex-end',
                }}
              >
                {address &&
                  address.location.distance && (
                    <Label
                      style={{ flex: 0.75, padding: '0.5em 0.5em' }}
                      icon="globe"
                      content={`${address.location.distance} mi`}
                    />
                  )}
                <NavLink to={`/dog-park/${id}`}>
                  <Button
                    style={{
                      flex: 0.75,
                      padding: '0.5em 0.5em',
                      height: '100%',
                    }}
                    size="tiny"
                    name="dogpark-detail"
                  >
                    Park Detail
                  </Button>
                </NavLink>
              </div>
            </Grid.Row>
            <Grid.Row columns={1} style={{ padding: '0em 0em' }}>
              <Grid.Column width={16} style={{ padding: '0', margin: '0' }}>
                <Grid.Row style={{ padding: '0', margin: '0' }}>
                  <div
                    style={{
                      overflowX: 'scroll',
                      overflowY: 'hidden',
                      display: 'flex',
                      flexDirection: 'row',
                      height: '10rem',
                      justifyContent: 'flex-start',
                      // alignItems: 'center'
                    }}
                  >
                    {imageUrls.map(imageUrl => (
                      <div style={{ width: '100%' }} key={imageUrl}>
                        <img
                          style={{ height: '100%' }}
                          src={imageUrl}
                        />
                      </div>
                    ))}
                    <Icon
                      name="angle right"
                      style={{
                        position: 'absolute',
                        top: '60px',
                        right: '0px',
                        backgroundColor: 'transparent',
                        padding: '0px',
                        fontSize: '5em',
                        color: 'rgb(222, 242, 242)',
                        maxWidth: '-1px',
                        margin: '0em 0em',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    />
                  </div>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        {/* <Grid columns={3}>
            <Grid.Column width={3}>
              {currentPark.imageUrls.length ? (
                <Image
                  size="small"
                  centered={true}
                  src={currentPark.imageUrls[0]}
                />
              ) : (
                <Image
                  size="small"
                  centered={true}
                  src="https://react.semantic-ui.com/assets/images/wireframe/image.png"
                />
              )}

              <div className="ui star rating" data-rating="4" />
            </Grid.Column>
            <Grid.Column width={5}>
              <h3> {currentPark.name}</h3>
              <h4>{currentPark.address.location.distance} mi away</h4>
            </Grid.Column>
            <Grid.Column width={5}>
              <h4>{currentPark.address.line_1}</h4>
              <h4>
                {currentPark.address.city} {currentPark.address.state},{' '}
                {currentPark.address.zipcode}
              </h4>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button
                style={{ backgroundColor: '#54B8BF', color: 'white' }}
                onClick={this.clickHandler.bind(this)}
              >
                See Details
              </Button>
            </Grid.Column>
          </Grid> */}
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatch)(ParkListItem);
