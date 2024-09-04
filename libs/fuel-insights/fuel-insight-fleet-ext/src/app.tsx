import './app.css';
import { useState } from 'react';
import Sidebar from './components/sidebar';
import { PageContent } from './components/page-content';

// Define the union type for xAxis and yAxis
type AxisType = 'load' | 'fuel';

export const App = () => {
  const [chartType, setChartType] = useState<string>('');
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [xAxis, setXAxis] = useState<AxisType>('load');
  const [yAxis, setYAxis] = useState<AxisType>('fuel');

  return (
    <div className='main-wrapper'>
      <Sidebar
        chartType={chartType}
        setChartType={setChartType}
        selectedVehicles={selectedVehicles}
        setSelectedVehicles={setSelectedVehicles}
        xAxis={xAxis}
        setXAxis={setXAxis}
        yAxis={yAxis}
        setYAxis={setYAxis}
      />
      <PageContent
        chartType={chartType}
        selectedVehicles={selectedVehicles}
        xAxis={xAxis}
        yAxis={yAxis}
      />
    </div>
  );
};