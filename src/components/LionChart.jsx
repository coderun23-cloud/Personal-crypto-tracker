import { useEffect, useState } from "react";
import Chart from "react-google-charts";

function LionChart({ historicalcoinData }) {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    if (historicalcoinData) {
      const dataCopy = [["Date", "Prices"]];
      historicalcoinData.forEach((item) => {
        dataCopy.push([new Date(item[0]), item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalcoinData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="400px"
      width="100%"
      legendToggle
    />
  );
}

export default LionChart;
