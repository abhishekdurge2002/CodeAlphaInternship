import React, { useState } from 'react';

const Flashcard = ({ word, translation }) => {
  const [flipped, setFlipped] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-60 h-40 border rounded-xl shadow-lg p-4 cursor-pointer text-center bg-white" onClick={() => setFlipped(!flipped)}>
      <h2 className="text-xl font-bold">{flipped ? translation : word}</h2>
      <button className="mt-3 px-2 py-1 text-sm bg-blue-500 text-white rounded" onClick={(e) => { e.stopPropagation(); speak(word); }}>
        🔊 Pronounce
      </button>
    </div>
  );
};

export default Flashcard;
