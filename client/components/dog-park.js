import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { SingleParkMap, ParkListItem, VisitModal } from './index.js';
import moment from 'moment';
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
import { getVisits, deleteVisit, updateVisit, addVisit, getParksAddresses } from '../store';
import { connect } from 'react-redux';

// var LineChart = require('react-d3-basic').LineChart;

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

let timeDisplay = function(dateObj, military = false) {
  if (dateObj == '') {
    return ''
  }
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let outputString = '';
  let suffix = '';
  if (!military) {
    if (hour >= 12) {
      hour -= 12;
      suffix = ' PM';
    }
    else {
      suffix = ' AM';
    }
  }
  let hourString = (hour < 10) ? '0' + hour + ':' : hour + ':';
  let minuteString = (minutes < 10) ? '0' + minutes : minutes;
  outputString = hourString + minuteString + suffix;
  return outputString;
}

let dateDisplay = function(dateObj) {
  let month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let day = dateObj.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  return month + '/' + day;
}

let strfTime = function(dateObj) {
  if (dateObj == '') {
    return ''
  }
  let month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let day = dateObj.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let DString = month + '/' + day;

  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let hourString = (hour < 10) ? '0' + hour + ':' : hour + ':';
  let minuteString = (minutes < 10) ? '0' + minutes : minutes;
  let TString = hourString + minuteString;

  return DString + ' ' + TString;
}

let stringFormat = function(dateObj) {
  if (dateObj == '') {
    return ''
  }
  let year = dateObj.getFullYear();
  let day = dateObj.getDate();
  let month = dateObj.getMonth();
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let outputString = '';
  outputString = year + '-' + (month + 1) + '-' + day + ' ' + hour + ':' + minutes;
  return outputString;
}

let YmDFormat = function(dateObj) {
  let year = dateObj.getFullYear();
  let day = dateObj.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  return year + '-' + month + '-' + day;
}

let halfHourpartition = 1000 * 60 * 30;
let hourPartition = 1000 * 60 * 60;
let dayPartition = 24 * hourPartition;

export class DogPark extends Component {
  constructor(props) {
    super(props)
    let thisDate = new Date(Date.now());
    let thisDateString = YmDFormat(thisDate);
    this.state = {
      now: thisDate,
      nowString: thisDateString,
      visits: [],
      minT: '',
      maxT: '',
      xIndices: [],
      d3Data: [
          {letter: 'Z', visits: 0.00074},
          {time: 'test', visits: 0.00074},
          {time: 'test2', visits: 0.00074}
      ],
      maxVisits: 0,
      userId: 1,
      parkId: 1,
      park: {
        address: {
        line_1: '',
        location: {
          lat: 41.895266,
          lng: -87.6412237,
        }
      }
    },
      addFormFieldData: {
        park: parseInt(props.match.params.id),
        start: moment().format('HH:mm'),
        end: '20:00',
        visitDate: moment().format('YYYY-MM-DD'),
      },
      selectedDate: "",
      dayView: false,
      timePartition: dayPartition,
      dayOptions: [],
      map: null,
      location: {
        lat: 41.895266,
        lng: -87.6412237
      },
      slider: 1,
      showModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.updateD3 = this.updateD3.bind(this);
    this.clearDate = this.clearDate.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  mapLoaded(map){
    if (this.state.map !== null){
      return
    }
    this.setState({ map })
  }

  updateD3() {
    let parkId = this.props.match.params.id;
    let parkVisitsURL = `/api/parks/${parkId}/visits`;

    axios.get(parkVisitsURL).then(response => {
      let visits = response.data;
      let filteredEvents = this.props.events.filter(event => event.parkId == this.props.match.params.id);
      visits = filteredEvents;
      // let visits = this.props.events;
      let dateMin = '';
      let dateMax = '';
      let minT = '';
      let maxT = '';
      if (this.state.dayView) {
        minT = this.state.selectedDate;
        let plusOne = minT;
        plusOne = new Date(minT.getTime() + dayPartition);
        maxT = plusOne;
      }
      visits.forEach(visit => {
      let startT = new Date(visit.start);
        let endT = new Date(visit.end);
        if (minT == '' || startT < minT && !this.state.dayView) {
            minT = startT;
        }
        if (dateMin == '' || startT < dateMin) {
          dateMin = startT;
        }

        if (maxT == '' || endT > maxT && !this.state.dayView) {
          maxT = endT;
        }
        if (dateMax == '' || endT > dateMax) {
          dateMax = endT;
        }
      })

      let d3Data = [];
      let width = maxT - minT;
      let halfHourpartition = 1000 * 60 * 30;
      let hourPartition = 1000 * 60 * 60;


      let datewidth = dateMax - dateMin;
      let dayPartition = 24 * hourPartition;
      let nDays = datewidth/dayPartition;
      let dayOptions = [];
      let dateOnlyMin = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate(), 0, 0);
      for (let i = 0; i < nDays; i++) {
        let dayOption = new Date(dateOnlyMin.getTime() + dayPartition * i);
        let dayOptionString = dateDisplay(dayOption) + "/" + dateOnlyMin.getFullYear();
        let elem = {
          val: dateOnlyMin.getFullYear() + "/" + dateDisplay(dayOption),
          display: dayOptionString,
        };
        dayOptions.push(elem);
      }
      this.setState({
        dayOptions,
      })

      let nPartitions = width / this.state.timePartition;
      if (this.state.dayView) {
        nPartitions = 24;
      }
      let maxVisits = 0;
      for (let i = 0; i < nPartitions; i++) {
        let intervalStart = new Date(minT.getTime() + this.state.timePartition * i);
        if (!this.state.dayView) {
          let dateOnly = new Date(minT.getFullYear(), minT.getMonth(), minT.getDate(), 0, 0);
          intervalStart = new Date(dateOnly.getTime() + this.state.timePartition * i);
        }
        let intervalEnd = new Date(intervalStart.getTime() + this.state.timePartition);
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
          if (!this.state.dayView) {
            d3Elem.time = dateDisplay(intervalStart);
          }
          else {
            d3Elem.time = timeDisplay(intervalStart);
          }
          if ((startT < intervalEnd && endT > intervalStart)) {
            d3Elem.visits++;
          }
        })
        if (d3Elem.visits > maxVisits) {
          maxVisits = d3Elem.visits;
        }
        d3Data.push(d3Elem);
      }
      this.setState({
        visits,
        minT,
        maxT,
        d3Data,
        maxVisits,
      })
    })
  }
  componentDidMount() {
    let parkId = this.props.match.params.id;
    let parkURL = `/api/parks/${parkId}`;
    let parkVisitsURL = `/api/parks/${parkId}/visits`;
    let parkArray = this.props.parkList.filter(park => park.id == this.props.match.params.id);
    axios.get(`/api/parks/${parkId}`).then(response => {
      this.setState({
        park:response.data
      })
    });
    this.props.getData().then(() => {
      this.updateD3();
    });
  }
  addEvent = () => {
    let stateVisit = this.state.addFormFieldData
    let year = parseInt(stateVisit.visitDate.split('-')[0]);
    let month = parseInt(stateVisit.visitDate.split('-')[1]) - 1;
    let day = parseInt(stateVisit.visitDate.split('-')[2]);
    let fromHour = parseInt(stateVisit.start.split(':')[0]);
    let fromMin = parseInt(stateVisit.start.split(':')[1]);
    let toHour = parseInt(stateVisit.end.split(':')[0]);
    let toMin = parseInt(stateVisit.end.split(':')[1]);
    let startTime = new Date(year, month, day, fromHour, fromMin);
    let endTime = new Date(year, month, day, fromHour, fromMin + 30 * this.state.slider);
    let newVisitInfo = {
      start: startTime,
      end: endTime,
      parkId: stateVisit.park,
      userId: this.props.user.id,
      title: this.props.parkList.filter(park => park.key === stateVisit.park)[0].text
    }
    //ADD IN USER ID TO POST REQUEST
    this.props.addNewVisit(newVisitInfo).then((result) => {
      this.updateD3();
    });
    this.toggleModal()
  }

  handleChange = (e, data) => {
    this.setState({
        addFormFieldData: Object.assign(this.state.addFormFieldData, {[e.target.name]: e.target.value})
    })
  }
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  changeDate(event) {
    event.preventDefault();
    let splitDate = event.target.selectDate.value.split("/");
    // dayView = true;
    let selectedDate = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]));
    this.setState({
      timePartition:hourPartition,
      dayView: true,
      selectedDate:selectedDate,
    })
    this.updateD3();
  }
  clearDate(event) {
    event.preventDefault();
    this.setState({
      timePartition:dayPartition,
      dayView: false,
      selectedDate:"",
    });
    this.updateD3();
  }
  handleSliderChange = e => {
    this.setState({ slider: e.target.value})
  }
  render() {
      const { children } = this.props
      const { fixed } = this.state
      const courses = [1, 2, 3, 4, 5, 6, 7, 8]
      const videos = ['1', '2', '3', '4', '5'];
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
        {letter: 'Z', visits: 0.00074},
      ];
      var D3data = this.state.d3Data;
      // var parseDate = d3.time.format("%m/%d/%y").parse;
      var parseDate = d3.time.format('%Y-%m-%d %H:%M').parse;
      var width = 1500,
      height = 600,
      title = 'Bar Chart',
      chartSeries = [
        {
          field: 'visits',
          name: 'Visits'
        }
      ],
      x = function(d) {
        if (typeof (d.time) === typeof ('string')) {
          return d.time;
        }
        else if (d.time) {
          return parseDate(d.time.toString());
        }
      },
      xScale = 'ordinal',
      xLabel = 'Time',
      yLabel = 'Visitors',
      yTicks = [Math.min(this.state.maxVisits, 10), 'd'],
      yDomain = [0, 3],
      // .ticks(d3.time.days, 1)
      // .tickFormat((true) ? d3.time.format('%H:%M') : "")
      // xTicks = [d3.time.format("%m-%d"), 3]
      xTicks = [d3.time.days, 1]
      ;
      // var xScale = d3.time.scale()
      // .domain([mindate, maxdate])
    // const markers = [
    //   {
    //     address: {
    //       location: {lat: 41.895266, lng: -87.641223}
    //     }
    //   }, {
    //     address: {
    //       location: {lat: 41.8788652, lng: -87.6262237}
    //     }
    //   }
    // ]

    return (

      <div>
        <VisitModal
          modalType={'add'}
          show={this.state.showModal}
          onClose={this.toggleModal}
          onDelete={() => {}}
          item={this.state.addFormFieldData}
          slider={this.state.slider}
          handleSubmit={this.addEvent}
          handleChange={this.handleChange}
          handleFieldChange={() => {}}
          parkList={this.props.parkList}
          onEdit={() => {}}
          handleEdit={this.updateEvent}
          handleSliderChange={this.handleSliderChange}
          noPark={true}
        />
          <Segment style={{ padding: '2em', paddingTop: '2em' }} vertical>
          <Container text style={{marginBottom: '2em'}}>
          <Header as="h3" style={{ fontSize: '3em' }} textAlign="center">{this.state.park.name}</Header>
          </Container>
          <Grid celled>
          <Grid.Row>
        <Grid.Column width={8}>
          <Segment attached>
          <b>Address: <br /></b>
          {this.state.park.address.line_1}
          </Segment>
          <Segment attached>
          {this.state.park.averageVisitors}
          </Segment>
          <Segment attached>
          <b>Description: <br /></b>
          {this.state.park.description}
          </Segment>
          <Button positive style={{margin: 10 }} type="submit" name="submitBtn" onClick={() => this.toggleModal()}>Check-in</Button>
        </Grid.Column>
        <Grid.Column width={8}>
            <SingleParkMap
            zoom={15}
            center={this.state.park.address.location}
            mapLoaded={this.mapLoaded.bind(this)}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          <Image size="big"  centered={true} src={this.state.park.imageUrl} />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
          <Segment>
          <Form onSubmit={this.changeDate}>
            Select day to view:

            <select name="selectDate" style={{"width":"auto", "display":"inline-block", "marginRight":"10px", "marginLeft":"10px"}}>
            {this.state.dayOptions.map(elem => {
              return(<option key={elem.val} value={elem.val}>{elem.display}</option>)
            })}
            </select>


            <Button type="submit" name="submitDate" style={{marginLeft: '10px'}} color='blue' size='tiny'>
              Select Day
            </Button>
            {this.state.dayView ? (
              <Button onClick={this.clearDate} name="clearDate" style={{marginLeft: '10px'}} color='green' size='tiny'>
                Clear
              </Button>
            ) : null}
          </Form>
            </Segment>
          <Header as="h3" style={{ fontSize: '3em' }} textAlign="center">Visitors</Header>
          <Segment style={{'margin': 'auto', 'textAlign': 'center'}}>
          <BarChart
          style={{'marginLeft': '500px'}}
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
          textAlign="center" />
          </Segment>
          </Grid.Column>
          </Grid.Row>
          </Grid>
          <br /> <br /> <br />
        </Segment>


        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">Sitemap</List.Item>
                    <List.Item as="a">Contact Us</List.Item>
                    <List.Item as="a">Religious Ceremonies</List.Item>
                    <List.Item as="a">Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">Banana Pre-Order</List.Item>
                    <List.Item as="a">DNA FAQ</List.Item>
                    <List.Item as="a">How To Access</List.Item>
                    <List.Item as="a">Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>Footer Header</Header>
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
const mapState = state => {
  let calEvents = state.visits.map(visit => {
    let newVisit = {
      id: visit.id,
      title: visit.title,
      start: new Date(visit.start),
      end: new Date(visit.end),
      address: visit.park.address,
      parkId: visit.park.id,
      userId: visit.userId
    }
    return newVisit
  })
  //{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }
  let dropDownParks = state.parkList.map(park => {
    let newPark = {
      key: park.id,
      value: park.id,
      text: park.name
    }
    return newPark
  })
  return {
    events: calEvents,
    user: state.user,
    parkList: dropDownParks
  };
};

const mapDispatch = dispatch => {
  return {
    async getData() {
      await dispatch(getVisits());
      await dispatch(getParksAddresses());
    },
    removeVisit(visit) {
      dispatch(deleteVisit(visit));
    },
    updateVisit(visit) {
      dispatch(updateVisit(visit));
    },
    async addNewVisit(visit) {
      await dispatch(addVisit(visit));
      await dispatch(getVisits());
    },
  };
};
export default connect(mapState, mapDispatch)(DogPark)
