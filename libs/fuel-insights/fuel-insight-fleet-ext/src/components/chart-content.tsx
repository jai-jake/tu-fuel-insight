import React from 'react';
import './components-style.css';
import { Icon } from '@trackunit/react-components';
import { LineChart } from '../chart-components/line-chart';
import { DoughnutChart } from '../chart-components/doughnut';
import { BarChart } from '../chart-components/bar-chart';

const ChartContent: React.FC<any> = ({ chartData }) => {
  return (
    <div className="page-content">
      <div className="chart-section">
        {chartData &&
          chartData.map((outer: any, outerIndex: number) =>
            outer.map((inner: any, innerIndex: number) => (
              <div
                className="chart-container"
                key={`${outerIndex}-${innerIndex}`}
              >
                <div className="chart-header" title={inner.chart.description}>
                  <h3>{inner.chart.chartName}</h3>
                  <Icon name="InformationCircle" />
                </div>
                <div className="chart-body">
                  {inner.chart.chartType === 'line' && (
                    <LineChart
                      chartValue={inner.line}
                      vechile={inner.vechile}
                    />
                  )}
                  {inner.chart.chartType === 'doughnut' && (
                    <DoughnutChart
                      chartValue={inner.doughnut}
                      vechile={inner.vechile}
                    />
                  )}
                  {inner.chart.chartType === 'bar' && (
                    <BarChart chartValue={inner.bar} vechile={inner.vechile} />
                  )}
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  );
};

export default ChartContent;
