/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DoughnutChart: React.FC<any> = (chartDetails) => {
  const chartValue = chartDetails.chartDetails;
  const mockData = chartDetails.mockArrayData;
  const dateRange = { startDate: '2024-08-01', endDate: '2024-08-10' };

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

  const filteredData = mockData
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

  const aggregatedData = filteredData.reduce((acc: any, dataset: any) => {
    dataset.data.forEach((set: any) => {
      if (!acc[dataset.name]) {
        acc[dataset.name] = { name: dataset.name, y: 0 };
      }
      acc[dataset.name].y += set.fuel;
    });
    return acc;
  }, {});

  const seriesData: any = Object.values(aggregatedData);

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    series: [
      {
        type: 'pie',
        name: 'Fuel Consumption',
        data: seriesData.map((s: any) => ({
          ...s,
          color: mockData.find((d: any) => d.name === s.name)?.color,
        })),
        innerSize: '60%',
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DoughnutChart;
