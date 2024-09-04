import React from 'react';
import { datasets } from '../datasets';
import './components-style.css';
// components-style.css
interface SidebarProps {
  chartType: string;
  setChartType: (chartType: string) => void;
  selectedVehicles: string[];
  setSelectedVehicles: React.Dispatch<React.SetStateAction<string[]>>;
  xAxis: string;
  setXAxis: (xAxis: string) => void;
  yAxis: string;
  setYAxis: (yAxis: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chartType,
  setChartType,
  selectedVehicles,
  setSelectedVehicles,
  xAxis,
  setXAxis,
  yAxis,
  setYAxis
}) => {
  const vehicles = datasets.map(dataset => dataset.name);

  const axisOptions = [
    { key: 'load', value: 'Load' },
    { key: 'fuel', value: 'Fuel Consumption' }
  ];

  const handleChartTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value);
    setXAxis('');
    setYAxis('');
  };

  const handleVehicleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedVehicles((prevSelected: string[]) => {
      const newSelected = event.target.checked 
        ? [...prevSelected, value] 
        : prevSelected.filter(vehicle => vehicle !== value);
      if (newSelected.length === 0) {
        setXAxis('');
        setYAxis('');
      }
      return newSelected;
    });
  };

  const handleXAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setXAxis(event.target.value);
  };

  const handleYAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxis(event.target.value);
  };

  const filteredXAxisOptions = axisOptions.filter(option => option.key !== yAxis);
  const filteredYAxisOptions = axisOptions.filter(option => option.key !== xAxis);

  return (
    <div className='sidebar-wrapper'>
      <div className='type-selection'>
        <label htmlFor="chart-type-label">Chart Type Selection</label>
        <select name='chart-type-label' onChange={handleChartTypeChange} value={chartType}>
          <option value=""> Select Chart Type</option>
          <option value="line"> Line Chart</option>
          <option value="bar"> Bar Chart</option>
          <option value="pie"> Pie Chart</option>
        </select>
      </div>
      {chartType && (
        <div className='vec-selection-wrapper'>
          <label>Vehicles List</label>
          {vehicles.map((vehicle, index) => (
            <div key={index} className='selction-boxs'>
              <input 
                type="checkbox" 
                value={vehicle} 
                onChange={handleVehicleChange}
                checked={selectedVehicles.includes(vehicle)}
              />
              <label>{vehicle}</label>
            </div>
          ))}
        </div>
      )}
      {selectedVehicles.length > 0 && chartType !== 'pie' && chartType !== '' && (
        <div className='axis-selection-wrapper'>
          <label>Axis Selection</label>
          <div className='axis-selection'>
            <div className='axis'>
              <label>X-Axis</label>
              <select name='x-axis' value={xAxis} onChange={handleXAxisChange}>
                <option value="">Select Value</option>
                {filteredXAxisOptions.map(option => (
                  <option key={option.key} value={option.key}>{option.value}</option>
                ))}
              </select>
            </div>
            <div className='axis'>
              <label>Y-Axis</label>
              <select name='y-axis' value={yAxis} onChange={handleYAxisChange}>
                <option value="">Select Value</option>
                {filteredYAxisOptions.map(option => (
                  <option key={option.key} value={option.key}>{option.value}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;