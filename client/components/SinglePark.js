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
var Chart = require('react-d3-core').Chart;
import {BarChart, LineChart} from 'react-d3-basic'
// var LineChart = require('react-d3-basic').LineChart;

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
      console.log("test");
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
      var D3data = [
        {letter: "A", frequency: .08167},
        {letter: "B", frequency: .01492},
        {letter: "C", frequency: .02780},
        {letter: "D", frequency: .04253},
        {letter: "E", frequency: .12702},
        {letter: "F", frequency: .02288},
        {letter: "G", frequency: .02022},
        {letter: "H", frequency: .06094},
        {letter: "I", frequency: .06973},
        {letter: "J", frequency: .00153},
        {letter: "K", frequency: .00747},
        {letter: "L", frequency: .04025},
        {letter: "M", frequency: .02517},
        {letter: "N", frequency: .06749},
        {letter: "O", frequency: .07507},
        {letter: "P", frequency: .01929},
        {letter: "Q", frequency: .00098},
        {letter: "R", frequency: .05987},
        {letter: "S", frequency: .06333},
        {letter: "T", frequency: .09056},
        {letter: "U", frequency: .02758},
        {letter: "V", frequency: .01037},
        {letter: "W", frequency: .02465},
        {letter: "X", frequency: .00150},
        {letter: "Y", frequency: .01971},
        {letter: "Z", frequency: .00074}
      ];      
      var width = 1000,
      height = 600,
      title = "Bar Chart",
      chartSeries = [
        {
          field: 'frequency',
          name: 'Frequency'
        }
      ],
      x = function(d) {
        return d.letter;
      },
      xScale = 'ordinal',
      xLabel = "Letter",
      yLabel = "Frequency",
      yTicks = [20, "%"];      
    return (
      <div>    
          <Segment style={{ padding: '2em', paddingTop: '2em' }} vertical>           
          <Container text style={{marginBottom:'2em'}}>
          <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>X Dog Park</Header>
          </Container>
          <Segment attached>
            Address: 123 West Avenue
        </Segment>
        <Segment attached>
            Average number of visitors: 5
        </Segment>
        <Segment attached style={{marginBottom:'10px'}}>
            Dogs are one type of animal.
        </Segment>
        <Image size='big' centered={true} src='https://react.semantic-ui.com/assets/images/wireframe/image.png' fluid />
          <Grid celled>
          <Grid.Row>
          <Grid.Column width={16}>              
          <Segment>
            Select day to view number of people:
            <input style={{marginLeft:"10px"}} name="selectDate" type="date"/>
            
            </Segment>
          <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>Purchase Map</Header>
          <div
          style={{"marginLeft":"auto"}}
          className="segment centered"
          >
          <BarChart
          style={{"marginLeft":"500px"}}
          title= {title}
          data= {D3data}
          width= {width}
          height= {height}
          chartSeries = {chartSeries}
          x= {x}
          xLabel= {xLabel}
          xScale= {xScale}
          yTicks= {yTicks}
          yLabel = {yLabel}
          textAlign='center'/>                   
          </div>
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