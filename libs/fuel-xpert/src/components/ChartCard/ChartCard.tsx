/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
// import BarChart from '../Charts/Bar';
import BarNChart from '../Charts/BarN';
import DoughnutChart from '../Charts/Doughnut';
import LineChart from '../Charts/Line';
import './ChartCard.css';
import { Text, Icon, Button } from '@trackunit/react-components';
import { useModal } from '@trackunit/react-modal';
import { Select } from '@trackunit/react-form-components';

const ChartCard: React.FC<any> = ({
  chartData,
  mockData,
  index,
  onDelete,
  onUpdate,
}) => {
  const chartValue = chartData;
  const mockArrayData = mockData;
  // console.log('Mock Array Data', mockArrayData);

  const vehicles: any[] = mockArrayData.map((vechile: any) => {
    return {
      label: vechile.label,
      value: vechile.name,
    };
  });

  const { closeModal, openModal, Modal } = useModal({
    closeOnOutsideClick: true,
  });

  const [chartSelectedType, setChartSelectedType] = useState<string>(
    chartValue.type
  );
  const handleChartTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChartSelectedType(event.target.value);
  };

  const [chartTitle, setChartTitle] = useState<string>(chartValue.title);
  const handleChartTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChartTitle(event.target.value);
  };

  const [chartDescription, setChartDescription] = useState<string>(
    chartValue.description
  );
  const handleChartDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setChartDescription(event.target.value);
  };

  const [selectedVechileList, setSelectedVechileList] = useState<any[]>(
    mockArrayData.filter((dataset: any) => {
      if (chartValue.selectedVechileList.includes(dataset.name)) {
        return {
          label: dataset.label,
          value: dataset.name,
        };
      }
      return false;
    })
  );

  const [xAxis, setXAxis] = useState<string>(chartValue.xAxis);
  const [yAxis, setYAxis] = useState<string>(chartValue.yAxis);
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

  const [singleAxisValue, setSingleAxisValue] = useState<string>(
    chartValue.singleAxisValue
  );
  const handleLoadForOtherCharts = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSingleAxisValue(event.target.value);
  };

  const handleSelectedVechileList = (selectedList: any) => {
    setSelectedVechileList(selectedList.map((item: any) => item.value));
  };

  const handleUpdateChart = () => {
    const updatedChart = {
      title: chartTitle,
      description: chartDescription,
      type: chartSelectedType,
      selectedVechileList: selectedVechileList,
      xAxis: xAxis,
      yAxis: yAxis,
      singleAxisValue: singleAxisValue,
    };
    onUpdate(index, updatedChart);
    closeModal();
  };

  const handleRemoveVechileFromList = (vechile: any) => {
    const updatedChart = {
      title: chartTitle,
      description: chartDescription,
      type: chartSelectedType,
      selectedVechileList: chartValue.selectedVechileList.filter(
        (item: any) => item !== vechile
      ),
      xAxis: xAxis,
      yAxis: yAxis,
      singleAxisValue: singleAxisValue,
    };
    onUpdate(index, updatedChart);
  };

  const handleDelete = (key: any) => {
    onDelete(key);
  };

  return (
    <div key={index} className="chart-card-wrapper">
      <div className="chart-card-header-wrapper">
        <div className="chart-card-title-wrapper">
          <div className="chart-card-header-title">
            <Icon
              className="drag-handle"
              name="EllipsisDrag"
              style={{ cursor: 'grab' }}
            ></Icon>
            <Text className="title-min-width">{chartValue.title}</Text>
            <span className="tooltip">
              <Icon
                name="InformationCircle"
                type="outline"
                style={{
                  cursor: 'pointer',
                  color: '#6E6E6E',
                }}
              />
              <span className="tooltiptext">{chartValue.description}</span>
            </span>
          </div>
          <div className="chart-card-header-actions">
            <Icon
              name="PencilSquare"
              type="outline"
              style={{
                cursor: 'pointer',
                color: '#6E6E6E',
              }}
              onClick={openModal}
            />
            <Icon
              name="Trash"
              type="outline"
              style={{
                cursor: 'pointer',
                color: '#6E6E6E',
              }}
              onClick={() => handleDelete(index)}
            />
          </div>
        </div>
        <div className="selection-wrapper">
          {chartValue.selectedVechileList.map(
            (vechile: any, vechileIndex: number) => {
              return (
                <div
                  className="selection-items"
                  key={vechileIndex}
                  style={{
                    background: mockArrayData.find(
                      (d: any) => d.name === vechile
                    )?.color,
                    color: mockArrayData.find((d: any) => d.name === vechile)
                      ?.textColor,
                  }}
                >
                  <span>{vechile}</span>
                  <Icon
                    name="XMark"
                    size="medium"
                    style={{ cursor: 'pointer', alignSelf: 'center' }}
                    onClick={() => handleRemoveVechileFromList(vechile)}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="chart-content">
        {/* {chartValue.type === 'bar' && <BarChart chartDetails={chartValue} />} */}
        {chartValue.type === 'bar' && (
          <BarNChart chartDetails={chartValue} mockArrayData={mockArrayData} />
        )}
        {chartValue.type === 'line' && (
          <LineChart chartDetails={chartValue} mockArrayData={mockArrayData} />
        )}
        {chartValue.type === 'doughnut' && (
          <DoughnutChart
            chartDetails={chartValue}
            mockArrayData={mockArrayData}
          />
        )}
      </div>
      <Modal className="custom-modal-size-auto">
        <div className="cus-modal-header">
          <Button className="cus-button-close" onClick={closeModal}>
            X
          </Button>
        </div>
        <div className="cus-modal-body">
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <div style={{ width: '50%' }}>
              <div className="form-input-group">
                <label className="form-label">Chart Title</label>
                <select
                  className="form-input"
                  value={chartSelectedType}
                  onChange={handleChartTypeChange}
                >
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
                  value={chartTitle}
                  placeholder="Give Your Chart a Title"
                  onInput={handleChartTitleChange}
                />
              </div>
              <div className="form-input-group">
                <label className="form-label">Chart Describtion</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={chartDescription}
                  placeholder="Give Your Chart a Describtion"
                  onInput={handleChartDescriptionChange}
                ></textarea>
              </div>
            </div>
            <div
              className="chart-options-selector"
              style={{ width: '50%', paddingTop: '0' }}
            >
              <div className="form-input-group">
                <label className="form-label">Vechiles</label>
                <Select
                  onChange={(list) => handleSelectedVechileList(list)}
                  isMulti
                  maxMenuHeight={300}
                  options={vehicles}
                  placeholder="Select a Vechiles"
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
                    value={singleAxisValue}
                    onChange={handleLoadForOtherCharts}
                  >
                    <option value="">Select Value</option>
                    <option value="loaded">
                      Fuel Consumption (With Loaded)
                    </option>
                    <option value="unloaded">
                      Fuel Consumption (With Unloaded)
                    </option>
                  </select>
                </div>
              )}
              {chartSelectedType === 'line' && (
                <>
                  <div className="form-input-group">
                    <label className="form-label">x-axis</label>
                    <select
                      className="form-input"
                      value={xAxis}
                      onChange={handleXAxisChange}
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
                      value={yAxis}
                      onChange={handleYAxisChange}
                    >
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
          </div>
        </div>
        <div className="form-button-group-vertical">
          <button
            className="cus-button button-black"
            onClick={handleUpdateChart}
          >
            Update
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ChartCard;
