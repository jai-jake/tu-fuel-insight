/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { MockDataAtom } from '../../store/mockDataStore';
import { format } from 'date-fns';

const LineChart = (propData: any) => {
  const { chartDetails } = propData;
  const [mockData] = useAtom(MockDataAtom);
  const { selectedVechileList, xAxis, yAxis, dateRange } = chartDetails;
  const check = xAxis === 'load' || yAxis === 'load';
  const startDate = new Date(dateRange.startDate);
  const endDate = new Date(dateRange.endDate);
  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const dates = [];
    const currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(format(currentDate, 'yyyy-MM-dd'));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };
  const datesInRange = getDatesInRange(startDate, endDate);

  // Filter datasets based on selected vehicles
  const [chartData, setChartData] = useState([]);
  const mockDataCopy = JSON.parse(JSON.stringify(mockData));
  useEffect(() => {
    const filteredData = mockDataCopy
      .filter((dataset: any) => selectedVechileList.includes(dataset.name))
      .map((dataset: any) => {
        const extractDate = (dateTimeString: string): string => {
          return dateTimeString.split(' ')[0];
        };
        dataset.data = dataset.data.filter((set: any) => {
          if (
            extractDate(set.timestamp) >= dateRange.startDate &&
            extractDate(set.timestamp) <= dateRange.endDate
          ) {
            return true;
          } else {
            return false;
          }
        });
        return dataset;
      })
      .map((dataset: any) => {
        dataset.data = dataset.data.filter(
          (set: any) => check && (set.weight > 0 || set.weight === 0)
        );
        return dataset;
      });
    setChartData(filteredData);
  }, [propData]);

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
    return JSON.parse(JSON.stringify(dataArr));
  };

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'line',
      backgroundColor: '#fff',
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
