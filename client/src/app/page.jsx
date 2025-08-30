"use client";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to Mindnest
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Your mental health companion, guiding you towards a better well-being.
          </p>
          <a
            href="#features"
            className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300"
          >
            Start Your Journey
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-12">
            Why Mindnest?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">AI Chat Companion</h3>
              <p className="text-gray-700">
                Chat with an AI-powered companion to talk about anything, anytime. A great first step to improving mental health.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Mood Tracker</h3>
              <p className="text-gray-700">
                Track your emotions over time, recognize patterns, and manage your mental health with a detailed mood log.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Guided Games</h3>
              <p className="text-gray-700">
                Engage in fun and therapeutic games designed to improve your mental resilience and emotional well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="flex justify-center space-x-8">
            {/* Testimonial 1 */}
            <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                "Mindnest helped me realize patterns in my mood and gave me the tools to manage my anxiety."
              </p>
              <div className="font-semibold">John Doe</div>
              <div className="text-sm text-gray-500">Product Designer</div>
            </div>
            {/* Testimonial 2 */}
            <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                "The guided games were a fun way to relax and build mental resilience. I feel more in control of my emotions."
              </p>
              <div className="font-semibold">Jane Smith</div>
              <div className="text-sm text-gray-500">Software Engineer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          Ready to Take Control of Your Mental Health?
        </h2>
        <p className="text-lg sm:text-xl mb-8">
          Join us today and start your journey toward better well-being!
        </p>
        <a
          href="/signup"
          className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default Home;
