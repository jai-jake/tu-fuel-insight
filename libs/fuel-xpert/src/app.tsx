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

const App = () => {
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
    const updatedList = updatedChartsList.map((list, index) => {
      if (index % 2 === 0) {
        return { ...list, id: index, x: 0, y: Math.floor(index / 2) * 600 };
      } else {
        return { ...list, id: index, x: 670, y: Math.floor(index / 2) * 600 };
      }
    });
    setChartsList(JSON.parse(JSON.stringify(updatedList)));
  };

  const handleUpadteChartData = (id: number, updatedData: any) => {
    const updatedChartsList = chartsList.map((chartData) => {
      if (chartData.id === id) {
        return updatedData;
      }
      return chartData;
    });
    const updatedList = updatedChartsList.map((list, index) => {
      if (index % 2 === 0) {
        return { ...list, id: index, x: 0, y: Math.floor(index / 2) * 600 };
      } else {
        return { ...list, id: index, x: 670, y: Math.floor(index / 2) * 600 };
      }
    });
    setChartsList(JSON.parse(JSON.stringify(updatedList)));
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
    const updatedList = updatedChartsList.map((list, index) => {
      if (index % 2 === 0) {
        return { ...list, id: index, x: 0, y: Math.floor(index / 2) * 600 };
      } else {
        return { ...list, id: index, x: 670, y: Math.floor(index / 2) * 600 };
      }
    });
    setChartsList(JSON.parse(JSON.stringify(updatedList)));
    setIsOpened(false);
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
            {chartsList.map((chartData: any, index) => (
              <ChartCard
                key={chartData.id}
                chartData={chartData}
                onDelete={handleDeleteChart}
                onUpdate={handleUpadteChartData}
                chartsList={chartsList}
                setChartsList={setChartsList}
                index={index}
              />
            ))}
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
    </div>
  );
};

export default App;
