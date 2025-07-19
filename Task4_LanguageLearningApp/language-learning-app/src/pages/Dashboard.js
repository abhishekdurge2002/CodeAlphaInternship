import React from 'react';
import Flashcard from '../components/Flashcard';
import Quiz from '../components/Quiz';
import { flashcards, quizQuestions } from '../data';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Flashcards</h1>
      <div className="flex gap-4 flex-wrap mb-6">
        {flashcards.map((card, i) => (
          <Flashcard key={i} {...card} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-2">Quick Quiz</h2>
      <Quiz questions={quizQuestions} />
    </div>
  );
};

export default Dashboard;
