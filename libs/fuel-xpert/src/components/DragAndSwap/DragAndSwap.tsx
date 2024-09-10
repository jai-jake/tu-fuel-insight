/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

// Define the type for card data
interface Card {
  id: number;
  x: number;
  y: number;
}

const DragAndSwap: React.FC = () => {
  // State for positions of cards
  const [cards, setCards] = useState<Card[]>([
    { id: 1, x: 0, y: 0 },
    { id: 2, x: 150, y: 0 },
  ]);

  // Handle when dragging stops
  const handleDragStop = (e: DraggableEvent, data: DraggableData, index: number) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], x: data.x, y: data.y };

    // Check if we need to swap positions with another card
    for (let i = 0; i < cards.length; i++) {
      if (i !== index && isColliding(updatedCards[index], updatedCards[i])) {
        // Swap positions of the two cards
        const temp = { ...updatedCards[i] };  // Store card i's position
        updatedCards[i] = { ...updatedCards[i], x: cards[index].x, y: cards[index].y };  // Move card i to card index's position
        updatedCards[index] = { ...updatedCards[index], x: temp.x, y: temp.y };  // Move card index to card i's position
        break;
      }
    }

    setCards(updatedCards);
  };

  // Check if two cards are colliding
  const isColliding = (card1: Card, card2: Card): boolean => {
    const buffer = 100; // Adjust the buffer for better overlap detection
    return (
      Math.abs(card1.x - card2.x) < buffer && Math.abs(card1.y - card2.y) < buffer
    );
  };

  return (
    <div>
      {cards.map((card, index) => (
        <Draggable
          key={card.id}
          position={{ x: card.x, y: card.y }}
          onStop={(e, data) => handleDragStop(e, data, index)}
        >
          <div style={styles.card}>{`Card ${card.id}`}</div>
        </Draggable>
      ))}
    </div>
  );
};

const styles = {
  card: {
    width: "100px",
    height: "100px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    cursor: "move",
    position: "absolute" as any,
  },
};

export default DragAndSwap;
