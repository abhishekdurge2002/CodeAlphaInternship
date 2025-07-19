import React, { useState, useEffect } from 'react';

const FlashcardForm = ({ initialData, onSave, onCancel }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question && answer) {
      onSave({ question, answer });
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <form className="flashcard-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Flashcard' : 'Add Flashcard'}</h3>
      <input
        type="text"
        placeholder="Enter Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button type="submit">💾 Save</button>
      <button type="button" onClick={onCancel}>❌ Cancel</button>
    </form>
  );
};

export default FlashcardForm;
