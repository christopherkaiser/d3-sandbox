import React from 'react';
import './App.css';
import * as d3 from 'd3';
import data from './data/dc-wikia-data.json';
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
class App extends React.Component {
  componentDidMount(){
    var margin = { top: 10, right: 20, bottom: 30, left: 30 };
    var width = 400 - margin.left - margin.right;
    var height = 565 - margin.top - margin.bottom;

    var svg = d3.select('.chart')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        //.call(responsivefy)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var parseTime = d3.timeParse('%Y/%m/%d');

    
    var xScale = d3.scaleLinear()
      .domain([ 
        Number(d3.min(data, record => record.YEAR)),
        Number(d3.max(data, record => record.YEAR))
      ])
      .range([0, width]);
             
    svg
      .append('g')
        .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(5));

    var yScale = d3.scaleLinear()
      .domain([
        0,
        10
      ])
      .range([height, 0]);

    svg
      .append('g')
      .call(d3.axisLeft(yScale));

    var line = d3.line()
      .x((d: any) => xScale(d[0]))
      .y((d: any) => yScale(d[1]))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const unique = (myArr: Array<any>, prop: string) =>
      myArr.filter((obj:any, pos:any, arr:any) => 
        arr.map((mapObj:any) => mapObj[prop]).indexOf(obj[prop]) === pos
      ).map(obj => obj[prop]);

    const yearSet = unique(data, "YEAR").filter(year => year);

    const getRatio = (year: number) => {
      const goodCount = data.reduce(
        (acc, current) => acc + ((current.ALIGN === "Good Characters" && current.YEAR === year) ? 1 : 0)
        ,0
      );
      const badCount = data.reduce(
        (acc, current) => acc + ((current.ALIGN === "Bad Characters" && current.YEAR === year) ? 1 : 0)
        ,0
      );
      const goodBadRatio = goodCount / (badCount ? badCount : 1);
      
      return goodBadRatio;
    };

    const ratioSet = yearSet.map(year => ({
      year: year,
      ratio: getRatio(year)
    }));
    
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

    const compare = (a: [number, number], b: [number, number]) => {
      if(a[0] > b[0])
        return 1
      else if (a[0] < b[0])
        return -1
      return 0
    };

    lineData.sort(compare);
    lineDataAvg.sort(compare);

    const lines = [lineDataAvg]; 

    svg
      .selectAll('.line')
      .data(lines)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d => {
        console.log(d);
        return line(d)
      })
      .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
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