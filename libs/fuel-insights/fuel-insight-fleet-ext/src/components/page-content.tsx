import React from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { datasets } from '../datasets';
import './components-style.css';

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

interface DataPoint {
  timestamp: string;
  load: string;
  terrain: string;
  distanceKm: number;
  fuel: number;
}

interface PageContentProps {
    chartType: string;
    selectedVehicles: string[];
    xAxis: 'load' | 'fuel';
    yAxis: 'load' | 'fuel';
  }

export const PageContent = ({
  chartType,
  selectedVehicles,
  xAxis,
  yAxis
}: PageContentProps) => {

  // Filter the datasets based on selected vehicles
  const filteredData = datasets.filter(dataset => selectedVehicles.includes(dataset.name));

  // Prepare the data object for Chart.js
  const chartData = {
    labels: filteredData.flatMap(dataset => dataset.data.map(entry => entry[xAxis])),
    datasets: filteredData.map(dataset => ({
      label: dataset.name,
      data: dataset.data.map(entry => entry[yAxis]),
      backgroundColor: dataset.color,
      borderColor: dataset.borderColor,
      borderWidth: 1,
    })),
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={chartData} />;
      case 'bar':
        return <Bar data={chartData} />;
      case 'pie':
        return <Pie data={chartData} />;
      default:
        return null;
    }
  };

  return (
    <div className='page-content'>
      {/* <h2>Chart Type: {chartType}</h2>
      <h3>Selected Vehicles: {selectedVehicles.join(', ')}</h3>
      <h3>X-Axis: {xAxis}</h3>
      <h3>Y-Axis: {yAxis}</h3> */}
      {renderChart()}
    </div>
  );
};