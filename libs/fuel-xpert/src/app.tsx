import './app.css';
import { datasets } from './datasets';
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  Button,
  Alert,
} from '@trackunit/react-components';
import { Select } from '@trackunit/react-form-components';

import { useModal } from '@trackunit/react-modal';
import { useState } from 'react';

export const App = () => {
  const { closeModal, openModal, Modal } = useModal({
    closeOnOutsideClick: true,
  });

  const [chartGeneratorStage, setChartGeneratorStage] = useState('chartInfo');

  const vehicles: any[] = datasets.map((dataset: any) => {
    return {
      label: dataset.label,
      value: dataset.name,
    };
  });

  const handleBackButton = () => {
    setChartGeneratorStage('chartInfo');
  };

  const nextStep = () => {
    setChartGeneratorStage('chartOptions');
  };

  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const axisOptions = [
    { key: 'load', value: 'Load (Payload)' },
    { key: 'load_without_payload', value: 'Load (Without Payload)' },
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

  const handleLoadForOtherCharts = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
  };

  return (
    <div className="w-full h-full">
      <div className="add-custom-button">
        <button className="cus-button-1 button-black" onClick={openModal}>
          Add Chart
        </button>
      </div>
      {/* <Card className="w-full">
        <CardHeader
          heading="Welcome to your app extension"
          subHeading="Change the code in this file as you see fit"
        />
        <CardBody>
          
        </CardBody>
      </Card> */}
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
              <select className="form-input">
                <option value="">Select a Chart</option>
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="doughnut">Doughnut Chart</option>
              </select>
            </div>
            <div className="form-input-group">
              <label className="form-label">Chart Title</label>
              <input className="form-input" type="text" />
            </div>
            <div className="form-input-group">
              <label className="form-label">Chart Describtion</label>
              <textarea className="form-input" rows={3}></textarea>
            </div>
            <div className="form-button-group">
              <button className="cus-button button-black" onClick={nextStep}>
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
                  isMulti
                  maxMenuHeight={300}
                  options={vehicles}
                  placeholder="Select a Chart"
                />
              </div>
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
                    Fuel Consumption (With Load)
                  </option>
                  <option value="load_without_payload">
                    Fuel Consumption (Without Load)
                  </option>
                </select>
              </div>
              {/* <div className="form-input-group">
                <select className="form-input">
                  <option value="">Y - Axis</option>
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="doughnut">Doughnut Chart</option>
                </select>
              </div> */}
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
                onClick={handleBackButton}
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
