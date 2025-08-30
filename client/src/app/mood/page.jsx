"use client";

const MoodTracker = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Track Your Mood</h1>
          <p className="text-lg sm:text-xl mb-8">
            Monitoring your mood helps you understand your emotions and improve your mental health.
          </p>
        </div>
      </section>

      {/* Mood Tracking Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">How Are You Feeling Today?</h2>
            <div className="flex justify-center gap-6 mb-6">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">
                Happy 😊
              </button>
              <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-300">
                Neutral 😐
              </button>
              <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-400 transition duration-300">
                Sad 😢
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-600">
                Your mood will be logged and analyzed for insights into your emotional patterns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoodTracker;
