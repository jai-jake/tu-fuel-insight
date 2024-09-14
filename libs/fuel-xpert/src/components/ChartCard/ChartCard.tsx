/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import BarNChart from '../Charts/BarN';
import DoughnutChart from '../Charts/Doughnut';
import LineChart from '../Charts/Line';
import './ChartCard.css';
import { Text, Icon, Button } from '@trackunit/react-components';
import { useModal } from '@trackunit/react-modal';
import { Select } from '@trackunit/react-form-components';
import { useAtom } from 'jotai';
import { MockDataAtom } from '../../store/mockDataStore';

const ChartCard = (propsData: any) => {
  const [mockData] = useAtom(MockDataAtom);

  const [chartValue, setChartValue] = useState(propsData.chartData);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setChartValue(propsData.chartData);
  }, [propsData]);

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
    mockData.filter((dataset: any) => {
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
      id: chartValue.id,
      title: chartTitle,
      description: chartDescription,
      type: chartSelectedType,
      selectedVechileList: selectedVechileList,
      xAxis: xAxis,
      yAxis: yAxis,
      singleAxisValue: singleAxisValue,
    };
    propsData.onUpdate(chartValue.id, updatedChart);
    closeModal();
  };

  const handleRemoveVechileFromList = (vechile: any) => {
    const updatedChart = {
      id: chartValue.id,
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
    propsData.onUpdate(updatedChart);
  };

  const handleDelete = (key: any) => {
    propsData.onDelete(key);
  };

  const zoomInStyle: any = {
    position: 'absolute',
    top: '0',
    left: '0',
    minWidth: '100vw',
    maxWidth: '100vw',
    maxHeight: '100vh',
    zIndex: '100',
    backgroundColor: 'white',
  };

  const zoomOutStyle: any = {
    minWidth: '650px',
    width: '49.5%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const zoomInCardStyle: any = {
    width: '100vw',
    flexGrow: '1',
    paddingTop: '20px',
  };

  const zoomOutCardStyle: any = {
    width: '650px',
    maxHeight: '500px',
    flexGrow: '1',
    paddingTop: '20px',
  };

  return (
    <div
      key={chartValue.id}
      className="chart-card-wrapper"
      style={isZoomed ? zoomInStyle : zoomOutStyle}
    >
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
            {!isZoomed && (
              <Icon
                name="ArrowsPointingOut"
                type="outline"
                style={{
                  cursor: 'pointer',
                  color: '#6E6E6E',
                }}
                onClick={() => setIsZoomed(!isZoomed)}
              ></Icon>
            )}
            {isZoomed && (
              <Icon
                name="ArrowsPointingIn"
                type="outline"
                style={{
                  cursor: 'pointer',
                  color: '#6E6E6E',
                }}
                onClick={() => setIsZoomed(!isZoomed)}
              ></Icon>
            )}
            <Icon
              name="Trash"
              type="outline"
              style={{
                cursor: 'pointer',
                color: '#6E6E6E',
              }}
              onClick={() => handleDelete(chartValue.id)}
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
                    background: mockData.find((d: any) => d.name === vechile)
                      ?.color,
                    color: mockData.find((d: any) => d.name === vechile)
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
      <div
        className="chart-content"
        style={isZoomed ? zoomInCardStyle : zoomOutCardStyle}
      >
        {chartValue.type === 'bar' && <BarNChart chartDetails={chartValue} />}
        {chartValue.type === 'line' && <LineChart chartDetails={chartValue} />}
        {chartValue.type === 'doughnut' && (
          <DoughnutChart chartDetails={chartValue} />
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
                <label className="form-label">Chart Type</label>
                <select
                  className="form-input"
                  value={chartSelectedType}
                  onChange={handleChartTypeChange}
                >
                  <option value="">Select</option>
                  <option value="line">Line</option>
                  <option value="bar">Bar</option>
                  <option value="doughnut">Doughnut</option>
                </select>
              </div>
              <div className="form-input-group">
                <label className="form-label">Title</label>
                <input
                  className="form-input"
                  type="text"
                  value={chartTitle}
                  placeholder="Give Your Chart a Title"
                  onInput={handleChartTitleChange}
                />
              </div>
              <div className="form-input-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={chartDescription}
                  placeholder="Give Your Chart a Description"
                  onInput={handleChartDescriptionChange}
                ></textarea>
              </div>
            </div>
            <div
              className="chart-options-selector"
              style={{ width: '50%', paddingTop: '0' }}
            >
              <div className="form-input-group">
                <label className="form-label">Vehicles</label>
                <Select
                  onChange={(list) => handleSelectedVechileList(list)}
                  isMulti
                  maxMenuHeight={300}
                  options={propsData.vehicles}
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
                    value={singleAxisValue}
                    onChange={handleLoadForOtherCharts}
                  >
                    <option value="">Select</option>
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
                      <option value="">Select</option>
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
                      <option value="">Select</option>
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
