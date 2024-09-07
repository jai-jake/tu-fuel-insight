import { Line } from 'react-chartjs-2';
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

export const LineChart = ({ chartValue, vechile }: any) => {
  const filteredData: any = datasets.filter((dataset: any) =>
    vechile.includes(dataset.name)
  );

  const chartData = {
    labels: vechile,
    datasets: filteredData.map((dataset: any) => {
      return {
        label: dataset.label,
        data: dataset.data.map((data: any) => {
          return data.fuel;
        }),
        borderColor: dataset.color,
        backgroundColor: dataset.color,
        borderWidth: 3,
      };
    }),
  };

  const renderChart = () => {
    return <Line data={chartData} />;
  };

  return <>{renderChart()}</>;
};
