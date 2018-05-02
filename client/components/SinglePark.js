import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Card,
  Item,
  Label, Embed
} from 'semantic-ui-react'
import axios from 'axios'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
export class SinglePark extends Component {
  constructor() {
    super()
    this.state = {
    };
  }
  componentDidMount() {
  }
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
      const { children } = this.props
      const { fixed } = this.state
      const courses = [1, 2, 3, 4, 5, 6, 7, 8]
      console.log("this.state: ", this.state)
      const videos = ["1", "2", "3", "4", "5"]; 
      const items = [
        {
          childKey: 0,
          image: 'https://react.semantic-ui.com/assets/images/wireframe/image.png',
          header: 'Header',
          description: 'Description',
          meta: 'Metadata',
          extra: 'Extra',
        },
        {
          childKey: 1,
          image: 'https://react.semantic-ui.com/assets/images/wireframe/image.png',
          header: 'Header',
          description: 'Description',
          meta: 'Metadata',
          extra: 'Extra',
        },
      ]
      const simpleList = courses.map(val => (
        <li key={val} data-id={val}>List Item {val}</li>
      ));
  
      const ItemExampleProps = () => (
        <Item.Group items={items} />
      )
    return (
      <div>    
          <Segment style={{ padding: '2em', paddingTop: '5em' }} vertical>
          <Container text style={{marginBottom:'2em'}}>
          <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>Viewing Course</Header>
          </Container>
          <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
            <Item.Group divided>
            
                {videos.map(elem => {
                  return(
                  <Card>
                  <Card.Content>
                  <Card.Header>
                      <a key={elem} onClick={() => this.changeVideo(elem)}>{elem}</a>
                  </Card.Header>
                      </Card.Content>
                  </Card>                                            
                  )
                  })              
              }
          </Item.Group>
          </Grid.Column>
          <Grid.Column width={13}>
          <Embed
          icon='right circle arrow'
          aspectRatio="4:3"
          url={`/files/${this.state.videoURL}`}
            />                      

          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column width={16}>              
          <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>Purchase Map</Header>
          <Embed url='https://bl.ocks.org/mbostock/raw/3885304/' defaultActive={true}/>                      
          </Grid.Column>
          </Grid.Row>
          
          </Grid>
          <br/> <br/> <br/>
        </Segment>
    
    
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                    <List.Item as='a'>Religious Ceremonies</List.Item>
                    <List.Item as='a'>Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>Banana Pre-Order</List.Item>
                    <List.Item as='a'>DNA FAQ</List.Item>
                    <List.Item as='a'>How To Access</List.Item>
                    <List.Item as='a'>Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>Footer Header</Header>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        </div>
    )
  }
}

export default SinglePark