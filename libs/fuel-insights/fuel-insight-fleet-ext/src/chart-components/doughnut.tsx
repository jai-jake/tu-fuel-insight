import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { datasets } from '../datasets';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const DoughnutChart = ({ chartValue, vechile }: any) => {
  const dates = chartValue.daterange;
  const selectedVehicles = vechile;
  const isPayload = chartValue.isPayload;

  // Filter datasets based on selected vehicles and payload condition
  const filteredData: any = datasets.filter((dataset: any) => {
    if (vechile.includes(dataset.name)) {
      if (isPayload) {
        return dataset.data.some((dataPoint: any) => dataPoint.weight != 0);
      } else {
        return dataset.data.some((dataPoint: any) => dataPoint.weight == 0);
      }
    }
    return false;
  });

  // Prepare chart data
  const chartData = {
    labels: filteredData.map((dataset: any) => dataset.label),
    datasets: [
      {
        data: filteredData.map((dataset: any) => {
          // Sum fuel for data points within the specified date range
          const fuelSum = dataset.data
            .filter((data: any) => {
              const dataDate = data.timestamp.split(' ')[0]; // Extract date part from timestamp
              return dates.includes(dataDate);
            })
            .reduce((sum: number, data: any) => sum + data.fuel, 0);
          return fuelSum;
        }),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const renderChart = () => {
    return <Doughnut data={chartData} />;
  };

  return <>{renderChart()}</>;
};
