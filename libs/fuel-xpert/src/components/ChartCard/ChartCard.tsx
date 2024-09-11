import { useState } from 'react';
import { datasets } from '../../datasets';
import BarChart from '../Charts/Bar';
import BarNChart from '../Charts/BarN';
import DoughnutChart from '../Charts/Doughnut';
import LineChart from '../Charts/Line';
import './ChartCard.css';
import { Text, Icon, Button } from '@trackunit/react-components';
import { useModal } from '@trackunit/react-modal';
import { Select } from '@trackunit/react-form-components';
import { chart } from 'highcharts';

const ChartCard: React.FC<any> = ({ chartData, index, onDelete, onUpdate }) => {
  const chartValue = chartData;

  const vehicles: any[] = datasets.map((dataset: any) => {
    return {
      label: dataset.label,
      value: dataset.name,
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
    datasets.filter((dataset: any) => {
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
              name="XMark"
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
                <div className="selection-items" key={vechileIndex}>
                  <Text size="small" weight="normal">
                    {vechile}
                  </Text>
                  <Icon
                    name="XMark"
                    size="medium"
                    style={{ cursor: 'pointer', alignContent: 'center' }}
                    onClick={() => handleRemoveVechileFromList(vechile)}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="chart-content">
        {chartValue.type === 'bar' && <BarNChart chartDetails={chartValue} />}
        {/* {chartValue.type === 'bar' && <BarChart chartDetails={chartValue} />} */}
        {chartValue.type === 'line' && <LineChart chartDetails={chartValue} />}
        {chartValue.type === 'doughnut' && (
          <DoughnutChart chartDetails={chartValue} />
        )}
      </div>
      <Modal className="custom-modal-size">
        <div className="cus-modal-header">
          <Button className="cus-button-close" onClick={closeModal}>
            X
          </Button>
        </div>
        <div className="cus-modal-body">
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
              onInput={handleChartTitleChange}
            />
          </div>
          <div className="form-input-group">
            <label className="form-label">Chart Describtion</label>
            <textarea
              className="form-input"
              rows={3}
              value={chartDescription}
              onInput={handleChartDescriptionChange}
            ></textarea>
          </div>
        </div>
        <div className="cus-modal-body">
          <div className="chart-options-selector" style={{ marginTop: '15px' }}>
            <div className="form-input-group">
              <Select
                onChange={(list) => handleSelectedVechileList(list)}
                isMulti
                maxMenuHeight={300}
                options={vehicles}
                placeholder="Select a Vechiles"
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
                    value={singleAxisValue}
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
                  <select
                    className="form-input"
                    value={xAxis}
                    onChange={handleXAxisChange}
                  >
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
                  <select
                    className="form-input"
                    value={yAxis}
                    onChange={handleYAxisChange}
                  >
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
              onClick={handleUpdateChart}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChartCard;
