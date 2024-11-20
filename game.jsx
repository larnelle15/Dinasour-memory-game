import React, { useState, useEffect } from 'react';
import { ShuffleIcon } from 'lucide-react';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const emojis = ['🎨', '🎮', '🎲', '🎯', '🎸', '🎪', '🎭', '🎪'];
  
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          setIsWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Moves: {moves}</div>
        <button
          onClick={initializeGame}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <ShuffleIcon size={16} />
          Restart
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`h-24 text-4xl flex items-center justify-center rounded-lg transition-all duration-300 ${
              flipped.includes(index) || matched.includes(index)
                ? 'bg-white rotate-0'
                : 'bg-blue-500 rotate-180'
            }`}
            disabled={isWon}
          >
            <span className={flipped.includes(index) || matched.includes(index) ? '' : 'invisible'}>
              {card.emoji}
            </span>
          </button>
        ))}
      </div>
      
      {isWon && (
        <div className="mt-4 text-center text-xl font-bold text-green-600">
          🎉 Congratulations! You won in {moves} moves!
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
