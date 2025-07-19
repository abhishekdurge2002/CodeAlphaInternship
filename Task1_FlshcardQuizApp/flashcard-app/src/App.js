import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard';
import FlashcardForm from './components/FlashcardForm';
import './styles.css';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowRight} from 'react-icons/fa';

const App = () => {
  const [flashcards, setFlashcards] = useState(() => {
    const stored = localStorage.getItem('flashcards');
    return stored ? JSON.parse(stored) : [];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const addFlashcard = (card) => {
    setFlashcards([...flashcards, card]);
    setShowForm(false);
  };

  const updateFlashcard = (updatedCard) => {
    const updatedList = flashcards.map((card, index) =>
      index === currentIndex ? updatedCard : card
    );
    setFlashcards(updatedList);
    setEditCard(null);
    setShowForm(false);
  };

  const deleteFlashcard = () => {
    const updatedList = flashcards.filter((_, index) => index !== currentIndex);
    setFlashcards(updatedList);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  return (
  <div className={`app ${darkMode ? 'dark' : ''}`}>
    {/* 🌙 Dark Mode Toggle Button */}
    <button className='toggle-btn' onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
    <h1> Flashcard Quiz App 📚</h1>

    {/* Flashcard Display */}
    {flashcards.length > 0 && !showForm && (
      <>
        <Flashcard card={flashcards[currentIndex]} />
        <div className="controls">
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            <FaArrowLeft /> Previous
          </button>

          <span>{currentIndex + 1} / {flashcards.length}</span>
          <button onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
            Next <FaArrowRight />
          </button>
        </div>
        <div className="crud-controls">
          <button onClick={() => {
            setEditCard(flashcards[currentIndex]);
            setShowForm(true);
          }}>
            <FaEdit /> Edit
          </button>

          <button onClick={deleteFlashcard}>
            <FaTrash /> Delete
          </button>

        </div>
      </>
    )}

    {/* Flashcard Form */}
    {showForm ? (
      <FlashcardForm
        initialData={editCard}
        onSave={editCard ? updateFlashcard : addFlashcard}
        onCancel={() => {
          setEditCard(null);
          setShowForm(false);
        }}
      />
    ) : (
      <button onClick={() => setShowForm(true)}>
        <FaPlus /> Add New Flashcard
      </button>

    )}

    {flashcards.length === 0 && !showForm && <p>No flashcards. Add one!</p>}
  </div>
)};


export default App;
