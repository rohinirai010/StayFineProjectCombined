import { useEffect } from 'react';

const Confetti = () => {
  useEffect(() => {
    const generateConfetti = () => {
      const confettiContainer = document.querySelector('.confetti-container');
      const confettiColors = ['bg-blue-300', 'bg-indigo-300', 'bg-green-300', 'bg-yellow-300', 'bg-purple-300'];
      const numberOfConfetti = 100; // Number of confetti pieces

      for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('absolute', 'rounded-full', 'opacity-70', 'confetti');

        // Random position and size for each confetti piece
        const size = Math.random() * 6 + 3; // Random size between 3px and 9px
        const left = Math.random() * 100; // Random horizontal position (percentage)
        const delay = Math.random() * 5; // Random delay for staggered animation
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${left}%`;
        confetti.style.animationDelay = `${delay}s`;

        confetti.classList.add(color);
        confettiContainer.appendChild(confetti);
      }
    };

    generateConfetti();

    // Clean up confetti when component unmounts
    return () => {
      const confettiContainer = document.querySelector('.confetti-container');
      confettiContainer.innerHTML = '';
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden">
      {/* Confetti container */}
      <div className="confetti-container absolute top-0 left-0 w-full h-full"></div>

      <div className="text-center py-8 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-4">Congrats</h2>
        <p className="text-lg font-medium text-white">You Are Now A Registered IB</p>
        <div className="mt-6">
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-sm hover:shadow flex items-center mx-auto">
            View Benefits
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confetti;
