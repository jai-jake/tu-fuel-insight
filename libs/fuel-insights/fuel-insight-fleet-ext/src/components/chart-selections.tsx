import React, { useState } from 'react';
import { datasets } from '../datasets';
import './components-style.css';

import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Icon,
} from '@trackunit/react-components';
import { useModal } from '@trackunit/react-modal';
import {
  Select,
  TextAreaField,
  TextField,
} from '@trackunit/react-form-components';

import { DayRangePicker } from '@trackunit/react-date-and-time-components';

interface ChartDetaiilSet {
  chart: ChartDetails;
  vechile: [];
  isDoughnut: boolean;
  doughnut: {
    daterange: string[];
    parameter: string;
    isPayload: boolean;
  };
  isBar: boolean;
  bar: {
    daterange: string[];
    parameter: string;
    isPayload: boolean;
  };
  isLine: boolean;
  line: {
    xAxis: string;
    yAxis: string;
  };
}

interface ChartDetails {
  chartType: string;
  chartName: string;
  description: string;
}

const ChartSelection: React.FC<any> = ({ passChartDataToApp }) => {
  const [chartDetailSet, setChartDetailSet] = useState<ChartDetaiilSet[]>([]);
  const vehicles: any[] = datasets.map((dataset) => {
    return {
      label: dataset.label,
      value: dataset.name,
    };
  });
  const availableDates: any[] = datasets.map((dataset) => {
    return dataset.data.map((data) => {
      return new Date(data.timestamp);
    });
  });
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const { closeModal, openModal, Modal } = useModal({
    closeOnOutsideClick: true,
  });

  const [chartDetails, setChartDetails] = useState<ChartDetails>({
    chartType: '',
    chartName: '',
    description: '',
  });

  const handleSelectChange = (value: any) => {
    setChartDetails((prevDetails) => ({
      ...prevDetails,
      chartType: value.value,
    }));
  };

  const hanldeChartName = (e: any) => {
    setChartDetails((prevDetails) => ({
      ...prevDetails,
      chartName: e.target.value,
    }));
  };

  const hanldeChartDesc = (e: any) => {
    setChartDetails((prevDetails) => ({
      ...prevDetails,
      description: e.target.value,
    }));
  };

  const saveChartDetails = () => {
    if (chartDetails.chartType === 'line') {
      setChartDetailSet((prevDetails) => [
        ...prevDetails,
        {
          chart: chartDetails,
          vechile: [],
          isDoughnut: false,
          doughnut: {
            daterange: [],
            parameter: '',
            isPayload: false,
          },
          isBar: false,
          bar: {
            daterange: [],
            parameter: '',
            isPayload: false,
          },
          isLine: true,
          line: {
            xAxis: '',
            yAxis: '',
          },
        },
      ]);
    } else if (chartDetails.chartType === 'bar') {
      setChartDetailSet((prevDetails) => [
        ...prevDetails,
        {
          chart: chartDetails,
          vechile: [],
          isDoughnut: false,
          doughnut: {
            daterange: [],
            parameter: '',
            isPayload: false,
          },
          isBar: true,
          bar: {
            daterange: [],
            parameter: '',
            isPayload: false,
          },
          isLine: false,
          line: {
            xAxis: '',
            yAxis: '',
          },
        },
      ]);
    } else if (chartDetails.chartType === 'doughnut') {
      setChartDetailSet((prevDetails) => [
        ...prevDetails,
        {
          chart: chartDetails,
          vechile: [],
          isDoughnut: true,
          doughnut: {
            daterange: [],
            parameter: '',
            isPayload: false,
          },
          isBar: false,
          bar: {
            daterange: [],
            parameter: '',
            isPayload: false,
          },
          isLine: false,
          line: {
            xAxis: '',
            yAxis: '',
          },
        },
      ]);
    }
    closeModal();
  };

  const handleVehicleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedVehicles((prevSelected: any) => {
      const newSelected = event.target.checked
        ? [...prevSelected, value]
        : prevSelected.filter((vehicle: any) => vehicle !== value);
      chartDetailSet[0].vechile = newSelected;
      return newSelected;
    });
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
    chartDetailSet[0].line.xAxis = event.target.value;
  };

  const handleYAxisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxis(event.target.value);
    chartDetailSet[0].line.yAxis = event.target.value;
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

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  const handleLoadForOtherCharts = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (chartDetailSet.length > 0) {
      const updatedChartSet = chartDetailSet.map((chart) => {
        if (chart.isBar) {
          return {
            ...chart,
            bar: {
              ...chart.bar,
              parameter: event.target.value,
              isPayload:
                event.target.value === 'load_with_payload' ? true : false,
            },
          };
        } else if (chart.isDoughnut) {
          return {
            ...chart,
            doughnut: {
              ...chart.doughnut,
              parameter: event.target.value,
              isPayload:
                event.target.value === 'load_with_payload' ? true : false,
            },
          };
        }
        return chart;
      });
      setChartDetailSet(updatedChartSet);
    }
  };

  const handleClearData = () => {
    clearData();
  };

  const [dataRangeBoolean, setDataRangeBoolean] = useState(false);

  const handleDateBoolean = () => {
    setDataRangeBoolean(!dataRangeBoolean);
  };

  const handleDateRangeSelection = (selectedRange: any) => {
    const { from, to } = selectedRange;

    const dateRangeStrings = getDatesInRange(from, to);

    if (chartDetailSet[0].isDoughnut) {
      chartDetailSet[0].doughnut.daterange = dateRangeStrings;
    }
    if (chartDetailSet[0].isBar) {
      chartDetailSet[0].bar.daterange = dateRangeStrings;
    }

    setDataRangeBoolean(!dataRangeBoolean);
  };

  const getDatesInRange = (start: Date, end: Date): string[] => {
    // Set the time to midnight for both start and end dates
    const startDate = new Date(start.setHours(0, 0, 0, 0));
    const endDate = new Date(end.setHours(0, 0, 0, 0));
    const date = new Date(startDate.getTime());
    const dates: string[] = [];

    while (date <= endDate) {
      dates.push(date.toISOString().split('T')[0]);
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const clearData = () => {
    setChartDetails({
      chartType: '',
      chartName: '',
      description: '',
    });
    setChartDetailSet([]);
    setSelectedVehicles([]);
    setXAxis('');
    setYAxis('');
    setDateRange({
      from: new Date(),
      to: new Date(),
    });
  };

  const handleGenrateChart = () => {
    passChartDataToApp(chartDetailSet);
    clearData();
  };

  return (
    <div className="sidebar-wrapper">
      {chartDetailSet.length <= 0 && (
        <div className="flex justify-center gap-4">
          <Button
            suffix={<Icon name="PlusSmall" type="solid" size="medium" />}
            onClick={openModal}
          >
            Add Chart
          </Button>
        </div>
      )}
      <Modal className="custom-modal-size">
        <CardHeader
          onClose={closeModal}
          heading="Create Your Chart!!"
          headingVariant="secondary"
          density="comfortable"
        />
        <CardBody density="compact">
          <label>Chart Type</label>
          <Select
            onChange={(selected) => handleSelectChange(selected)}
            options={[
              {
                label: 'Line Chart',
                value: 'line',
              },
              {
                label: 'Bar Chart',
                value: 'bar',
              },
              {
                label: 'Doughnut Chart',
                value: 'doughnut',
              },
            ]}
            placeholder="Select Chart Type"
          />
          <TextField
            onInput={(e) => hanldeChartName(e)}
            label="Chart Name"
            placeholder="Enter Chart Name"
            size={12}
          />
          <TextAreaField
            label="Description"
            placeholder="Enter Description"
            onInput={(e) => hanldeChartDesc(e)}
          />
        </CardBody>
        <CardFooter density="compact">
          <Button onClick={saveChartDetails} variant="primary">
            Add
          </Button>
          <Button onClick={closeModal} variant="primary-danger">
            Close
          </Button>
        </CardFooter>
      </Modal>
      {chartDetailSet.length > 0 && (
        <div className="vec-selection-wrapper">
          <label>Vehicles List</label>
          {vehicles.map((vehicle, index) => (
            <div key={index} className="selction-boxs">
              <input
                type="checkbox"
                value={vehicle.value}
                onChange={handleVehicleChange}
              />
              <label>{vehicle.label}</label>
            </div>
          ))}
        </div>
      )}
      {selectedVehicles.length > 0 && chartDetails.chartType == 'line' && (
        <div className="axis-selection-wrapper">
          <label>Axis Selection</label>
          <div className="axis-selection">
            <div className="axis">
              <label>X-Axis</label>
              <select name="x-axis" value={xAxis} onChange={handleXAxisChange}>
                <option value="">Select Value</option>
                {filteredXAxisOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="axis">
              <label>Y-Axis</label>
              <select name="y-axis" value={yAxis} onChange={handleYAxisChange}>
                <option value="">Select Value</option>
                {filteredYAxisOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      {selectedVehicles.length > 0 &&
        (chartDetails.chartType == 'bar' ||
          chartDetails.chartType == 'doughnut') && (
          <div className="axis-selection-wrapper">
            <label className="date-calendar-label" onClick={handleDateBoolean}>
              Date Range <Icon name="CalendarDays" size="medium"></Icon>
            </label>
            {dataRangeBoolean && (
              <DayRangePicker
                onRangeSelect={(selectedRange) => {
                  handleDateRangeSelection(selectedRange);
                }}
                language="en"
                selectedDays={dateRange}
              />
            )}
          </div>
        )}
      {selectedVehicles.length > 0 &&
        (chartDetails.chartType == 'bar' ||
          chartDetails.chartType == 'doughnut') && (
          <div className="axis-selection-wrapper">
            <label>Payload Type</label>
            <select onChange={handleLoadForOtherCharts}>
              <option value="">Select Value</option>
              <option value="load_with_payload">
                Fuel Consumption (With Load)
              </option>
              <option value="load_without_payload">
                Fuel Consumption (Without Load)
              </option>
            </select>
          </div>
        )}
      {chartDetailSet.length > 0 && selectedVehicles.length > 0 && (
        <div className="flex flex-col justify-center gap-4">
          <Button
            onClick={handleGenrateChart}
            suffix={<Icon name="PlusSmall" type="solid" size="medium" />}
          >
            Generate Chart
          </Button>
          <Button
            onClick={handleClearData}
            suffix={<Icon name="XMark" type="solid" size="medium" />}
            variant="primary-danger"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChartSelection;
