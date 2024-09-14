/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './app.css';
import { Text, Button, Icon } from '@trackunit/react-components';
import { Select } from '@trackunit/react-form-components';

import { useModal } from '@trackunit/react-modal';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { FileUploadAtom } from './components/FileUpload/FileUploadStore';
import ChartCard from './components/ChartCard/ChartCard';
import FileUpload from './components/FileUpload/FileUpload';
import { MockDataAtom } from './store/mockDataStore';
import MockDataProvider from './store/mockDataProvider';

interface MockData {
  name: string;
  label: string;
  color: string;
  textColor: string;
  data: Array<{
    timestamp: string;
    weight: number;
    terrain: string;
    distanceKm: number;
    fuel: number;
  }>;
}

export const App = () => {
  const {
    closeModal,
    openModal: handleOpenModal,
    Modal,
  } = useModal({
    closeOnOutsideClick: true,
  });

  const openModal = (stage: any, event: any) => {
    setChartGeneratorStage(stage);
    handleOpenModal(event);
  };
  const [mockData] = useAtom(MockDataAtom);
  const [uploadedData, setUploadedData] = useAtom(FileUploadAtom);

  const [chartGeneratorStage, setChartGeneratorStage] = useState('');
  const [chartsList, setChartsList] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    const vehi: any[] = [];
    mockData.forEach((vechile: any) => {
      vehi.push({
        label: vechile.label,
        value: vechile.name,
      });
    });
    setVehicles(vehi);
  }, []);

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
    const chartData = {
      id: chartsList.length + 1,
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
    setChartGeneratorStage('');
    clearAllFields();
    closeModal();
  };

  const handleDeleteChart = (id: number) => {
    const updatedChartsList = chartsList.filter(
      (chartData) => chartData.id !== id
    );
    setChartsList(JSON.parse(JSON.stringify(updatedChartsList)));
  };

  const handleUpadteChartData = (id: number, updatedData: any) => {
    const updatedChartsList = chartsList.map((chartData) => {
      if (chartData.id === id) {
        return updatedData;
      }
      return chartData;
    });
    setChartsList(updatedChartsList);
  };

  const handleMockDataRevert = () => {
    setUploadedData([]);
  };

  return (
    <div className="main-wrapper">
      {chartsList.length === 0 && (
        <div
          className="report-card-warpper"
          onClick={(e) => openModal('chartInfo', e)}
        >
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
            {uploadedData.length > 0 && (
              <Button
                className="cus-button button-black"
                onClick={handleMockDataRevert}
              >
                Revert Data
              </Button>
            )}
            <FileUpload />
            <Button
              className="cus-button button-black"
              onClick={(e) => openModal('chartInfo', e)}
            >
              Add a New Chart
            </Button>
          </div>
          <div className="chart-content">
            {chartsList.map((chartData: any, index: number) => {
              return (
                <div key={index}>
                  <ChartCard
                    chartData={chartData}
                    onDelete={handleDeleteChart}
                    onUpdate={handleUpadteChartData}
                    vehicles={vehicles}
                  />
                </div>
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
      </Modal>
      {/* <DragAndSwap /> */}
    </div>
  );
};
