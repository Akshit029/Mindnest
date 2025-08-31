"use client";
import { useState } from 'react';
import { Send, MessageCircle, Sparkles, Bot } from 'lucide-react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thank you for reaching out. I'm here to listen and support you on your mental health journey. How are you feeling today?", 
          sender: 'ai' 
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-gray-900 to-emerald-900 text-white py-20 px-6 md:px-12 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-emerald-900/50 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Bot className="relative w-16 h-16 text-white bg-gradient-to-r from-purple-600 to-emerald-600 p-3 rounded-full" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Chat with Your AI Companion
          </h1>
          
          <p className="text-xl sm:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Experience compassionate AI-powered conversations designed to support and guide you through your mental health journey with understanding and care.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Confidential & Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-pink-400" />
              <span>AI-Powered Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Chat Container */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-emerald-900/50 p-6 border-b border-gray-700/50">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
                Start a Conversation
              </h2>
              <p className="text-gray-400 mt-2">Your AI companion is ready to listen and support you</p>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-900/30">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-gradient-to-r from-purple-600/20 to-emerald-600/20 p-6 rounded-full mb-4">
                    <Bot className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg mb-2">Welcome! I'm here to help.</p>
                  <p className="text-gray-500 text-sm">Start by typing a message below to begin our conversation.</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-purple-600 to-emerald-600 text-white' 
                        : 'bg-gray-700/50 text-gray-200 border border-gray-600/50'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-gray-800/50 border-t border-gray-700/50">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="w-full p-4 pr-12 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Sparkles className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
                
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="px-6 py-4 bg-gradient-to-r from-purple-600 to-emerald-600 text-white rounded-xl hover:from-purple-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              
              <div className="flex justify-center mt-4">
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  Your AI companion is online and ready to help
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { text: "I'm feeling anxious today", icon: "😰" },
              { text: "Can you help me relax?", icon: "🧘‍♀️" },
              { text: "I need someone to talk to", icon: "💬" }
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => setMessage(action.text)}
                className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:bg-gray-700/50 hover:border-purple-500/50 transition-all duration-300 text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {action.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;