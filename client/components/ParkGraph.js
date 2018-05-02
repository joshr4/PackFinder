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
export class ParkGraph extends Component {
  constructor() {
    super()
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
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
    )
  }
}

export default ParkGraph