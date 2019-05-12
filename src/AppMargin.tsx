import React from 'react';
import './App.css';
import * as d3 from 'd3';
import data from './data/data.json';

const margin = {
  top: 10,
  right: 0,
  bottom: 30,
  left: 40 
};

const width = 425 - margin.left - margin.right;
const height = 625 - margin.top - margin.bottom;


class App extends React.Component {
  componentDidMount(){
    const svg = d3.select('.chart')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.append('rect')
      .attr('width', width / 2)
      .attr('height', height)
      .style('fill', 'lightblue')
      .style('stroke', 'green');

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    const yAxis = d3.axisLeft(yScale);
    svg.call(yAxis);
  }
  render = () => {
    return (
      <div className="chart" />
    );
  }
}


export default App;

/*
const linearScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 1])
  .clamp(true);

const timeScale = d3.scaleTime()
  .domain([new Date(2016, 0, 1), new Date()])
  .range([0, 100]);

const quantizeScale = d3.scaleQuantize()
  .domain([0, 100]);
  //.range(["red", "white", "green"]);

const ordinalScale = d3.scaleOrdinal()
  .domain(["poor", "good", "great"])
  .range(["red", "white", "green"]);

const min = d3.min(data, (d) => d.age);
const max = d3.max(data, (d) => d.age);
console.log(`${min} : ${max}`);
*/