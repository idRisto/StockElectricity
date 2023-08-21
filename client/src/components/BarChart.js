import React from 'react';
import 'react-vis/dist/style.css';
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, LabelSeries} from 'react-vis';


function BarChart (props) {

  function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
  }

  const newData = [];
  props.prices.forEach(element => {
    let trimmedDate = element.aikaleima_suomi.substr(11,2);
    trimmedDate = parseInt(trimmedDate) + 1;
    const roundedPrice = roundToTwo(element.hinta)
    const newObject = {};
    newObject["x"] = trimmedDate.toString();
    newObject["y"] = roundedPrice;
    newData.push(newObject);
  });
  newData.sort(function (a, b) {
    return a.x - b.x;
  });
  
  const chartWidth = 1800;
  const chartHeight = 400;
  const chartDomain = [0, 20];

  return (
    <div className="App">
      <XYPlot xType="ordinal" height={chartHeight} width={chartWidth} yDomain={chartDomain}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={newData} barWidth={0.8} /> 
        <LabelSeries 
          data={newData.map((obj) => {
            return { ...obj, label: obj.y.toString(), style: {fontSize: 20} };
          })}
          labelAnchorX='middle'
          labelAnchorY='text-after-edge'
        />
      </XYPlot>
    </div>
  );
};

export default BarChart;                              
