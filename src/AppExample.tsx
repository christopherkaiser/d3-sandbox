import React from 'react';
import './App.css';
import * as d3 from 'd3';
import data from './data/data.json';

const log = () => {
  let link = d3.selectAll('a');
  console.log(link.nodes());
}


var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];

const scaleBar = (selection: d3.Selection<SVGRectElement, {}, null, undefined>, scale: Number) => {
  selection.style('transform', 'scaleX(' + scale + ')');
}

const setFill = (selection: d3.Selection<SVGRectElement, {}, null, undefined>, color: string ) => {
  selection.style('fill', color, undefined);
}

const fade = (selection: d3.Selection<null, undefined, null, undefined>, opacity: number ) => {
  selection.style('fill-opacity', opacity, undefined);
}


class App extends React.Component {
  componentDidMount(){
    const bar = d3.select('.chart')
      .append('svg')
        .attr('width', 225)
        .attr('height', 300)
      .selectAll('g')
      .data(scores)
      .enter()
        .append('g')
        .attr('transform', (d, i) => 'translate(0, ' + i * 33 + ')');

    bar.append('rect')
        .style('width', d => d.score)
        .attr('class', 'bar')
        .on('mouseover', function (d, i, elements: any) {
          d3.select(this)
            .call(scaleBar, 2)
            .call(setFill, 'orange');

          d3.selectAll(elements)
            .filter(':not(:hover)')
            .call(fade, 0.5);
        })
        .on('mouseout', function (d, i, elements: any) {
          d3.select(this)
            .call(scaleBar, 1)
            .call(setFill, 'lightgreen');

          d3.selectAll(elements)
            .filter(':not(:hover)')
            .call(fade, 1);
        });
    
    bar.append('text')
      .attr('y', 20)
      .text((d) => d.name)
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