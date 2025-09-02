"use client";
import { useState, useEffect } from "react";

const Games = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openGame = () => {
    setIsGameOpen(true);
  };

  const closeGame = () => {
    setIsGameOpen(false);
  };

  const games = [
    {
      id: 1,
      title: "Flappy Bird",
      description: "Soar through obstacles with calm and focus. Stay present, control your rhythm, and find peace in the flow of flight.",
      gradient: "from-emerald-500 to-teal-600",
      icon: "🐦",
      onClick: openGame
    },
    {
      id: 2,
      title: "Relaxation Puzzles",
      description: "Solve beautiful, calming puzzles designed to quiet your mind and enhance focus through gentle challenges.",
      gradient: "from-purple-500 to-pink-600",
      icon: "🧩"
    },
    {
      id: 3,
      title: "Breathing Exercise",
      description: "Master deep breathing techniques with interactive guidance to reduce anxiety and achieve mental clarity.",
      gradient: "from-orange-500 to-red-500",
      icon: "🫁"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Game Modal */}
      {isGameOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Exit button */}
          <div className="absolute top-4 right-4 z-50">
            <button 
              onClick={closeGame}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg transition-colors"
              title="Exit Game"
              aria-label="Exit Game"
            >
              ✕
            </button>
          </div>
          
          {/* Game iframe */}
          <div className="flex-1 w-full h-full">
            <iframe
              src="/assets/flappy%20bird/index.html"
              className="w-full h-full border-0"
              title="Flappy Bird Game"
              allowFullScreen
            />
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-emerald-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative py-20 sm:py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                <span className="text-sm font-medium text-emerald-300">✨ Mental Wellness Games</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-emerald-200 to-purple-200 bg-clip-text text-transparent">
                  Guided Games for
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  Mental Well-being
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover engaging, scientifically-designed games that help you relax, focus, and nurture your mental health journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 transition-all duration-300">
                  <span className="flex items-center gap-2">
                    Start Playing
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </button>
                <button className="px-8 py-4 border border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Cards Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Games
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Each game is carefully crafted to support different aspects of mental wellness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <div
                key={game.id}
                className={`group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600/50 transition-all duration-500 hover:-translate-y-2 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Card glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${game.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {game.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300">
                  {game.title}
                </h3>
                
                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                  {game.description}
                </p>
                
                <button 
                  onClick={game.onClick}
                  className={`group/btn relative w-full px-6 py-4 bg-gradient-to-r ${game.gradient} rounded-xl font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1`}>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Play Now
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-1/2 left-4 w-2 h-32 bg-gradient-to-b from-emerald-500/30 to-transparent rounded-full"></div>
        <div className="absolute top-1/3 right-4 w-2 h-24 bg-gradient-to-b from-purple-500/30 to-transparent rounded-full"></div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8 text-white">Why Choose Our Games?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl">🧠</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">Science-Based</h4>
              <p className="text-gray-400">Built on proven psychological principles and mindfulness techniques</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl">📱</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">Always Accessible</h4>
              <p className="text-gray-400">Play anywhere, anytime on any device with seamless synchronization</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl">📈</span>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">Track Progress</h4>
              <p className="text-gray-400">Monitor your mental wellness journey with detailed insights</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;