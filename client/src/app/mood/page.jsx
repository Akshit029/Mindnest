"use client";
import { useState } from 'react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const moods = [
    { 
      id: 'happy', 
      label: 'Happy', 
      emoji: '😊', 
      color: 'from-emerald-400 to-teal-500',
      hoverColor: 'from-emerald-300 to-teal-400',
      shadow: 'shadow-emerald-500/25'
    },
    { 
      id: 'neutral', 
      label: 'Neutral', 
      emoji: '😐', 
      color: 'from-amber-400 to-orange-500',
      hoverColor: 'from-amber-300 to-orange-400',
      shadow: 'shadow-amber-500/25'
    },
    { 
      id: 'sad', 
      label: 'Sad', 
      emoji: '😢', 
      color: 'from-rose-400 to-pink-500',
      hoverColor: 'from-rose-300 to-pink-400',
      shadow: 'shadow-rose-500/25'
    }
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(156, 146, 172, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(156, 146, 172, 0.05) 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 pt-20 pb-16 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 leading-tight">
                Mood Tracker
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>
            </div>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Understanding your emotions is the first step toward better mental wellness. 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"> Track, reflect, and grow.</span>
            </p>
          </div>
        </section>

        {/* Mood Tracking Section */}
        <section className="px-6 pb-20 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                How are you feeling today?
              </h2>
              
              {/* Mood Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood)}
                    className={`group relative overflow-hidden p-6 md:p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                      selectedMood?.id === mood.id 
                        ? `bg-gradient-to-r ${mood.color} shadow-2xl ${mood.shadow}` 
                        : 'bg-gray-800/50 hover:bg-gray-700/60 border border-gray-600/30 hover:border-gray-500/50'
                    }`}
                  >
                    {/* Animated background for selected mood */}
                    {selectedMood?.id === mood.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                    
                    <div className="relative z-10 text-center">
                      <div className={`text-6xl md:text-7xl mb-4 transform transition-transform duration-300 ${
                        selectedMood?.id === mood.id && isAnimating ? 'scale-125' : 'group-hover:scale-110'
                      }`}>
                        {mood.emoji}
                      </div>
                      <div className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                        selectedMood?.id === mood.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {mood.label}
                      </div>
                    </div>
                    
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-active:opacity-30 bg-white transition-opacity duration-150"></div>
                  </button>
                ))}
              </div>

              {/* Selected Mood Feedback */}
              {selectedMood && (
                <div className={`text-center p-6 rounded-2xl bg-gradient-to-r ${selectedMood.color} mb-8 transform transition-all duration-500 ${
                  isAnimating ? 'scale-105' : 'scale-100'
                }`}>
                  <div className="text-white">
                    <p className="text-xl font-semibold mb-2">
                      Mood logged: {selectedMood.label} {selectedMood.emoji}
                    </p>
                    <p className="text-white/90">
                      Your emotional journey matters. Keep tracking to discover patterns.
                    </p>
                  </div>
                </div>
              )}

              {/* Info Section */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <p className="text-gray-300 font-medium">
                    Your mood data helps identify emotional patterns and triggers
                  </p>
                </div>
                
                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Regular mood tracking provides valuable insights into your mental health journey, 
                  helping you understand what influences your emotions and well-being.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mt-10 flex justify-center">
                <div className="flex gap-2">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        i < 3 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default MoodTracker;