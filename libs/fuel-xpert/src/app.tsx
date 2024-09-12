/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './app.css';
import { datasets } from './datasets';
import { Text, Button, Icon } from '@trackunit/react-components';
import { Select } from '@trackunit/react-form-components';

import { useModal } from '@trackunit/react-modal';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { FileUploadAtom } from './components/FileUpload/FileUploadStore';
import ChartCard from './components/ChartCard/ChartCard';
import Draggable from 'react-draggable';
import FileUpload from './components/FileUpload/FileUpload';
import { set } from 'date-fns';

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
  const [mockData, setMockData] = useState<MockData[]>(datasets);
  const { closeModal, openModal, Modal } = useModal({
    closeOnOutsideClick: true,
  });
  const [uploadedData, setUploadedData] = useAtom(FileUploadAtom);

  const [chartGeneratorStage, setChartGeneratorStage] = useState('chartInfo');

  const [chartsList, setChartsList] = useState<any[]>([
    // {
    //   type: 'bar',
    //   title: 'Fuel Consumption',
    //   description: 'Fuel Consumption of Vehicles',
    //   selectedVechileList: ['vehicle1', 'vehicle2'],
    //   dateRange: '2024-08-01',
    //   singleAxisValue: 'load_with_payload',
    // },
    // {
    //   type: 'line',
    //   title: 'Fuel Consumption',
    //   description: 'Fuel Consumption of Vehicles',
    //   selectedVechileList: ['vehicle1', 'vehicle2'],
    //   dateRange: '2024-08-01',
    //   xAxis: 'load',
    //   yAxis: 'fuel',
    // },
  ]);

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

  // const handleStop = (e: any, data: any, index: number) => {
  //   const newChartsList = [...chartsList];
  //   const [movedItem] = newChartsList.splice(index, 1);
  //   const newIndex = data.y > 0 ? index + 1 : index - 1;
  //   newChartsList.splice(newIndex, 0, movedItem);
  //   setChartsList(newChartsList);

  //   // const updatedCards = [...chartsList];
  //   // updatedCards[index] = { ...updatedCards[index], x: data.x, y: data.y };

  //   // // Check if we need to swap positions with another card
  //   // for (let i = 0; i < chartsList.length; i++) {
  //   //   if (i !== index && isColliding(updatedCards[index], updatedCards[i])) {
  //   //     // Swap positions of the two cards
  //   //     const temp = { ...updatedCards[i] }; // Store card i's position
  //   //     updatedCards[i] = {
  //   //       ...updatedCards[i],
  //   //       type: chartsList[i].type,
  //   //       title: chartsList[i].title,
  //   //       description: chartsList[i].description,
  //   //       selectedVechileList: chartsList[i].selectedVechileList,
  //   //       dateRange: chartsList[i].dateRange,
  //   //       singleAxisValue: chartsList[i].singleAxisValue,
  //   //       xAxis: chartsList[i].xAxis,
  //   //       yAxis: chartsList[i].yAxis,
  //   //     }; // Move card i to card index's position
  //   //     updatedCards[index] = {
  //   //       ...updatedCards[index],
  //   //       type: chartsList[index].type,
  //   //       title: chartsList[index].title,
  //   //       description: chartsList[index].description,
  //   //       selectedVechileList: chartsList[index].selectedVechileList,
  //   //       dateRange: chartsList[index].dateRange,
  //   //       singleAxisValue: chartsList[index].singleAxisValue,
  //   //       xAxis: chartsList[index].xAxis,
  //   //       yAxis: chartsList[index].yAxis,
  //   //     }; // Move card index to card i's position
  //   //     break;
  //   //   }
  //   // }

  //   // setChartsList(updatedCards);
  // };

  // // Check if two cards are colliding
  // const isColliding = (card1: any, card2: any): boolean => {
  //   const buffer = 100; // Adjust the buffer for better overlap detection
  //   return (
  //     Math.abs(card1.x - card2.x) < buffer &&
  //     Math.abs(card1.y - card2.y) < buffer
  //   );
  // };

  const handleMockDataRevert = () => {
    setMockData(datasets);
    setUploadedData([]);
  };
  useEffect(() => {
    if (uploadedData.length > 0) {
      setMockData(uploadedData);
    }
  }, [uploadedData]);

  return (
    <div className="main-wrapper">
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
            <FileUpload />
            {uploadedData.length > 0 && (
              <Icon onClick={handleMockDataRevert} name="Backward"></Icon>
            )}
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
                // <Draggable
                //   key={index}
                //   handle=".drag-handle"
                //   onStop={(e, data) => handleStop(e, data, index)}
                // >
                <div>
                  <ChartCard
                    key={index}
                    index={index}
                    mockData={mockData}
                    chartData={chartData}
                    onDelete={handleDeleteChart}
                    onUpdate={handleUpadteChartData}
                  />
                </div>
                // </Draggable>
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
