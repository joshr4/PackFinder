import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
  Label,
  Embed,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Checkbox,
  Tab,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import axios from 'axios';
var Chart = require('react-d3-core').Chart;
import { BarChart, LineChart } from 'react-d3-basic';
import AddVisitForm from './addvisitform';
import { DogParkItem } from '.';
import {
  getVisits,
  deleteVisit,
  updateVisit,
  addVisit,
  getParksAddresses,
} from '../store';
import { connect } from 'react-redux';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryArea, VictoryTheme } from 'victory';

// var LineChart = require('react-d3-basic').LineChart;

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
let monthName = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};
let WDMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

let timeDisplay = function(dateObj, military = false) {
  if (dateObj == '') {
    return '';
  }
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let outputString = '';
  let suffix = '';
  if (!military) {
    if (hour >= 12) {
      hour -= 12;
      suffix = ' PM';
    } else {
      suffix = ' AM';
    }
  }
  let hourString = hour < 10 ? '0' + hour + ':' : hour + ':';
  let minuteString = minutes < 10 ? '0' + minutes : minutes;
  outputString = hourString + minuteString + suffix;
  return outputString;
};

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
  // console.log("dateDisplay: ", monthName[M])
  // month = monthName[month];
  // return month + "-" + day;
};

let stringDate = function(dateObj) {
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  return monthName[month] + ' ' + day;
};

let strfTime = function(dateObj) {
  if (dateObj == '') {
    return '';
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
  let hourString = hour < 10 ? '0' + hour + ':' : hour + ':';
  let minuteString = minutes < 10 ? '0' + minutes : minutes;
  let TString = hourString + minuteString;

  return DString + ' ' + TString;
};

let hourString = function(dtObj) {
  let hour = dtObj.getHours() + 1;
  let minutes = dtObj.getMinutes();
  let output = hour + ' AM';
  if (hour == 12) {
    output = hour + ' PM';
  }
  if (hour > 12) {
    output = hour - 12 + ' PM';
  }
  return output;
};

let stringFormat = function(dateObj) {
  if (dateObj == '') {
    return '';
  }
  let year = dateObj.getFullYear();
  let day = dateObj.getDate();
  let month = dateObj.getMonth();
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let outputString = '';
  outputString =
    year + '-' + (month + 1) + '-' + day + ' ' + hour + ':' + minutes;
  return outputString;
};

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
};

let halfHourpartition = 1000 * 60 * 30;
let hourPartition = 1000 * 60 * 60;
let dayPartition = 24 * hourPartition;

export class DogPark extends Component {
  constructor(props) {
    super(props);
    let thisDate = new Date(Date.now());
    let thisDateString = YmDFormat(thisDate);
    this.state = {
      now: thisDate,
      nowString: thisDateString,
      visits: [],
      minT: '',
      maxT: '',
      xIndices: [],
      d3Data: [],
      maxVisits: 1,
      userId: 1,
      parkId: 1,
      park: {
        address: {
          line_1: '',
          location: {
            lat: 41.895266,
            lng: -87.6412237,
          },
        },
      },
      addFormFieldData: {
        park: parseInt(props.match.params.id),
        start: moment().format('HH:mm'),
        end: '20:00',
        visitDate: moment().format('YYYY-MM-DD'),
      },
      selectedDate: '',
      dayView: false,
      timePartition: dayPartition,
      dayOptions: [],
      weekDayOptions: [
        { val: 'daily', display: 'All Days' },
        { val: 'weekly/1', display: 'Monday' },
        { val: 'weekly/2', display: 'Tuesday' },
        { val: 'weekly/3', display: 'Wednesday' },
        { val: 'weekly/4', display: 'Thursday' },
        { val: 'weekly/5', display: 'Friday' },
        { val: 'weekly/6', display: 'Saturday' },
        { val: 'weekly/0', display: 'Sunday' },
      ],
      map: null,
      location: {
        lat: 41.895266,
        lng: -87.6412237,
      },
      slider: 1,
      showModal: false,
      averageData: [],
      weekChartVal: 'daily',
      loading: true,
      popularChartTitle: 'All Days',
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeweekDay = this.changeweekDay.bind(this);
    this.updateD3 = this.updateD3.bind(this);
    this.clearDate = this.clearDate.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  mapLoaded(map) {
    if (this.state.map !== null) {
      return;
    }
    this.setState({ map });
  }

  async updateD3() {
    let parkId = this.props.match.params.id;
    let parkVisitsURL = `/api/parks/${parkId}/visits`;
    let averageVisitsURL = `/api/parks/${parkId}/visits/data/average/${
      this.state.weekChartVal
    }`; //Daily average route
    let fullWeekURL = `/api/parks/${parkId}/visits/data/average/weekly/average`; //Full week view
    let averageDataResponse = await axios.get(averageVisitsURL);
    // console.log('averageVisitsURL: ', averageVisitsURL);
    // console.log('averageData: ', averageDataResponse.data);
    let fullWeekResponse = await axios.get(fullWeekURL);
    this.setState({
      averageData: averageDataResponse.data,
      fullWeekData: fullWeekResponse.data,
    });

    axios.get(parkVisitsURL).then(response => {
      let visits = response.data;
      let filteredEvents = this.props.events.filter(
        event => event.parkId == this.props.match.params.id
      );
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
        if (minT == '' || (startT < minT && !this.state.dayView)) {
          minT = startT;
        }
        if (dateMin == '' || startT < dateMin) {
          dateMin = startT;
        }

        if (maxT == '' || (endT > maxT && !this.state.dayView)) {
          maxT = endT;
        }
        if (dateMax == '' || endT > dateMax) {
          dateMax = endT;
        }
      });

      let d3Data = [];
      let width = maxT - minT;
      let halfHourpartition = 1000 * 60 * 30;
      let hourPartition = 1000 * 60 * 60;

      let datewidth = dateMax - dateMin;
      let dayPartition = 24 * hourPartition;
      let nDays = datewidth / dayPartition;
      let dayOptions = [];
      let dateOnlyMin = new Date(
        dateMin.getFullYear(),
        dateMin.getMonth(),
        dateMin.getDate(),
        0,
        0
      );
      for (let i = 0; i < nDays; i++) {
        let dayOption = new Date(dateOnlyMin.getTime() + dayPartition * i);
        let dayOptionString =
          dateDisplay(dayOption) + '/' + dateOnlyMin.getFullYear();
        let elem = {
          val: dateOnlyMin.getFullYear() + '/' + dateDisplay(dayOption),
          display: dayOptionString,
        };
        dayOptions.push(elem);
      }
      this.setState({
        dayOptions,
      });

      let nPartitions = width / this.state.timePartition;
      if (this.state.dayView) {
        nPartitions = 24;
      }
      let maxVisits = 0;
      for (let i = 0; i < nPartitions; i++) {
        let intervalStart = new Date(
          minT.getTime() + this.state.timePartition * i
        );
        if (!this.state.dayView) {
          let dateOnly = new Date(
            minT.getFullYear(),
            minT.getMonth(),
            minT.getDate(),
            0,
            0
          );
          intervalStart = new Date(
            dateOnly.getTime() + this.state.timePartition * i
          );
        }
        let intervalEnd = new Date(
          intervalStart.getTime() + this.state.timePartition
        );
        let d3Elem = {
          timeObj: intervalStart,
          time: stringFormat(intervalStart),
          date: dateDisplay(intervalStart),
          dateString: stringDate(intervalStart),
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
          } else {
            // d3Elem.time = timeDisplay(intervalStart);
            // d3Elem.dateString = timeDisplay(intervalStart);
            d3Elem.time = hourString(intervalStart);
            d3Elem.dateString = hourString(intervalStart);
          }
          if (startT < intervalEnd && endT > intervalStart) {
            d3Elem.visits++;
          }
        });
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
      });
    });
  }
  componentDidMount() {
    let parkId = this.props.match.params.id;
    let parkURL = `/api/parks/${parkId}`;
    let parkVisitsURL = `/api/parks/${parkId}/visits`;
    let parkArray = this.props.parkList.filter(
      park => park.id == this.props.match.params.id
    );
    axios.get(`/api/parks/${parkId}`).then(response => {
      this.setState({
        park: response.data,
      });
    });
    this.props.getData().then(() => {
      this.updateD3();
    });
    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1500);
    }
  }
  addEvent = () => {
    let stateVisit = this.state.addFormFieldData;
    let year = parseInt(stateVisit.visitDate.split('-')[0]);
    let month = parseInt(stateVisit.visitDate.split('-')[1]) - 1;
    let day = parseInt(stateVisit.visitDate.split('-')[2]);
    let fromHour = parseInt(stateVisit.start.split(':')[0]);
    let fromMin = parseInt(stateVisit.start.split(':')[1]);
    let toHour = parseInt(stateVisit.end.split(':')[0]);
    let toMin = parseInt(stateVisit.end.split(':')[1]);
    let startTime = new Date(year, month, day, fromHour, fromMin);
    let endTime = new Date(
      year,
      month,
      day,
      fromHour,
      fromMin + 30 * this.state.slider
    );
    let newVisitInfo = {
      start: startTime,
      end: endTime,
      parkId: stateVisit.park,
      userId: this.props.user.id,
      title: this.props.parkList.filter(park => park.key === stateVisit.park)[0]
        .text,
    };
    //ADD IN USER ID TO POST REQUEST
    this.props.addNewVisit(newVisitInfo).then(result => {
      this.updateD3();
    });
    this.setState({ loading: true });
    this.toggleModal();
  };

  handleChange = (e, data) => {
    this.setState({
      addFormFieldData: Object.assign(this.state.addFormFieldData, {
        [e.target.name]: e.target.value,
      }),
    });
  };
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  async changeDate(event) {
    event.preventDefault();
    let splitDate = event.target.selectDate.value.split('/');
    // dayView = true;
    let selectedDate = new Date(
      parseInt(splitDate[0]),
      parseInt(splitDate[1]) - 1,
      parseInt(splitDate[2])
    );
    await this.setState({
      timePartition: hourPartition,
      dayView: true,
      selectedDate: selectedDate,
    });
    this.updateD3();
  }
  changeweekDay(event) {
    // console.log('changing week day...');
    event.preventDefault();
    let weekChartVal = event.target.selectweekDay.value;
    let newChartTitle = 'All Days';
    if (weekChartVal.split('/').length > 1) {
      newChartTitle = WDMap[parseInt(weekChartVal.split('/')[1])];
    }
    this.setState({
      weekChartVal,
      popularChartTitle: newChartTitle,
      // timePartition: hourPartition,
      // dayView: true,
      // selectedDate: selectedDate,
    });
    this.updateD3();
  }
  clearDate(event) {
    event.preventDefault();
    this.setState({
      timePartition: dayPartition,
      dayView: false,
      selectedDate: '',
    });
    this.updateD3();
  }
  handleSliderChange = e => {
    this.setState({ slider: e.target.value });
  };
  render() {
    // this.setState({loading:true});
    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1500);
    }
    const { children } = this.props;
    const { fixed } = this.state;
    const courses = [1, 2, 3, 4, 5, 6, 7, 8];
    const videos = ['1', '2', '3', '4', '5'];
    const items = [
      {
        childKey: 0,
        image:
          'https://react.semantic-ui.com/assets/images/wireframe/image.png',
        header: 'Header',
        description: 'Description',
        meta: 'Metadata',
        extra: 'Extra',
      },
      {
        childKey: 1,
        image:
          'https://react.semantic-ui.com/assets/images/wireframe/image.png',
        header: 'Header',
        description: 'Description',
        meta: 'Metadata',
        extra: 'Extra',
      },
    ];
    const simpleList = courses.map(val => (
      <li key={val} data-id={val}>
        List Item {val}
      </li>
    ));

    const ItemExampleProps = () => <Item.Group items={items} />;
    var D3data = [{ letter: 'Z', visits: 0.00074 }];
    var D3data = this.state.d3Data;
    // var parseDate = d3.time.format("%m/%d/%y").parse;
    var parseDate = d3.time.format('%Y-%m-%d %H:%M').parse;
    var width = 1500,
      height = 600,
      title = 'Bar Chart',
      chartSeries = [
        {
          field: 'visits',
          name: 'Visits',
        },
      ],
      x = function(d) {
        if (typeof d.time === typeof 'string') {
          return d.time;
        } else if (d.time) {
          return parseDate(d.time.toString());
        }
      },
      xScale = 'ordinal',
      xLabel = 'Time',
      yLabel = 'Visitors',
      yTicks = [Math.min(this.state.maxVisits, 10), 'd'],
      yDomain = [0, 3],
      xTicks = [d3.time.days, 1];
    const testData = [
      { time: 1, visits: 13000 },
      { time: 2, visits: 16500 },
      { time: 3, visits: 14250 },
      { time: 4, visits: 19000 },
    ];
    const victoryData = [];

    D3data.forEach(elem => {
      let victoryObj = {
        visits: elem.visits,
      };
      if (elem.timeObj) {
        victoryObj.time = elem.timeObj;
      }
      victoryObj.time = elem.dateString;
      victoryData.push(victoryObj);
    });
    console.log("victoryData: ", victoryData);
    const styles = {
      dashboardList: {
        boxShadow:
          '  rgba(0, 0, 0, 0.2) 2px 3px 11px, rgba(0, 0, 0, 0.2) 1px 2px 9px',
        width: '100%',
        padding: 0,
      },
    };

    const panes = [
      {
        menuItem: 'Check-Ins',
        render: () => (
          <Tab.Pane>
            <Form onSubmit={this.changeDate} style={{ marginBottom: '35px', paddingTop:'10px' }}>
              Select specific day to view:
              <select
                name="selectDate"
                style={{
                  width: 'auto',
                  display: 'inline-block',
                  marginRight: '10px',
                  marginLeft: '10px',
                }}
              >
                {this.state.dayOptions.map(elem => {
                  return (
                    <option key={elem.val} value={elem.val}>
                      {elem.display}
                    </option>
                  );
                })}
              </select>
              <Button
                type="submit"
                name="submitDate"
                style={{ marginLeft: '10px' }}
                color="blue"
                size="tiny"
              >
                Select Day
              </Button>
              {this.state.dayView ? (
                <Button
                  onClick={this.clearDate}
                  name="clearDate"
                  style={{ marginLeft: '10px' }}
                  color="green"
                  size="tiny"
                >
                  Clear
                </Button>
              ) : null}
            </Form>
            <VictoryChart
              title="Visitors"
              style={{ labels: { fontSize: '10px', color: 'red' }, marginTop:'15px' }}
              height={275}
              // width="auto"
              padding={{ top: 20, bottom: 50, left: 50, right: 50 }}
              // domainPadding={20}
              // domainPadding={{ x: [20, 0] }}
              // theme={VictoryTheme.material}
            >
              <VictoryAxis
                // scale="time"
                style={{
                  tickLabels: { fontSize: '8px', padding: 10, 
                  angle: 315
                 },
                  axis: { stroke: '#000000', strokeWidth: 2 },
                }}
                // fixLabelOverlap={true}                domain={[0, this.state.maxVisits]}
                tickCount={this.state.dayView ? null : victoryData.length}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  tickLabels: { fontSize: '8px', padding: 5 },
                  axis: { stroke: '#000000', strokeWidth: 2 },
                }}
                tickFormat={x => ` ${x} visits`}
                tickFormat={d3.format(',d')}
                label="Visits"
                domain={[0, this.state.maxVisits]}
              />
              <VictoryBar
                data={victoryData}
                // alignment={this.state.dayView ? 'start' : 'middle'}
                barRatio={0.5}
                alignment="start"
                style={{
                  tickLabels: { fontSize: '10px', padding: 5 },
                  data: {
                    fill: '#54B8BF',
                    stroke: '#000000',
                    strokeWidth: 1,
                    // border:"2px solid black"
                  },
                }}
                x="time"
                y="visits"
              />
            </VictoryChart>
          </Tab.Pane>
        ),
      },

      {
        menuItem: 'Popular Times',
        //#weekchart
        render: () => (
          <Tab.Pane>
            <Form onSubmit={this.changeweekDay}>
              Select day of week to view:
              <select
                name="selectweekDay"
                style={{
                  width: 'auto',
                  display: 'inline-block',
                  marginRight: '10px',
                  marginLeft: '10px',
                }}
              >
                {this.state.weekDayOptions.map(elem => {
                  return (
                    <option key={elem.val} value={elem.val}>
                      {elem.display}
                    </option>
                  );
                })}
              </select>
              <Button
                type="submit"
                style={{ marginLeft: '10px' }}
                color="blue"
                size="tiny"
              >
                Select Day
              </Button>
            </Form>
            <VictoryChart
              style={{ labels: { fontSize: '10px', color: 'red' } }}
              domainPadding={20}
              padding={{ top: 0, bottom: 50, left: 50, right: 50 }}
              height={250}
            >
              <VictoryAxis
                style={{
                  tickLabels: { fontSize: '8px', padding: 5 },
                  axis: { stroke: '#000000', strokeWidth: 2 },
                }}
                fixLabelOverlap={true}
                label="Time"
              />
              <VictoryAxis
                dependentAxis
                domain={this.state.averageData.hasVisits ? null : [0, 1]}
                style={{
                  tickLabels: {
                    fontSize: '8px',
                    padding: 5,
                  },
                  axis: { stroke: '#000000', strokeWidth: 2 },
                }}
                tickFormat={x => ` ${x}`}
                label="Average Daily Visits"
              />
              <VictoryBar
                alignment="start"
                data={this.state.averageData.dataArray}
                barRatio={1}
                style={{
                  tickLabels: { fontSize: '7px', padding: 5 },
                  data: {
                    fill: '#54B8BF',
                    stroke: '#000000',
                    strokeWidth: 1,
                    // border:"2px solid black"
                  },
                }}
                x="timeString"
                y="average"
              />
            </VictoryChart>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Popular Days',
        //#weekchart
        render: () => (
          <Tab.Pane>
            <VictoryChart
              style={{ labels: { fontSize: '10px', color: 'red' }, 
              'marginTop': '37px' 
            }}
              domainPadding={20}
              padding={{ top: 30, bottom: 50, left: 50, right: 50 }}
              height={250}
            >
              <VictoryAxis
                style={{
                  tickLabels: { fontSize: '7px', padding: 5 },
                  axis: { stroke: '#000000', strokeWidth: 2 },
                }}
              />
              <VictoryAxis
                dependentAxis
                domain={this.state.fullWeekData.hasVisits ? null : [0, 1]}
                style={{
                  tickLabels: { fontSize: '7px', padding: 5 },
                  axis: { stroke: '#000000', strokeWidth: 2 },
                }}
                tickFormat={x => ` ${x}`}
                label="Average Daily Visits"
              />
              <VictoryBar
                data={this.state.fullWeekData.dataArray}
                barRatio={1}
                style={{
                  tickLabels: { fontSize: '7px', padding: 5 },
                  data: {
                    fill: '#54B8BF',
                    stroke: '#000000',
                    strokeWidth: 1,
                    // border:"2px solid black"
                  },
                }}
                x="name"
                y="average"
              />
            </VictoryChart>
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div className="container" style={{ overflowY: 'scroll' }}>
        {this.state.loading ? (
          <Dimmer active>
            <Loader className="massive" content="Loading" />
          </Dimmer>
        ) : (
          <Dimmer>
            <Loader className="massive" content="Loading" />
          </Dimmer>
        )}
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
        <Grid
          centered
          // className="overflow-scroll"
          style={{ height: '80vh' }}
        >
          <Grid.Row>
            <Grid.Column width={8}>
              <Card style={styles.dashboardList}>
                <Card.Content style={{ padding: '0' }}>
                  <DogParkItem
                    checkIn={this.toggleModal}
                    park={this.state.park}
                  />
                </Card.Content>
                <Card.Content style={{ padding: '0' }}>
                  {/* <Segment height="auto"> */}
                    <Tab panes={panes} />
                  {/* </Segment> */}
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={7}>
              <SingleParkMap
                zoom={15}
                center={this.state.park.address.location}
                mapLoaded={this.mapLoaded.bind(this)}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
              {/*<Image size="big"  centered={true} src={this.state.park.imageUrl} />*/}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br /> <br /> <br />
      </div>
    );
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
      userId: visit.userId,
    };
    return newVisit;
  });
  //{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }
  let dropDownParks = state.parkList.map(park => {
    let newPark = {
      key: park.id,
      value: park.id,
      text: park.name,
    };
    return newPark;
  });
  return {
    events: calEvents,
    user: state.user,
    parkList: dropDownParks,
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
export default connect(mapState, mapDispatch)(DogPark);
