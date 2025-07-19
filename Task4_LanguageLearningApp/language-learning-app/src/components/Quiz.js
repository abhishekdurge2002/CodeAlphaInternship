import React, { useState } from 'react';

const Quiz = ({ questions }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.toLowerCase() === questions[index].answer.toLowerCase()) {
      setScore(score + 1);
    }
    setAnswer('');
    setIndex(index + 1);
  };

  return (
    <div className="p-4">
      {index < questions.length ? (
        <>
          <h3 className="text-lg mb-2">{questions[index].question}</h3>
          <input className="border p-1 mb-2" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <button className="bg-green-500 text-white px-3 py-1 ml-2" onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <h2>Your score: {score} / {questions.length}</h2>
      )}
    </div>
  );
};

export default Quiz;
