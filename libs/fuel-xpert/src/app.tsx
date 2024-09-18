/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './app.css';
import { Text, Button, Icon } from '@trackunit/react-components';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { FileUploadAtom } from './components/FileUpload/FileUploadStore';
import ChartCard from './components/ChartCard/ChartCard';
import FileUpload from './components/FileUpload/FileUpload';
import { MockDataAtom } from './store/mockDataStore';
import ModalCommpnent from './components/ModalComponent/ModelComponent';
import Draggable from 'react-draggable';

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
  const [mockData, setMockData] = useAtom(MockDataAtom);
  const [uploadedData, setUploadedData] = useAtom(FileUploadAtom);

  const [mockDataCopy, setMockDataCopy] = useState(mockData);
  const [chartsList, setChartsList] = useState<any[]>([]);

  useEffect(() => {
    if (uploadedData.length) {
      setMockData(uploadedData);
    }
  }, [uploadedData]);

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
    setMockData(mockDataCopy);
    setUploadedData([]);
  };

  const [isOpened, setIsOpened] = useState(false);
  const handleCloseModal = () => {
    setIsOpened(false);
  };

  const handleAddChart = (chartData: any) => {
    const newId = chartsList.length + 1;
    const chartWithId = { ...chartData, id: newId, x: 0, y: 0 };
    const updatedChartsList = [...chartsList, chartWithId];
    setChartsList(updatedChartsList);
    setIsOpened(false);
  };

  const [draggingChart, setDraggingChart] = useState<any>(null);

  const handleDragStart = (id: number) => {
    setDraggingChart(id);
  };

  const handleDragStop = (e: any, data: any, id: number) => {
    const updatedChartsList = [...chartsList];
    const draggedChartIndex = updatedChartsList.findIndex(
      (chart) => chart.id === id
    );
    const draggedChart = {
      ...updatedChartsList[draggedChartIndex],
      x: data.x,
      y: data.y,
    };

    for (let i = 0; i < updatedChartsList.length; i++) {
      if (
        i !== draggedChartIndex &&
        isOverlapping(draggedChart, updatedChartsList[i])
      ) {
        // Swap positions
        const tempX = updatedChartsList[i].x;
        const tempY = updatedChartsList[i].y;
        updatedChartsList[i].x = draggedChart.x;
        updatedChartsList[i].y = draggedChart.y;
        draggedChart.x = tempX;
        draggedChart.y = tempY;
        break;
      }
    }

    updatedChartsList[draggedChartIndex] = draggedChart;
    setChartsList(updatedChartsList);
    setDraggingChart(null);
  };

  const isOverlapping = (draggedChart: any, targetChart: any) => {
    const buffer = 100; // Adjust the buffer for better overlap detection
    return (
      Math.abs(draggedChart.x - targetChart.x) < buffer &&
      Math.abs(draggedChart.y - targetChart.y) < buffer
    );
  };

  return (
    <div className="main-wrapper">
      {chartsList.length === 0 && (
        <div className="report-card-warpper" onClick={() => setIsOpened(true)}>
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
              onClick={() => setIsOpened(true)}
            >
              Add a New Chart
            </Button>
          </div>
          <div className="chart-content-list">
            {chartsList.map((chartData: any) => {
              return (
                <Draggable
                  key={chartData.id}
                  position={{ x: chartData.x, y: chartData.y }} // Set initial position
                  onStart={() => handleDragStart(chartData.id)}
                  onStop={(e, data) => handleDragStop(e, data, chartData.id)}
                  axis="both"
                  // handle=".drag-handle"
                >
                  {/* <div key={chartData.id}> */}
                  <ChartCard
                    key={chartData.id}
                    chartData={chartData}
                    onDelete={handleDeleteChart}
                    onUpdate={handleUpadteChartData}
                  />
                  {/* </div> */}
                </Draggable>
              );
            })}
          </div>
        </div>
      )}
      {isOpened && (
        <ModalCommpnent
          mockData={mockData}
          isOpened={isOpened}
          onClose={handleCloseModal}
          onAddChart={handleAddChart}
        />
      )}
      {/* <DragAndSwap /> */}
    </div>
  );
};
