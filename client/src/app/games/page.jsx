"use client";

const Games = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Guided Games for Mental Well-being
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Play engaging games designed to help you relax, focus, and improve your mental health.
          </p>
        </div>
      </section>

      {/* Game Cards Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Game 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Game 1: Mindful Maze</h3>
              <p className="text-gray-600 mb-4">
                Navigate through a maze while practicing mindfulness. Focus on your breath and avoid distractions.
              </p>
              <a
                href="#"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300"
              >
                Play Now
              </a>
            </div>

            {/* Game 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Game 2: Relaxation Puzzles</h3>
              <p className="text-gray-600 mb-4">
                Solve relaxing puzzles to calm your mind and improve focus and concentration.
              </p>
              <a
                href="#"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300"
              >
                Play Now
              </a>
            </div>

            {/* Game 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Game 3: Breathing Exercise</h3>
              <p className="text-gray-600 mb-4">
                Practice deep breathing techniques with this interactive game to lower anxiety and improve mental clarity.
              </p>
              <a
                href="#"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300"
              >
                Play Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;
