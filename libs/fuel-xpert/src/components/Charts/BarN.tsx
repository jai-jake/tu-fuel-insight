/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAtom } from 'jotai';
import { MockDataAtom } from '../../store/mockDataStore';
import { useEffect } from 'react';

const BarChart = (propData: any) => {
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
      if (chartValue.selectedVechileList.includes(dataset.name)) {
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
    })
    .map((dataset: any) => {
      dataset.data = dataset.data.filter((set: any) => {
        if (chartValue.singleAxisValue === 'loaded' && set.weight > 0) {
          return true;
        } else if (
          chartValue.singleAxisValue === 'unloaded' &&
          set.weight === 0
        ) {
          return true;
        } else {
          return false;
        }
      });
      return dataset;
    });

  const dateBasedSum = (data: any[], chartValue: any) => {
    const sumMap = new Map();

    data.forEach((vehicleData) => {
      vehicleData.data.forEach((set: any) => {
        const date = set.timestamp.split('T')[0]; // Extract date part
        const value = set.fuel; // Use data.fuel as the value
        const key = `${date}-${vehicleData.label}`;

        if (!sumMap.has(key)) {
          sumMap.set(key, { date, vehicle: vehicleData.label, sum: 0 });
        }

        sumMap.get(key).sum += value;
      });
    });

    return Array.from(sumMap.values());
  };

  const series: any = filteredData.map((data: any) => {
    const aggregatedData = dateBasedSum([data], chartValue);

    return {
      type: 'column',
      data: aggregatedData.map((item) => [item.date, item.sum]),
      name: data.label,
    };
  });

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    xAxis: {
      categories: datesInRange,
    },
    series: series.map((s: any) => ({
      ...s,
      color: mockDataCopy.find((d: any) => d.label === s.name)?.color,
    })),
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
