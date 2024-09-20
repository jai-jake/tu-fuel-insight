/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import BarNChart from '../Charts/BarN';
import DoughnutChart from '../Charts/Doughnut';
import LineChart from '../Charts/Line';
import './ChartCard.css';
import { Text, Icon } from '@trackunit/react-components';
import { useAtom } from 'jotai';
import { MockDataAtom } from '../../store/mockDataStore';
import ModalComponent from '../ModalComponent/ModelComponent';
import ComparisonBar from '../Charts/ComparisonBar';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

// Define the type for card data
interface Card {
  id: number;
  x: number;
  y: number;
}

const ChartCard = (propsData: any) => {
  const [mockData] = useAtom(MockDataAtom);

  const { chartsList, chartData, index, setChartsList } = propsData;

  const [chartValue, setChartValue] = useState(chartData);
  const [isZoomed, setIsZoomed] = useState(false);

  const [dragging, setDragging] = useState(false);

  // Handle when dragging stops
  const handleDragStop = (
    e: DraggableEvent,
    data: DraggableData,
    index: number
  ) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const updatedCards = [...chartsList];
    updatedCards[index] = { ...updatedCards[index], x: data.x, y: data.y };

    // Check if we need to swap positions with another card
    for (let i = 0; i < chartsList.length; i++) {
      if (i !== index && isColliding(updatedCards[index], updatedCards[i])) {
        // Swap positions of the two cards
        const temp = { ...updatedCards[i] }; // Store card i's position
        updatedCards[i] = {
          ...updatedCards[i],
          x: chartsList[index].x,
          y: chartsList[index].y,
        }; // Move card i to card index's position
        updatedCards[index] = { ...updatedCards[index], x: temp.x, y: temp.y }; // Move card index to card i's position
        break;
      }
    }

    setChartsList(updatedCards);
  };

  // Check if two cards are colliding
  const isColliding = (card1: Card, card2: Card): boolean => {
    const buffer = 650; // Adjust the buffer for better overlap detection
    return (
      Math.abs(card1.x - card2.x) < buffer &&
      Math.abs(card1.y - card2.y) < buffer
    );
  };

  useEffect(() => {
    setChartValue(propsData.chartData);
  }, [propsData]);

  const handleDelete = (key: any) => {
    propsData.onDelete(key);
  };

  const handledSingleVehicleDelete = (vechile: any) => {
    const updatedVechileList = chartValue.selectedVechileList.filter(
      (v: any) => v !== vechile
    );
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

  const [IsOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleUpdateChart = (updatedData: any) => {
    propsData.onUpdate(chartValue.id, updatedData);
    setIsOpen(false);
  };

  return (
    <Draggable
      key={chartData.id}
      position={{ x: chartData.x, y: chartData.y }}
      onStop={(e, data) => {
        handleDragStop(e, data, index);
        setDragging(false);
      }}
      onStart={() => setDragging(true)}
    >
      <div style={styles.card} className={`card ${dragging ? 'dragging' : ''}`}>
        <div
          key={chartValue.id}
          className="chart-card-wrapper"
          style={isZoomed ? zoomInWrapperStyle : zoomOutWrapperStyle}
        >
          <div className="chart-card-header-wrapper">
            <div className="chart-card-title-wrapper">
              <div className="chart-card-header-title">
                {!isZoomed && (
                  <Icon
                    className="drag-handle"
                    name="EllipsisDrag"
                    style={{ cursor: 'grab' }}
                  ></Icon>
                )}
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
                {!isZoomed && (
                  <Icon
                    name="PencilSquare"
                    type="outline"
                    style={{
                      cursor: 'pointer',
                      color: '#6E6E6E',
                    }}
                    onClick={() => setIsOpen(!IsOpen)}
                  />
                )}
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
                {!isZoomed && (
                  <Icon
                    name="Trash"
                    type="outline"
                    style={{
                      cursor: 'pointer',
                      color: '#6E6E6E',
                    }}
                    onClick={() => handleDelete(chartValue.id)}
                  />
                )}
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
                        background: mockData.find(
                          (d: any) => d.name === vechile
                        )?.color,
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
            {chartValue.type === 'bar' && (
              <BarNChart chartDetails={chartValue} />
            )}
            {chartValue.type === 'line' && (
              <LineChart chartDetails={chartValue} />
            )}
            {chartValue.type === 'doughnut' && (
              <DoughnutChart chartDetails={chartValue} />
            )}
            {chartValue.type === 'comparison-bar' && (
              <ComparisonBar chartDetails={chartValue} />
            )}
          </div>
          {IsOpen && (
            <ModalComponent
              mockData={mockData}
              isOpened={IsOpen}
              onClose={handleCloseModal}
              individualChartData={chartValue}
              onUpdateChart={handleUpdateChart}
            />
          )}
        </div>
      </div>
    </Draggable>
  );
};

const styles = {
  card: {
    cursor: 'grabbing',
    position: 'absolute' as any,
  },
};

export default ChartCard;
