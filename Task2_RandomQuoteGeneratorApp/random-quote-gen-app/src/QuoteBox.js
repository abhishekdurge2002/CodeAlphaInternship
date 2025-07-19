import React, { useState, useEffect } from "react";
import { quotes } from "./quotes"; // Use the quotes.js file we generated

function QuoteBox() {
  const [quote, setQuote] = useState({});
  const [animate, setAnimate] = useState(false);

  const getRandomQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setAnimate(false);
    setTimeout(() => {
      setQuote(random);
      setAnimate(true);
    }, 50);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="quote-container">
      <div className={`quote-box ${animate ? "fade" : ""}`}>
        <p className="quote-text">"{quote.text}"</p>
        <p className="quote-author">— {quote.author}</p>
      </div>
      <div className="button-group">
        <button onClick={getRandomQuote}>New Quote</button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `${quote.text} — ${quote.author}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="whatsapp">Share to WhatsApp</button>
        </a>
      </div>
    </div>
  );
}

export default QuoteBox;
