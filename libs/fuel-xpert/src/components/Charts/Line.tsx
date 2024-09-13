/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

const LineChart = (propData: any) => {
  const { chartDetails, mockArrayData } = propData;
  const { selectedVechileList, xAxis, yAxis } = chartDetails;
  const check = xAxis === 'load' || yAxis === 'load';
  // Filter datasets based on selected vehicles
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const filteredData = mockArrayData
      .filter((dataset: any) => selectedVechileList.includes(dataset.name))
      .map((dataset: any) => {
        dataset.data = dataset.data.filter(
          (set: any) => check && (set.weight > 0 || set.weight === 0)
        );
        return dataset;
      });
    setChartData(filteredData);
  }, [propData, check, mockArrayData, selectedVechileList]);

  const axis = (axis: string): string => {
    if (axis === 'fuel') {
      return axis;
    } else if (axis.includes('load')) {
      return 'weight';
    }
    return axis;
  };

  const getChartData = (data: any) => {
    const dataArr: any = [];
    data.data.forEach((set: any) => {
      dataArr.push({ x: set[axis(xAxis)], y: set[axis(yAxis)] });
    });

    dataArr.sort((a: any, b: any) => a.x - b.x);
    console.log('lineChartData', JSON.parse(JSON.stringify(dataArr)));
    return JSON.parse(JSON.stringify(dataArr));
  };

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    legend: {
      enabled: false,
    },
    chart: {
      type: 'line',
      backgroundColor: '#fafafa',
    },
    yAxis: {
      title: {
        text: yAxis === 'fuel' ? 'Fuel Consumption' : 'Load',
      },
    },
    xAxis: {
      title: {
        text: xAxis === 'fuel' ? 'Fuel Consumption' : 'Load',
      },
    },
    series: chartData.map((data: any) => {
      return {
        type: 'line',
        name: data.label,
        color: data.color,
        data: getChartData(data),
      };
    }),
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
