/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAtom } from 'jotai';
import { MockDataAtom } from '../../store/mockDataStore';
import { useEffect } from 'react';

const ComparisonBar = (propData: any) => {
  const chartValue = propData.chartDetails;
  const [mockData] = useAtom(MockDataAtom);
  const mockDataCopy = JSON.parse(JSON.stringify(mockData));
  const dateRange = {
    startDate: chartValue.dateRange.startDate,
    endDate: chartValue.dateRange.endDate,
  };

  const getDatesInRange = (startDate: string, endDate: string): string[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date).toISOString().split('T')[0]);
    }

    return dates;
  };

  const datesInRange = getDatesInRange(dateRange.startDate, dateRange.endDate);

  const filteredData = mockDataCopy
    .filter((dataset: any) => {
      if (
        chartValue.comparisonVehicle == dataset.name ||
        chartValue.comparisonVehicleList.includes(dataset.name)
      ) {
        return dataset;
      }
    })
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
    });
  // .map((dataset: any) => {
  //   dataset.data = dataset.data.filter((set: any) => {
  //     if (chartValue.singleAxisValue === 'loaded' && set.weight > 0) {
  //       return true;
  //     } else if (
  //       chartValue.singleAxisValue === 'unloaded' &&
  //       set.weight === 0
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   return dataset;
  // });

  const comparisonVehicleData = filteredData.filter(
    (dataset: any) => chartValue.comparisonVehicle == dataset.name
  );
  const comparisonVehicleListData = filteredData.filter((dataset: any) =>
    chartValue.comparisonVehicleList.includes(dataset.name)
  );

  const barChartData = datesInRange.map((date: string) => {
    const data1 = comparisonVehicleData
      .map((dataset: any) => {
        return dataset.data.filter(
          (set: any) => set.timestamp.split(' ')[0] === date
        );
      })
      .flat()
      .reduce((acc: any, val: any) => {
        return acc + val.fuel;
      }, 0);

    const data2 = comparisonVehicleListData
      .map((dataset: any) => {
        const data = dataset.data.filter(
          (set: any) => set.timestamp.split(' ')[0] === date
        );
        return data;
      })
      .reduce((acc: any, val: any) => {
        return acc.concat(val);
      }, [])
      .reduce((acc: any, val: any) => {
        return acc + val.fuel;
      }, 0);

    return {
      date: date,
      data1: data1,
      data2: parseFloat((data2 / comparisonVehicleListData.length).toFixed(2)),
    };
  });

  useEffect(() => {
    console.log(barChartData);
  });

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    xAxis: {
      categories: barChartData.map((data: any) => data.date),
    },
    yAxis: {
      title: {
        text: 'Fuel',
      },
    },
    series: [
      {
        type: 'column',
        name: mockDataCopy.find(
          (x: any) => x.name === chartValue.comparisonVehicle
        ).label,
        data: barChartData.map((data: any) => data.data1),
        color: '#000000',
      },
      {
        type: 'column',
        name: 'Average SUM of Selected Vehicles',
        data: barChartData.map((data: any) => data.data2),
        color: '#e74c3c',
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ComparisonBar;
