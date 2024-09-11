/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './app.css';
import { datasets } from './datasets';
import { Text, Button, Icon } from '@trackunit/react-components';
import { Select } from '@trackunit/react-form-components';

import { useModal } from '@trackunit/react-modal';
import { useEffect, useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import { useAtom } from 'jotai';
import { FileUploadAtom } from './components/FileUpload/FileUploadStore';
import ChartCard from './components/ChartCard/ChartCard';

export const App = () => {
  const { closeModal, openModal, Modal } = useModal({
    closeOnOutsideClick: true,
  });
  const [uploadedData] = useAtom(FileUploadAtom);

  const [chartGeneratorStage, setChartGeneratorStage] = useState('chartInfo');

  const [chartsList, setChartsList] = useState<any[]>([]);

  const vehicles: any[] = datasets.map((dataset: any) => {
    return {
      label: dataset.label,
      value: dataset.name,
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
    { key: 'load', value: 'Load (With Loaded)' },
    { key: 'load_without_payload', value: 'Load (With Unloaded)' },
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
      return option.key === 'load' || option.key === 'load_without_payload';
    } else if (yAxis === 'load' || yAxis === 'load_without_payload') {
      return option.key !== 'load' && option.key !== 'load_without_payload';
    }
    return option.key !== yAxis;
  });

  const filteredYAxisOptions = axisOptions.filter((option) => {
    if (xAxis === 'fuel') {
      return option.key === 'load' || option.key === 'load_without_payload';
    } else if (xAxis === 'load' || xAxis === 'load_without_payload') {
      return option.key !== 'load' && option.key !== 'load_without_payload';
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
    const chartData = {
      type: chartSelectedType,
      title: chartTitle,
      description: chartDescription,
      selectedVechileList: selectedVechileList,
      dateRange: dateRange,
      singleAxisValue: singleAxisValue,
      xAxis: xAxis,
      yAxis: yAxis,
    };
    setChartsList([...chartsList, chartData]);
    setChartGeneratorStage('chartInfo');
    clearAllFields();
    closeModal();
  };

  const handleDeleteChart = (index: number) => {
    const updatedChartsList = chartsList.filter(
      (chartData, chartIndex) => chartIndex !== index
    );
    setChartsList(updatedChartsList);
  };

  const handleUpadteChartData = (index: number, updatedData: any) => {
    const updatedChartsList = chartsList.map((chartData, chartIndex) => {
      if (chartIndex === index) {
        return updatedData;
      }
      return chartData;
    });
    setChartsList(updatedChartsList);
  };

  useEffect(() => {
    console.log('<<uploadedData>>', uploadedData);
  }, [uploadedData]);

  return (
    <div className="main-wrapper">
      {/* <FileUpload /> */}
      {chartsList.length === 0 && (
        <div className="report-card-warpper" onClick={openModal}>
          <div className="inner-card-wrapper">
            <Icon
              name="PresentationChartLine"
              size="large"
              color="critical"
              className="margin-bottom-10"
            />
            <Text size="large" weight="thick">
              Chart Generator
            </Text>
            <Text size="small">Create Your Own Charts</Text>
          </div>
        </div>
      )}
      {chartsList.length > 0 && (
        <div className="chart-content-wrapper">
          <div className="add-chart-button-wrapper">
            <Button
              className="cus-button button-black"
              suffix={<Icon name="Plus" size="small" />}
              onClick={openModal}
            >
              Add Chart
            </Button>
          </div>
          {/* <div className="chart-content">
            <ChartCard chartListData={chartsList} />
          </div> */}
          <div className="chart-content">
            {chartsList.map((chartData: any, index: number) => {
              return (
                <ChartCard
                  key={index}
                  index={index}
                  chartData={chartData}
                  onDelete={handleDeleteChart}
                  onUpdate={handleUpadteChartData}
                />
              );
            })}
          </div>
        </div>
      )}
      <Modal className="custom-modal-size">
        <div className="cus-modal-header">
          <Button className="cus-button-close" onClick={closeModal}>
            X
          </Button>
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
                onInput={handleChartTitleChange}
              />
            </div>
            <div className="form-input-group">
              <label className="form-label">Chart Describtion</label>
              <textarea
                className="form-input"
                rows={3}
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
                <Select
                  onChange={(list) => handleSelectedVechileList(list)}
                  isMulti
                  maxMenuHeight={300}
                  options={vehicles}
                  placeholder="Select a Chart"
                />
              </div>
              {(chartSelectedType === 'bar' ||
                chartSelectedType === 'doughnut') && (
                <>
                  <div className="form-input-group">
                    <input className="form-input" type="date" />
                  </div>
                  <div className="form-input-group">
                    <select
                      className="form-input"
                      onChange={handleLoadForOtherCharts}
                    >
                      <option value="">Select Value</option>
                      <option value="load_with_payload">
                        Fuel Consumption (With Loaded)
                      </option>
                      <option value="load_without_payload">
                        Fuel Consumption (With Unloaded)
                      </option>
                    </select>
                  </div>
                </>
              )}
              {chartSelectedType === 'line' && (
                <>
                  <div className="form-input-group">
                    <label className="form-label">X Axis</label>
                    <select className="form-input" onChange={handleXAxisChange}>
                      <option value="">Select X Axis</option>
                      {filteredXAxisOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Y Axis</label>
                    <select className="form-input" onChange={handleYAxisChange}>
                      <option value="">Select Y Axis</option>
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
      </Modal>
    </div>
  );
};
