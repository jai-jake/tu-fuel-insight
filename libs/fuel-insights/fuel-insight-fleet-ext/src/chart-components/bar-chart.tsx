import { Bar } from 'react-chartjs-2';
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

export const BarChart = ({ chartValue, vechile }: any) => {
  const isPayload = chartValue.isPayload;
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

  const chartData = {
    labels: chartValue.daterange,
    datasets: filteredData.map((dataset: any) => {
      return {
        label: dataset.label,
        data: dataset.data.map((data: any) => {
          const dataDate = data.timestamp.split(' ')[0];
          if (chartValue.daterange.includes(dataDate)) {
            return data.fuel;
          }
        }),
        backgroundColor: dataset.color,
        borderColor: dataset.borderColor,
        borderWidth: 1,
      };
    }),
  };

  const renderChart = () => {
    return <Bar data={chartData} />;
  };

  return <>{renderChart()}</>;
};
