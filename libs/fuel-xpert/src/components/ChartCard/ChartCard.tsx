/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import BarNChart from '../Charts/BarN';
import DoughnutChart from '../Charts/Doughnut';
import LineChart from '../Charts/Line';
import './ChartCard.css';
import { Text, Icon } from '@trackunit/react-components';
import { useAtom } from 'jotai';
import { MockDataAtom } from '../../store/mockDataStore';

const ChartCard = (propsData: any) => {
  const [mockData] = useAtom(MockDataAtom);

  const [chartValue, setChartValue] = useState(propsData.chartData);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setChartValue(propsData.chartData);
  }, [propsData]);

  const handleDelete = (key: any) => {
    propsData.onDelete(key);
  };

  const handledSingleVehicleDelete = (vechile: any) => {
    console.log('Delete vechile', vechile);
    const updatedVechileList = chartValue.selectedVechileList.filter(
      (v: any) => v !== vechile
    );
    console.log('updatedVechileList', updatedVechileList);
    propsData.onUpdate(chartValue.id, {
      ...chartValue,
      selectedVechileList: updatedVechileList,
    });
  };

  const zoomInWrapperStyle: any = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '100',
    backgroundColor: 'white',
  };

  const zoomOutWrapperStyle: any = {
    width: '650px',
    height: '550px',
    maxHeight: '550px',
    gap: '12px',
  };

  const zoomInCardContentStyle: any = {
    minWidth: 'calc(100% - 20px)',
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 100px)',
    paddingTop: '100px',
  };

  const zoomOutCardContentStyle: any = {
    width: '100%',
    height: 'calc(550px - 20px)',
    maxHeight: 'calc(550px - 20px)',
    paddingTop: '20px',
  };

  return (
    <div
      key={chartValue.id}
      className="chart-card-wrapper"
      style={isZoomed ? zoomInWrapperStyle : zoomOutWrapperStyle}
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
                  <span>
                    {mockData.find((x: any) => x.name === vechile)?.label}
                  </span>
                  <Icon
                    name="XMark"
                    size="medium"
                    style={{ cursor: 'pointer', alignSelf: 'center' }}
                    onClick={() => handledSingleVehicleDelete(vechile)}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
      <div
        className="chart-content"
        style={isZoomed ? zoomInCardContentStyle : zoomOutCardContentStyle}
      >
        {chartValue.type === 'bar' && <BarNChart chartDetails={chartValue} />}
        {chartValue.type === 'line' && <LineChart chartDetails={chartValue} />}
        {chartValue.type === 'doughnut' && (
          <DoughnutChart chartDetails={chartValue} />
        )}
      </div>
    </div>
  );
};

export default ChartCard;
