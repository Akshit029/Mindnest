import React from 'react';
import { Brain, Heart, Target, ArrowRight, Star, Sparkles } from 'lucide-react';

const Home = () => {
  return (
        <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-gray-900 to-teal-900 py-20 px-6 md:px-12 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-teal-500/5"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-800/30 backdrop-blur-sm rounded-full border border-purple-700/30">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Your mental wellness journey starts here</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-teal-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Welcome to Mindnest
          </h1>
          
          <p className="text-xl sm:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your intelligent mental  health companion, empowering you to unlock better well-being through personalized support and insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#features"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-xl hover:from-purple-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#testimonials"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-700"
            >
              See Success Stories
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">Mindnest</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover powerful tools designed to support your mental wellness journey with cutting-edge technology and compassionate care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">AI Chat Companion</h3>
                <p className="text-gray-400 leading-relaxed">
                  Engage with an intelligent AI companion that understands your needs. Available 24/7 to provide support, guidance, and meaningful conversations whenever you need them.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">Smart Mood Tracker</h3>
                <p className="text-gray-400 leading-relaxed">
                  Monitor your emotional patterns with advanced analytics. Gain deep insights into your mental health trends and discover personalized strategies for improvement.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">Therapeutic Games</h3>
                <p className="text-gray-400 leading-relaxed">
                  Build resilience through engaging, science-based games. Fun activities designed by mental health experts to strengthen your emotional toolkit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Trusted by <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">Thousands</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real stories from people who transformed their mental wellness with Mindnest.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300">
              <div className="absolute top-6 right-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed italic">
                "Mindnest helped me recognize patterns in my mood and gave me practical tools to manage my anxiety. The AI companion feels like talking to a friend who truly understands."
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <div className="font-semibold text-white">John Doe</div>
                  <div className="text-sm text-gray-400">Product Designer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-teal-500/30 transition-all duration-300">
              <div className="absolute top-6 right-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed italic">
                "The therapeutic games were a game-changer for me. They made building mental resilience enjoyable, and I genuinely feel more in control of my emotional responses."
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <div className="font-semibold text-white">Jane Smith</div>
                  <div className="text-sm text-gray-400">Software Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-gray-900 to-teal-900 py-20 text-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 md:px-12">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-800/30 backdrop-blur-sm rounded-full border border-purple-700/30">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Transform your mental wellness today</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-teal-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Ready to Take Control of Your Mental Health?
          </h2>
          
          <p className="text-xl sm:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who've transformed their well-being. Start your personalized mental health journey today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/signup"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-xl hover:from-purple-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-2xl font-semibold text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>✓ No credit card required</span>
              <span>•</span>
              <span>✓ 7-day free trial</span>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>10,000+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span>Evidence-Based Methods</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-gray-400">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-teal-400 mb-2">4.9/5</div>
              <div className="text-gray-400">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-2">24/7</div>
              <div className="text-gray-400">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2">85%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;