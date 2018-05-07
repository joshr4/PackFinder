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
  Label, Embed,
  Form, Input, Radio, Select, TextArea, Checkbox
} from 'semantic-ui-react'
import axios from 'axios'
var Chart = require('react-d3-core').Chart;
import {BarChart, LineChart} from 'react-d3-basic'
import AddVisitForm from './addvisitform';

// var LineChart = require('react-d3-basic').LineChart;

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

let timeDisplay = function(dateObj, military=false) {
  if (dateObj == "") {
    return ""
  }
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let outputString = "";
  let suffix = "";
  if (!military) {
    if (hour >= 12) {
      hour -= 12;
      suffix = " PM";
    }
    else {
      suffix = " AM";
    }
  }
  let hourString = (hour < 10) ? "0" + hour + ":" : hour + ":";
  let minuteString = (minutes < 10) ? "0" + minutes : minutes;
  outputString = hourString + minuteString + suffix;
  return outputString;
}

let dateDisplay = function(dateObj) {
  let month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = dateObj.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  return month + "/" + day;
}

let strfTime = function(dateObj) {
  if (dateObj == "") {
    return ""
  }
  let month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = dateObj.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let DString = month + "/" + day;

  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let hourString = (hour < 10) ? "0" + hour + ":" : hour + ":";
  let minuteString = (minutes < 10) ? "0" + minutes : minutes;
  let TString = hourString + minuteString;

  return DString + " " + TString;
}

let stringFormat = function(dateObj) {
  if (dateObj == "") {
    return ""
  }
  let year = dateObj.getFullYear();
  let day = dateObj.getDate();
  let month = dateObj.getMonth();
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let outputString = "";
  outputString = year + "-" + (month + 1) + "-" + day + " " + hour + ":" + minutes;
  return outputString;
}

let YmDFormat = function(dateObj) {
  let year = dateObj.getFullYear();
  let day = dateObj.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return year + "-" + month + "-" + day;
}

export class DogPark extends Component {
  constructor() {
    super()
    let thisDate = new Date(Date.now());
    let thisDateString = YmDFormat(thisDate);
    this.state = {
      now: thisDate,
      nowString:thisDateString,
      visits:[],
      minT: "",
      maxT: "",
      xIndices: [],
      d3Data: [
          {letter: "Z", visits: .00074},
          {time: "test", visits: .00074},
          {time: "test2", visits: .00074}
      ],
      maxVisits: 0,
      userId: 1,
      parkId: 1,
      park:{}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
      let parkId = this.props.match.params.id;
      axios.get(`api/parks/${parkId}`).then(response => {
        this.setState({
            park:response.data
        })
      });
    axios.get("api/visits").then(response => {
      let visits = response.data;
      let minT = "";
      let maxT = "";
      visits.forEach(visit => {
        let startT = new Date(visit.start);
        let endT = new Date(visit.end);
        if (minT == "" || startT < minT) {
          minT = startT;
        }
        if (maxT == "" || endT > maxT) {
          maxT = endT;
        }
      })
      let d3Data = [];
      let width = maxT - minT;
      console.log("width: ", width);
      let halfHourpartition = 1000*60*30;
      let hourPartition = 1000*60*60;
      console.log("partition: ", hourPartition);
      let nPartitions = width/hourPartition;
      console.log("nPartitions: ", nPartitions);
      let maxVisits = 0;

      for (let i = 0; i < nPartitions; i ++) {
        let intervalStart = new Date(minT.getTime() + hourPartition*i);
        let intervalEnd = new Date(minT.getTime() + hourPartition*(i + 1));
        let d3Elem = {
          // time: intervalStart,
          time: stringFormat(intervalStart),
          date: dateDisplay(intervalStart),
          timeDisplay: timeDisplay(intervalStart),
          strfTime: strfTime(intervalStart),
          // time: timeDisplay(intervalStart, true),
          // time: intervalStart.getTime(),
          visits: 0,
        };
        visits.forEach(visit => {
          let startT = new Date(visit.start);
          let endT = new Date(visit.end);
          // Setting X-label
          d3Elem.time = dateDisplay(intervalStart);
          if (startT.getHours() == 0) {
            // d3Elem.time = dateDisplay(intervalStart);
          }
          else {
            d3Elem.time = timeDisplay(intervalStart);
          }
          if ((startT < intervalEnd && endT > intervalStart)) {
            console.log("adding visit: ", intervalStart, intervalEnd, "|", startT, endT);
            d3Elem.visits ++;
          }
        })
        if (d3Elem.visits > maxVisits) {
          maxVisits = d3Elem.visits;
        }
        d3Data.push(d3Elem);
        console.log(i, " intervalStart: ", intervalStart);
      }
      console.log("d3Data loaded: ", d3Data);

      this.setState({
        visits,
        minT,
        maxT,
        d3Data,
        maxVisits,
      })
    })
  }
  handleSubmit(event) {
    console.log("line 193 handling submit: ", event, event.target);
    console.log('event.target: ', event.target);
    let visitDate = event.target.visitDate.value;
    let fromTime = event.target.fromTime.value;
    let toTime = event.target.toTime.value;
    let newVisitInfo = {
      userId: this.state.userId,
      parkId: this.state.parkId
    }
    let year = parseInt(visitDate.split("-")[0]);
    let month = parseInt(visitDate.split("-")[1]) - 1;
    let day = parseInt(visitDate.split("-")[2]);
    let fromHour = parseInt(fromTime.split(":")[0]);
    let fromMin = parseInt(fromTime.split(":")[1]);
    let toHour = parseInt(toTime.split(":")[0]);
    let toMin = parseInt(toTime.split(":")[1]);
    let startTime = new Date(year, month, day, fromHour, fromMin);
    let endTime = new Date(year, month, day, toHour, toMin);
    newVisitInfo.start = startTime;
    newVisitInfo.end = endTime;
    console.log("newVisitInfo: ", newVisitInfo);
    axios.post("api/visits", newVisitInfo).then(response => {
      console.log("visit post reponse: ", response.data);
    })
  }
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
      console.log("test");
      const { children } = this.props
      const { fixed } = this.state
      const courses = [1, 2, 3, 4, 5, 6, 7, 8]
      console.log("this.state: ", this.state);
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
        {letter: "Z", visits: .00074},
      ];
      var D3data = this.state.d3Data;
      // var parseDate = d3.time.format("%m/%d/%y").parse;
      var parseDate = d3.time.format("%Y-%m-%d %H:%M").parse;
      var width = 1000,
      height = 600,
      title = "Bar Chart",
      chartSeries = [
        {
          field: 'visits',
          name: 'Visits'
        }
      ],
      x = function(d) {
        // console.log("d.time: ", d.time, typeof (d.time));
        if (typeof (d.time) === typeof ("string")) {
          return d.time;
        }
        else if (d.time) {
          // console.log("parsedDate: ", parseDate(d.time.toString()));
          return parseDate(d.time.toString());
        }
      },
      xScale = 'ordinal',
      xLabel = "Time",
      yLabel = "Visitors",
      yTicks = [this.state.maxVisits, "d"],
      yDomain = [0, 3],
      // .ticks(d3.time.days, 1)
      // .tickFormat((true) ? d3.time.format('%H:%M') : "")
      xTicks = [d3.time.hours, 1]
      ;
      // var xScale = d3.time.scale()
      // .domain([mindate, maxdate])
    return (
      <div>
          <Segment style={{ padding: '2em', paddingTop: '2em' }} vertical>
          <Container text style={{marginBottom:'2em'}}>
          <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>{this.state.park.name}</Header>
          </Container>
          <Grid celled>
          <Grid.Row>
        <Grid.Column width={8}>
          <Segment attached>
          {this.state.park.address}
          </Segment>
          <Segment attached>
          {this.state.park.averageVisitors}
          </Segment>
          <Segment attached>
          {this.state.park.description}
          </Segment>
          <Segment attached style={{marginBottom:'10px'}}>
          <Header as='h5' style={{ fontSize: '2em' }}>Schedule A Visit</Header>
          <AddVisitForm
          nowString={this.state.nowString}
          handleSubmit={this.handleSubmit} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Image size='big' centered={true} src={this.state.park.imageUrl} fluid />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
          <Segment>
            Select day to view number of people:
            <input style={{marginLeft:"10px"}} name="selectDate" type="date"/>

            </Segment>
          <Header as='h3' style={{ fontSize: '3em' }} textAlign='center'>Visitors</Header>
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
          xTicks={xTicks}
          yTicks= {yTicks}
          // yDomain= {yDomain}
          // yLabel = {yLabel}
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

export default DogPark
