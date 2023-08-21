import React from "react";
import "../App.css";

function HighLowPrice (props)
{

  function roundToTwo(num) {
    return +(Math.round((num * 1.24) + "e+2")  + "e-2");
  }

  const newData = [];
  props.prices.forEach(element => {
    //const trimmedDate = element.startDate.substr(5,2);
    const roundedPrice = roundToTwo(element.hinta)
    newData.push(roundedPrice);
  });

  const highPrice = Math.max(...newData);
  const lowPrice = Math.min(...newData);

  return (
    <div className="HighLow">
      <div className="Prices">
        <div className="Price">{highPrice} snt/kWh</div>
        <div className="Price">{lowPrice} snt/kWh</div>
      </div>
      <div>
        <p>This is daily highest and lowest price (alv 24%)</p>
      </div>
    </div>
  );
}

export default HighLowPrice;