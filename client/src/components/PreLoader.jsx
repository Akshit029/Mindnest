import { useState, useEffect } from "react";

const PreLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{top: '-12rem', left: '-12rem'}}></div>
        <div className="absolute w-96 h-96 bg-emerald-500 opacity-10 rounded-full blur-3xl animate-pulse" style={{bottom: '-12rem', right: '-12rem', animationDelay: '1s'}}></div>
      </div>
      
      {/* Main loading content */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* MINDNEST typing animation */}
        <div className="flex space-x-1">
          {'MINDNEST'.split('').map((letter, index) => (
            <span
              key={index}
              className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400"
              style={{
                opacity: 0,
                animation: `typeIn 0.15s ease-in-out ${index * 0.2}s forwards`
              }}
            >
              {letter}
            </span>
          ))}
          {/* Blinking cursor */}
          <span 
            className="text-4xl md:text-6xl font-bold text-purple-400"
            style={{
              animation: 'blink 1s ease-in-out infinite'
            }}
          >
            |
          </span>
        </div>
        
        {/* Loading text */}
        <p className="text-gray-400 text-sm md:text-base font-medium animate-pulse">
          Setting up your workspace...
        </p>
        
        {/* Spinning loader */}
        <div className="relative">
          <div className="w-12 h-12 border-2 border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes typeIn {
          to { opacity: 1; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes moveToNavbar {
          to { 
            transform: translate(calc(-50vw + 2rem), calc(-50vh + 2rem)) scale(0.6);
          }
        }
        
        @keyframes fadeOut {
          to { 
            opacity: 0; 
            pointer-events: none; 
          }
        }
      `}</style>
    </div>
  );
};

const PreLoaderTransition = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* MINDNEST text moving to navbar logo position */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          animation: 'moveToNavbar 0.8s ease-in-out forwards'
        }}
      >
        <span className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
          MINDNEST
        </span>
      </div>
      
      {/* Overlay that fades out */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"
        style={{
          animation: 'fadeOut 0.8s ease-in-out 0.3s forwards'
        }}
      ></div>

      <style jsx>{`
        @keyframes moveToNavbar {
          0% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% { 
            transform: translate(calc(-50vw + 4rem), calc(-50vh + 4rem)) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes fadeOut {
          to { 
            opacity: 0; 
            pointer-events: none; 
          }
        }
      `}</style>
    </div>
  );
};

const PreLoaderWrapper = ({ children }) => {
  const [loadingStage, setLoadingStage] = useState('loading');

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoadingStage('transitioning');
    }, 2000);

    const transitionTimer = setTimeout(() => {
      setLoadingStage('complete');
    }, 2800);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(transitionTimer);
    };
  }, []);

  if (loadingStage === 'loading') {
    return <PreLoader />;
  }

  if (loadingStage === 'transitioning') {
    return (
      <>
        {children}
        <PreLoaderTransition />
      </>
    );
  }

  return (
    <>
      {children}
      {/* Since your navbar already has the logo, we don't need to add another one */}
    </>
  );
};

// Demo content with your navbar structure
const DemoContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Your existing navbar */}
      <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - This is where the animation should end */}
            <div className="flex-shrink-0">
              <a 
                href="/" 
                className="text-2xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent hover:from-gray-100 hover:via-white hover:to-gray-100 transition-all duration-300"
              >
                Mindnest
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/" className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105">Home</a>
                <a href="/games" className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105">Games</a>
                <a href="/chat" className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105">Chat</a>
                <a href="/mood" className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105">Mood Tracker</a>
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">Login</a>
              <a href="/signup" className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">Sign Up</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 p-2 rounded-lg transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 bg-opacity-95 rounded-lg mt-2 border border-gray-800 border-opacity-50">
                <a href="/" className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">Home</a>
                <a href="/games" className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">Games</a>
                <a href="/chat" className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">Chat</a>
                <a href="/mood" className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">Mood Tracker</a>
                <div className="border-t border-gray-700 border-opacity-50 pt-3 mt-3">
                  <a href="/login" className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200">Login</a>
                  <a href="/signup" className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 mt-2">Sign Up</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Hero Section */}
      <main className="px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              Welcome to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400">
                Your Digital Space
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Where innovation meets creativity in a seamless digital experience
            </p>
            <button className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </main>
      
      {/* Feature Cards */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Innovative Design", desc: "Cutting-edge solutions for modern challenges" },
            { title: "Seamless Experience", desc: "Fluid interactions across all devices" },
            { title: "Future Ready", desc: "Built with tomorrow's technology today" }
          ].map((item, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 border-opacity-50 hover:border-purple-500 hover:border-opacity-50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <PreLoaderWrapper>
      <DemoContent />
    </PreLoaderWrapper>
  );
}