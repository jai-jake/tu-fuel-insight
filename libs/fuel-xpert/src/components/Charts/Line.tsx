import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { datasets } from '../../datasets';

const LineChart = (chartDetails: any) => {
  const chartValue = chartDetails.chartDetails;
  const { selectedVechileList, xAxis, yAxis } = chartValue;

  const loadCheck = (): boolean | undefined => {
    if (chartValue.xAxis === 'load' || chartValue.yAxis === 'load') {
      return true;
    } else if (
      chartValue.xAxis === 'load_without_payload' ||
      chartValue.yAxis === 'load_without_payload'
    ) {
      return false;
    }
  };

  // Filter datasets based on selected vehicles
  const filteredData = datasets
    .filter((dataset: any) => selectedVechileList.includes(dataset.name))
    .map((dataset: any) => {
      const check = loadCheck();
      dataset.data = dataset.data.filter((set: any) => {
        if (check !== undefined) {
          if (check && set.weight > 0) {
            return true;
          } else if (check && set.weight === 0) {
            return true;
          }
        }
        return false;
      });
      return dataset;
    });

  const axis = (axis: string): string => {
    if (axis === 'fuel') {
      return axis;
    } else if (axis.includes('load')) {
      return 'weight';
    }
    return axis;
  };

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'line',
    },
    series: filteredData.map((data: any) => {
      return {
        type: 'line',
        data: data.data.map((set: any) => {
          return [set[axis(xAxis)], set[axis(yAxis)]];
        }),
        name: data.label,
        color: data.color,
      };
    }),
    yAxis: {
      title: {
        text:
          yAxis === 'fuel'
            ? 'Fuel Consumption'
            : yAxis === 'load_without_payload'
            ? 'Unloaded'
            : 'Load',
      },
    },
    xAxis: {
      title: {
        text:
          xAxis === 'fuel'
            ? 'Fuel Consumption'
            : xAxis === 'load_without_payload'
            ? 'Unloaded'
            : 'Load',
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
