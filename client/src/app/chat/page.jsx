"use client";

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Chat with Your AI Companion
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Our AI-powered chatbot is here to listen and guide you through your mental health journey.
          </p>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Start a Conversation</h2>
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300"
                >
                  Send Message
                </button>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Our AI is ready to help you!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;
