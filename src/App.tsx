import React from 'react';
import './App.css';
import * as d3 from 'd3';
import data from './data/dc-wikia-data.json';
import * as test from './reduceData';
import lineData from './test1';
/*
function responsivefy(svg: any) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
  }
}
*/
/*
const propIdentity = 'ALIGN';
const alignSet = test.propSet(propIdentity);

// Independent
const unique = (myArr: Array<any>, prop: string) =>
  myArr.filter((obj:any, pos:any, arr:any) => 
    arr.map((mapObj:any) => mapObj[prop]).indexOf(obj[prop]) === pos
  ).map(obj => obj[prop]);

const compare = (a: [number, number], b: [number, number]) => {
  if(a[0] > b[0])
    return 1
  else if (a[0] < b[0])
    return -1
  return 0
};

const compareYear = (a: any, b: any) => {
  if(a.year > b.year)
    return 1
  else if(a.year < b.year)
    return -1
  return 0
}

const compareProp = (propName: string) => (a: any, b: any) => {
  if(a[propName] > b[propName])
    return 1;
  else if(a[propName] < b[propName])
    return -1;
  return 0;
}

const getNearByItems = (n: number, index: number, set: any[]) => {
  const low = index - n >= 0 ? index - n : 0;
  const high = index + n < set.length ? index + n : set.length;
  return set.slice(low, high+1);
};
//////////


// Dependent
const margin = { top: 10, right: 20, bottom: 30, left: 30 };
const width = 400 - margin.left - margin.right;
const height = 565 - margin.top - margin.bottom;

const xScale = d3.scaleLinear()
  .domain([ 
    Number(d3.min(data, record => record.YEAR)),
    Number(d3.max(data, record => record.YEAR))
  ])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([
    0,
    1
  ])
  .range([height, 0]);

const line = d3.line()
  .x((d: any) => xScale(d[0]))
  .y((d: any) => yScale(d[1]))
  .curve(d3.curveCatmullRom.alpha(0.5));

const yearSet = unique(data, "YEAR").filter(year => year);

const ratioSet = yearSet.map(year => ({
  year: year,
  ratio: getRatio(year)
}));

const percSet = yearSet.map(year => ({
  year: year,
  percetage: getPerc(year)
})).filter(x => x.percetage > 0);

const resultsSet = yearSet.map(year => ({
  year: year,
  percetages: test.getPerc(year, 'YEAR', propIdentity)
}));


ratioSet.sort(compareYear);
percSet.sort(compareYear);
resultsSet.sort(compareYear);

const lineData: [number, number][] = yearSet.map((year) => {
  const ratioObj = ratioSet.find(x => x.year === year);
  const ratio = ratioObj ? ratioObj.ratio : 1;
  return [
    year,
    ratio
  ];
});

const lineDataAvg: [number, number][] = yearSet.reduce(
  (acc, current) => current % 10 == 0 ? [...acc, current] : acc,
  []
).map((year: number) => {
  const ratioObjs = ratioSet.filter(x => x.year >= year && x.year < year + 10);
  const avgRatio = ratioObjs.reduce( (acc, current) => acc + current.ratio, 0) / ratioObjs.length;
  return [
    year,
    avgRatio
  ]
});


const lineDataMovingAvg = (count: number): [number, number][] => ratioSet.map((ratioObj, index) => {
  
  const nearItems = getNearByItems(count, index, ratioSet);
  
  const movingAverage = (count: number) => 
    nearItems.reduce((acc, current) => 
      acc + current.ratio, 0
    ) / nearItems.length;
  
  return [
    ratioObj.year,
    movingAverage(count)
  ];
});


const lineDataMovingAvgPerc = (count: number): [number, number][] => percSet.map((ratioObj, index) => {
  
  const nearItems = getNearByItems(count, index, percSet);
  
  const movingAverage = (count: number) => 
    nearItems.reduce((acc, current) => 
      acc + current.percetage, 0
    ) / nearItems.length;
  
  return [
    ratioObj.year,
    movingAverage(count)
  ];
});


const lineDataMovingAvgPercs = (count: number): [number, number][][] =>
  alignSet.map(align => { 
    const returnvalue:[number, number][] = resultsSet.map((ratioObj, index) => {
      const nearItems = getNearByItems(count, index, resultsSet);
      //console.log(nearItems);
      const movingAverage =  
        nearItems.reduce((acc, current) => 
          acc + current.percetages[align], 0
        ) / nearItems.length;
      return [
        ratioObj.year,
        movingAverage
      ];
    });
    //console.log(returnvalue);
    return returnvalue;
  });



lineData.sort(compare);
lineDataAvg.sort(compare);
const movingAvg5 = lineDataMovingAvg(3);
movingAvg5.sort(compare);
const perc2 = lineDataMovingAvgPerc(5);
const perc3 = lineDataMovingAvgPerc(0);
perc3.sort(compare);

const lines = lineDataMovingAvgPercs(5); 
console.log(alignSet)
////////////
*/

const margin = { top: 10, right: 20, bottom: 30, left: 30 };
const width = 400 - margin.left - margin.right;
const height = 565 - margin.top - margin.bottom;

const xScale = d3.scaleLinear()
  .domain([ 
    Number(d3.min(data, record => record.YEAR)),
    Number(d3.max(data, record => record.YEAR))
  ])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([
    0,
    1
  ])
  .range([height, 0]);

const line = d3.line()
  .x((d: any) => xScale(d[0]))
  .y((d: any) => yScale(d[1]))
  .curve(d3.curveCatmullRom.alpha(0.5));


const lines = lineData;

class App extends React.Component {
  componentDidMount(){
    var svg = d3.select('.chart')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        //.call(responsivefy)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg
      .append('g')
        .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(5));

    svg
      .append('g')
      .call(d3.axisLeft(yScale));

    svg
      .selectAll('.line')
      .data(lines)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d => {
        return line(d)
      })
      //orange green blue purple
      .style('stroke', (d, i) => ['#E67E22', '#7DCEA0', '#5DADE2', '#8E44AD', '#4E516B', '#2E3347', '#925D78', '#F1C5B5'][i])
      .style('stroke-width', 2)
      .style('fill', 'none');
  }
  
  render = () => {
    return (
      <div className="chart" />
    );
  }
}


export default App;