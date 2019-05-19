import React from 'react';
import './App.css';
import * as d3 from 'd3';
import data from './data/dc-wikia-data.json';
import * as test from './reduceData';

const propxIdentity = 'YEAR';
const propyIdentity = 'ALIGN';


const propSet = (yProp: string): string[] => data.reduce(
  (acc, current) => (!current[yProp] || acc.includes(current[yProp])) ? [...acc] : [...acc, current[yProp]], 
  []
)


const unique = (myArr: Array<any>, prop: string) =>
  myArr.filter((obj:any, pos:any, arr:any) => 
    arr.map((mapObj:any) => mapObj[prop]).indexOf(obj[prop]) === pos
  ).map(obj => obj[prop]);

const getNearByItems = (n: number, index: number, set: any[]) => {
  const low = index - n >= 0 ? index - n : 0;
  const high = index + n < set.length ? index + n : set.length;
  return set.slice(low, high+1);
};

// take {xValue: x, yValues: [{name: propName1, value: y1}, ....]}[]
const formatData = (dataSet: any, xSet: any[], propSet: string[], propx: string, propy: string) => 
  xSet.map(xItem => ({
    xValue: xItem,
    yValues: propSet.map(prop => ({
      name: prop,
      value: dataSet
        .filter((record: any) => record[propx] === xItem && record[propy] === prop)  //optimization here by changing data struct {x1: [recordwithx1, recordwithx1, ...], x2: [recordwithx2, recordwith x2, ...], ...}
        .length
    }))
  }));

const transformPercantage = (original: any) =>
  original.map((record: any) => {
    const sum = record.yValues.reduce((acc: number, cur: {value: number}) => acc + cur.value, 0);
    return {
      ...record,
      yValues: record.yValues.map((pair: {name: string, value: number}) => ({
        name: pair.name,
        value: pair.value / sum
      }))
    };
  });

const transformDataAverage = (original: any, n: number, yKeys: string[]) => 
  original.map((record: any, index: number) => {
    const nearItems = getNearByItems(n, index, original);
    // [ {xvalue: number, yvalues: [{name: string. value: number}] ] => [{name: string, value: number}]
    // [{xvalue: number, yvalues: [number], ykeys: [string]}]
    // [{xvalue: number, yvalues: [{name: string. value: number}]]  => [{name: string, value: number}]
    //[name: string, value: 0]

    const base = yKeys.map(k => ({name: k, value: 0}));
    
    const newYValuesSum = nearItems.reduce((acc, cur) => 
      acc.map((val: any) => ({
        name: val.name,
        value: val.value + (cur.yValues.find((x: any) => x.name == val.name).value || 0) 
      })), 
      base
    );

    const newYValuesAverage = newYValuesSum.map((x: any) => ({
      name: x.name,
      value: x.value / nearItems.length 
    }));
    
    return {
      xValue: record.xValue,
      yValues: newYValuesAverage
    };
  });


const valueFormat = (original: any, yKeys: string[]) => 
  yKeys.map(yKey => 
    original.map((rec: any) => [
      rec.xValue,
      (rec.yValues.find((v: any) => v.name === yKey).value || 0) 
    ])
  );


const applyOnY = (objList: any, applyFn: any) => objList.map((obj: any)=> applyFn(obj));
// take {xvalue: x, y1, y2, y3...}[] and apply fn on y.  {xvalue: x, y1:fn(y1), y2:fn(y2), y3:fn(y3)...}[]
// take {xvalue: x, y1, y2, y3...}[] and apply fn on (y1, y2, y3, ...)

const xSet = unique(data, propxIdentity).filter(x => x).sort();

//get each propIdentity count. fn(data, propSet, propx) {xvalue: xvalue, prop1: prop1count, prop2: prop2count, prop3:prop3count ....}[]

const ykeys = propSet(propyIdentity);
const formatedData = formatData(data, xSet, ykeys, propxIdentity, propyIdentity);
// console.log(formatedData);
const transformedDataPercantage = transformPercantage(formatedData);
// console.log(transformedDataPercantage);
const transformedDataAverage = transformDataAverage(transformedDataPercantage, 5, ykeys);
//console.log(transformedDataAverage); 
const lineFormat = valueFormat(transformedDataAverage, ykeys);
console.log(lineFormat);
export default lineFormat;



//{xValue: x, yValues: [{name: propName1, value: y1}, ....]}[]  ->  [number, number][][]

//






    // const totals = nearItems.reduce((acc, cur) =>  [
    //   {name: cur.yValue[0].name, value: acc[0].value + cur.yValues[0].value},
    //   {name: cur.yValue[0].name, value: acc[1].value + cur.yValues[1].value},
    //   {name: cur.yValue[0].name, value: acc[2].value + cur.yValues[2].value},
    // ]), [] ;  //cur yValue: [{name, value}]
    
    // const base = record[0].yValues[0].map((val: any) =>
    //   ({name: val.name, value: 0})
    // );

    // const totals = nearItems.reduce((acc, cur) => 
    //   acc.map(item => ({
    //     name: item.name,
    //     value: item.value + cur.
    //   })),
    //   base); //[{name: string, value: number}]

    // return record.yValues.map(yValue => ({
    //   name: yValue.name,
    //   value:

//takes a dataset with records and orginizes it to {xvalue: x, y1, y2, y3...}[]
// const formatData1 = (dataSet: any, xSet: any[], propSet: string[], propx: string, propy: string) => 
//   xSet.map(xItem => 
//     propSet.reduce(
//       (acc: {}, cur: string) => ({
//         ...acc,
//         xValue: xItem,
//         [cur]: dataSet
//           .filter((record: any) => record[propx] == xItem) //optimization here by changing data struct {x1: [recordwithx1, recordwithx1, ...], x2: [recordwithx2, recordwith x2, ...], ...}
//           .find((record: any) => record[propy] == cur) 
//           || 0
//       }), 
//       {}
//     )
//   );