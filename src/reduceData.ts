import data from './data/dc-wikia-data.json'; 

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

const getPercBlock = (year: number) => {
  const goodCount = data.reduce(
    (acc, current) => acc + ((current.ALIGN === "Good Characters" && current.YEAR === year) ? 1 : 0)
    ,0
  );
  const badCount = data.reduce(
    (acc, current) => acc + ((current.ALIGN === "Bad Characters" && current.YEAR === year) ? 1 : 0)
    ,0
  );
  const goodBadPerc = goodCount / (goodCount + (badCount ? badCount : 1));
  
  return goodBadPerc;
};

const propSet = (yProp: string): string[] => data.reduce(
  (acc, current) => (!current[yProp] || acc.includes(current[yProp])) ? [...acc] : [...acc, current[yProp]], 
  []
);

// domain of x, domain of y prop, data
const getPerc = (year: number, xProp:string, yProp: string) => {

  const keyValueSet = propSet(yProp).reduce((acc, prop) => 
    ({
      ...acc,
      [prop]: 
        data.reduce((acc2, current2) =>
          acc2 + ((current2[yProp] === prop && current2[xProp] === year) ? 1 : 0),
          0
        )
    }),
    {}
  );
  //console.log(keyValueSet);

  const values: number[] = Object.values(keyValueSet) 
  const total = values.reduce( (a, c) => a + c, 0);

  const returnval: [string, number][] = Object.entries(keyValueSet)
  const returnval2 = returnval.reduce((acc, cur) => ({
    ...acc,
    [cur[0]]: (cur[1] / total) ? (cur[1] / total) : 0
  }), {});
  //console.log(returnval2);
  
  /*
  const goodCount = data.reduce(
    (acc, current) => acc + ((current[yProp] === "Good Characters" && current[xProp] === year) ? 1 : 0),
    0
  );
  const badCount = data.reduce(
    (acc, current) => acc + ((current.ALIGN === "Bad Characters" && current.YEAR === year) ? 1 : 0),
    0
  );
  const goodBadPerc = goodCount / (goodCount + (badCount ? badCount : 1));
  */

  return returnval2;
};

export { propSet, getRatio, getPerc };