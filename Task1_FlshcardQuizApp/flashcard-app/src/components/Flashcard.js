import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ card }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFlip = () => setShowAnswer(!showAnswer);

  return (
    <div className={`flip-card ${showAnswer ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2>{card.question}</h2>
          <p>Click to show answer</p>
        </div>
        <div className="flip-card-back">
          <h2>{card.answer}</h2>
          <p>Click to hide answer</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
