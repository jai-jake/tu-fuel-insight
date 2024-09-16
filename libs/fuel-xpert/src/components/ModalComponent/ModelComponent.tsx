import { Button } from '@trackunit/react-components';
import { Select } from '@trackunit/react-form-components';
import { useState } from 'react';
import './ModalComponent.css';

const ModalCommpnent = (props: any) => {
  const { isOpen, action, mockData } = props;

  const [chartGeneratorStage, setChartGeneratorStage] = useState('chartInfo');

  const vehicles: any[] = mockData.map((vechile: any) => {
    return {
      label: vechile.label,
      value: vechile.name,
    };
  });

  const [chartSelectedType, setChartSelectedType] = useState<string>('');
  const handleChartTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChartSelectedType(event.target.value);
  };

  const [chartTitle, setChartTitle] = useState<string>('');
  const handleChartTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChartTitle(event.target.value);
  };

  const [chartDescription, setChartDescription] = useState<string>('');
  const handleChartDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setChartDescription(event.target.value);
  };

  const handleBackButton = () => {
    setChartGeneratorStage('chartInfo');
  };

  const handlenextStep = () => {
    setChartGeneratorStage('chartOptions');
  };

  const [selectedVechileList, setSelectedVechileList] = useState<any[]>([]);
  const handleSelectedVechileList = (selectedList: any) => {
    setSelectedVechileList(selectedList.map((item: any) => item.value));
  };

  const [dateRange, setDateRange] = useState<string>('');
  const handleDateRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateRange(event.target.value);
  };

  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const axisOptions = [
    { key: 'load', value: 'Load' },
    { key: 'fuel', value: 'Fuel Consumption' },
  ];

  const handleXAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setXAxis(event.target.value);
  };

  const handleYAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxis(event.target.value);
  };

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

  const [singleAxisValue, setSingleAxisValue] = useState<string>('');
  const handleLoadForOtherCharts = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSingleAxisValue(event.target.value);
  };

  const clearAllFields = () => {
    setChartSelectedType('');
    setChartTitle('');
    setChartDescription('');
    setXAxis('');
    setYAxis('');
    setSingleAxisValue('');
  };

  const handleGenerateChart = () => {
    // const chartData = {
    //   id: chartsList.length + 1,
    //   type: chartSelectedType,
    //   title: chartTitle,
    //   description: chartDescription,
    //   selectedVechileList: selectedVechileList,
    //   dateRange: dateRange,
    //   singleAxisValue: singleAxisValue,
    //   xAxis: xAxis,
    //   yAxis: yAxis,
    // };
    // setChartsList([...chartsList, chartData]);
    // setChartGeneratorStage('');
    // clearAllFields();
    // closeModal();
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="cus-modal-header">
          <Button className="cus-button-close">X</Button>
        </div>
        {chartGeneratorStage === 'chartInfo' && (
          <div className="cus-modal-body">
            <div className="form-input-group">
              <label className="form-label">Chart Title</label>
              <select className="form-input" onChange={handleChartTypeChange}>
                <option value="">Select a Chart</option>
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="doughnut">Doughnut Chart</option>
              </select>
            </div>
            <div className="form-input-group">
              <label className="form-label">Chart Title</label>
              <input
                className="form-input"
                type="text"
                placeholder="Give Your Chart a Title"
                onInput={handleChartTitleChange}
              />
            </div>
            <div className="form-input-group">
              <label className="form-label">Chart Describtion</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Give Your Chart a Describtion"
                onInput={handleChartDescriptionChange}
              ></textarea>
            </div>
            <div className="form-button-group">
              <button
                className="cus-button button-black"
                onClick={handlenextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {chartGeneratorStage === 'chartOptions' && (
          <div className="cus-modal-body">
            <div className="chart-options-selector">
              <div className="form-input-group">
                <label className="form-label">Vechiles</label>
                <Select
                  onChange={(list) => handleSelectedVechileList(list)}
                  isMulti
                  maxMenuHeight={300}
                  options={vehicles}
                  placeholder="Select Vehicles"
                />
              </div>
              <div className="form-input-group">
                <input className="form-input" type="date" />
              </div>
              {(chartSelectedType === 'bar' ||
                chartSelectedType === 'doughnut') && (
                <div className="form-input-group">
                  <select
                    className="form-input"
                    onChange={handleLoadForOtherCharts}
                  >
                    <option value="">Select Value</option>
                    <option value="loaded">Fuel Consumption (Loaded)</option>
                    <option value="unloaded">
                      Fuel Consumption (Unloaded)
                    </option>
                  </select>
                </div>
              )}
              {chartSelectedType === 'line' && (
                <>
                  <div className="form-input-group">
                    <label className="form-label">x-axis</label>
                    <select className="form-input" onChange={handleXAxisChange}>
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
                    <select className="form-input" onChange={handleYAxisChange}>
                      <option value="">Select y-axis</option>
                      {filteredYAxisOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="notes">
                    Note: Only fuel consumption with load is shown for the line
                    chart. To view data for unloaded conditions, use a different
                    chart type.
                  </div>
                </>
              )}
            </div>
            <div className="form-button-group-vertical">
              <button
                className="cus-button button-black"
                onClick={handleBackButton}
              >
                Back
              </button>
              <button
                className="cus-button button-black"
                onClick={handleGenerateChart}
              >
                Genrate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCommpnent;
