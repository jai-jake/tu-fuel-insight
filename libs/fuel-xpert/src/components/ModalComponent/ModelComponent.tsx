import { Button } from '@trackunit/react-components';
import { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import './ModalComponent.css';

interface Vehicle {
  label: string;
  name: string;
}

interface ChartData {
  id?: number;
  type: string;
  title: string;
  description: string;
  selectedVechileList: string[];
  dateRange: { startDate: string; endDate: string };
  singleAxisValue: string;
  xAxis: string;
  yAxis: string;
  comparisonVehicle: string;
  comparisonVehicleList: string[];
}

interface ModalComponentProps {
  mockData: Vehicle[];
  isOpened: boolean;
  onClose: () => void;
  onAddChart?: (chartData: ChartData) => void;
  onUpdateChart?: (updatedData: ChartData) => void;
  individualChartData?: ChartData;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  mockData,
  isOpened,
  onClose,
  onAddChart,
  onUpdateChart,
  individualChartData,
}) => {
  const vehicles = mockData.map((vehicle) => ({
    label: vehicle.label,
    value: vehicle.name,
  }));

  const animatedComponents = makeAnimated();

  const [chartSelectedType, setChartSelectedType] = useState<string>(
    individualChartData?.type || ''
  );
  const [chartTitle, setChartTitle] = useState<string>(
    individualChartData?.title || ''
  );
  const [chartDescription, setChartDescription] = useState<string>(
    individualChartData?.description || ''
  );
  const [selectedVehicleList, setSelectedVehicleList] = useState<string[]>(
    individualChartData?.selectedVechileList || []
  );
  const [defaultVehicleList, setDefaultVehicleList] = useState<MultiValue<any>>(
    individualChartData?.selectedVechileList
      ? mockData
          .filter((x: { name: string }) =>
            individualChartData.selectedVechileList.includes(x.name)
          )
          .map((x: { label: string; name: string }) => ({
            label: x.label,
            value: x.name,
          }))
      : []
  );
  const [minDate, setMinDate] = useState<string>(
    individualChartData?.dateRange.startDate || ''
  );
  const [maxDate, setMaxDate] = useState<string>(
    individualChartData?.dateRange.endDate || ''
  );
  const [fromDate, setFromDate] = useState<string>(
    individualChartData?.dateRange.startDate || ''
  );
  const [toDate, setToDate] = useState<string>(
    individualChartData?.dateRange.endDate || ''
  );
  const [xAxis, setXAxis] = useState<string>(individualChartData?.xAxis || '');
  const [yAxis, setYAxis] = useState<string>(individualChartData?.yAxis || '');
  const [singleAxisValue, setSingleAxisValue] = useState<string>(
    individualChartData?.singleAxisValue || ''
  );

  const [comparisonVehicle, setComparisonVehicle] = useState<string>(
    individualChartData?.comparisonVehicle || ''
  );
  const [comparisonVehicleList, setComparisonVehicleList] = useState<string[]>(
    individualChartData?.comparisonVehicleList || []
  );
  const [defaultComparisonVehicleList, setDefaultComparisonVehicleList] =
    useState<MultiValue<any>>(
      individualChartData?.comparisonVehicleList
        ? mockData
            .filter((x: { name: string }) =>
              individualChartData.comparisonVehicleList.includes(x.name)
            )
            .map((x: { label: string; name: string }) => ({
              label: x.label,
              value: x.name,
            }))
        : []
    );

  const handleChartTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChartSelectedType(event.target.value);
  };

  const handleChartTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChartTitle(event.target.value);
  };

  const handleChartDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setChartDescription(event.target.value);
  };

  const handleSelectedVehicleList = (
    selectedList: MultiValue<{ label: string; value: string }>
  ) => {
    setDefaultVehicleList(selectedList);
    setSelectedVehicleList(selectedList.map((item) => item.value));
  };

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinDate(event.target.value);
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDate(event.target.value);
    setToDate(event.target.value);
  };

  const handleXAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setXAxis(event.target.value);
  };

  const handleYAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxis(event.target.value);
  };

  const handleLoadForOtherCharts = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSingleAxisValue(event.target.value);
  };

  const clearAllFields = () => {
    setChartSelectedType('');
    setChartTitle('');
    setChartDescription('');
    setSelectedVehicleList([]);
    setFromDate('');
    setToDate('');
    setXAxis('');
    setYAxis('');
    setSingleAxisValue('');
    setDefaultVehicleList([]);
    setDefaultComparisonVehicleList([]);
    setComparisonVehicle('');
    setComparisonVehicleList([]);
  };

  const handleGenerateChart = () => {
    const chartData: ChartData = {
      type: chartSelectedType,
      title: chartTitle,
      description: chartDescription,
      selectedVechileList: selectedVehicleList,
      dateRange: { startDate: fromDate, endDate: toDate },
      singleAxisValue: singleAxisValue,
      xAxis: xAxis,
      yAxis: yAxis,
      comparisonVehicle: comparisonVehicle,
      comparisonVehicleList: comparisonVehicleList,
    };
    if (onAddChart) onAddChart(chartData);
    clearAllFields();
  };

  const handleUpdateChart = () => {
    const chartData: ChartData = {
      id: individualChartData?.id,
      type: chartSelectedType,
      title: chartTitle,
      description: chartDescription,
      selectedVechileList: selectedVehicleList,
      dateRange: { startDate: fromDate, endDate: toDate },
      singleAxisValue: singleAxisValue,
      xAxis: xAxis,
      yAxis: yAxis,
      comparisonVehicle: comparisonVehicle,
      comparisonVehicleList: comparisonVehicleList,
    };
    if (onUpdateChart) {
      console.log('chartData', chartData);
      onUpdateChart(chartData);
    }
    clearAllFields();
  };

  if (!isOpened) return null;

  const axisOptions = [
    { key: 'load', value: 'Load' },
    { key: 'fuel', value: 'Fuel Consumption' },
  ];

  const filteredXAxisOptions = axisOptions.filter((option) => {
    if (yAxis === 'fuel') {
      return option.key === 'load';
    } else if (yAxis === 'load') {
      return option.key === 'fuel';
    }
    return option.key !== yAxis;
  });

  const filteredYAxisOptions = axisOptions.filter((option) => {
    if (xAxis === 'fuel') {
      return option.key === 'load';
    } else if (xAxis === 'load') {
      return option.key === 'fuel';
    }
    return option.key !== xAxis;
  });

  const isFormValid = () => {
    return (
      chartSelectedType !== '' &&
      chartTitle !== '' &&
      chartDescription !== '' &&
      (chartSelectedType !== 'comparison-bar' ||
        selectedVehicleList.length > 0) &&
      fromDate !== '' &&
      toDate !== '' &&
      (chartSelectedType !== 'line' || (xAxis !== '' && yAxis !== '')) &&
      ((chartSelectedType !== 'bar' && chartSelectedType !== 'doughnut') ||
        singleAxisValue !== '') &&
      (chartSelectedType !== 'comparison-bar' ||
        (comparisonVehicle !== '' && comparisonVehicleList.length > 0))
    );
  };

  const handleComparisonVehicle = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setComparisonVehicle(event.target.value);
  };

  const handleComparisonVehicleList = (
    selectedList: MultiValue<{ label: string; value: string }>
  ) => {
    setComparisonVehicleList(selectedList.map((item) => item.value));
    setDefaultComparisonVehicleList(selectedList);
  };

  const comparisonVehicleSelect = vehicles.filter(
    (v) => !comparisonVehicleList.includes(v.value)
  );
  const filteredVehicleList = vehicles.filter(
    (v) => v.value !== comparisonVehicle
  );

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="cus-modal-header">
          <Button className="cus-button-close" onClick={onClose}>
            X
          </Button>
        </div>
        <div className="cus-form-body">
          <div className="cus-modal-body">
            <div className="form-input-group">
              <label className="form-label">Chart Type</label>
              <select
                className="form-input"
                value={chartSelectedType}
                onChange={handleChartTypeChange}
              >
                <option value="">Select a Chart</option>
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="doughnut">Doughnut Chart</option>
                <option value="comparison-bar">Comparison Bar Chart</option>
              </select>
            </div>
            <div className="form-input-group">
              <label className="form-label">Chart Title</label>
              <input
                className="form-input"
                type="text"
                value={chartTitle}
                placeholder="Give Your Chart a Title"
                onInput={handleChartTitleChange}
              />
            </div>
            <div className="form-input-group">
              <label className="form-label">Chart Description</label>
              <textarea
                className="form-input"
                rows={3}
                value={chartDescription}
                placeholder="Give Your Chart a Description"
                onInput={handleChartDescriptionChange}
              ></textarea>
            </div>
          </div>
          <div className="cus-modal-body">
            {chartSelectedType !== 'comparison-bar' && (
              <div className="form-input-group">
                <label className="form-label">Vehicles</label>
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  components={animatedComponents}
                  options={vehicles}
                  onChange={handleSelectedVehicleList}
                  value={defaultVehicleList}
                />
              </div>
            )}
            {chartSelectedType === 'comparison-bar' && (
              <>
                <div className="form-input-group">
                  <label className="form-label">Comparsion Vehicle</label>
                  <select
                    className="form-input"
                    onChange={handleComparisonVehicle}
                    value={comparisonVehicle}
                  >
                    <option value="">Select the vehicle</option>
                    {comparisonVehicleSelect.map((vehicle) => (
                      <option key={vehicle.value} value={vehicle.value}>
                        {vehicle.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-input-group">
                  <label className="form-label">Vehicles</label>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    components={animatedComponents}
                    options={filteredVehicleList}
                    onChange={handleComparisonVehicleList}
                    value={defaultComparisonVehicleList}
                  />
                </div>
              </>
            )}
            {(chartSelectedType === 'bar' ||
              chartSelectedType === 'doughnut') &&
              selectedVehicleList.length > 0 && (
                <div className="form-input-group">
                  <label className="form-label">Fuel Option</label>
                  <select
                    className="form-input"
                    onChange={handleLoadForOtherCharts}
                    value={singleAxisValue}
                  >
                    <option value="">Select Value</option>
                    <option value="loaded">Fuel Consumption (Loaded)</option>
                    <option value="unloaded">
                      Fuel Consumption (Unloaded)
                    </option>
                  </select>
                </div>
              )}
            {chartSelectedType === 'line' && selectedVehicleList.length > 0 && (
              <>
                <div className="form-input-group">
                  <label className="form-label">x-axis</label>
                  <select
                    className="form-input"
                    onChange={handleXAxisChange}
                    value={xAxis}
                  >
                    <option value="">Select x-axis</option>
                    {filteredXAxisOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-input-group">
                  <label className="form-label">y-axis</label>
                  <select
                    className="form-input"
                    onChange={handleYAxisChange}
                    value={yAxis}
                  >
                    <option value="">Select y-axis</option>
                    {filteredYAxisOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="cus-modal-body">
            <div className="form-input-group">
              <label className="form-label">From</label>
              <input
                type="date"
                className="form-input"
                value={fromDate}
                max={maxDate}
                onChange={handleFromDateChange}
              />
            </div>
            <div className="form-input-group">
              <label className="form-label">To</label>
              <input
                type="date"
                className="form-input"
                value={toDate}
                min={minDate}
                onChange={handleToDateChange}
              />
            </div>
            {chartSelectedType === 'line' && (
              <div className="notes">
                Note: Only fuel consumption with load is shown for the line
                chart. To view data for unloaded conditions, use a different
                chart type.
              </div>
            )}
          </div>
        </div>
        <div className="form-button-group-vertical">
          <span className="clear-link-button" onClick={clearAllFields}>
            Clear
          </span>
          {individualChartData && (
            <button
              className="cus-button button-black"
              onClick={handleUpdateChart}
              // disabled={!isFormValid()}
            >
              Update
            </button>
          )}
          {!individualChartData && (
            <button
              className="cus-button button-black"
              onClick={handleGenerateChart}
              // disabled={!isFormValid()}
            >
              Generate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
