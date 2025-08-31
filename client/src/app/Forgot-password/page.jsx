"use client";
import { useState } from "react";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Glass morphism card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
                <p className="text-slate-300">Enter your email and we'll send you a reset link</p>
              </div>

              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!email || isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <a 
                  href="/login" 
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors hover:underline flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </a>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Check Your Email</h2>
                <p className="text-slate-300 mb-6">
                  We've sent a password reset link to
                </p>
                <div className="bg-white/5 border border-white/20 rounded-xl p-4 mb-6">
                  <p className="text-purple-400 font-medium">{email}</p>
                </div>
                <p className="text-slate-400 text-sm mb-8">
                  Didn't receive the email? Check your spam folder or try again.
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail("");
                    }}
                    className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl transition-all duration-300"
                  >
                    Try Different Email
                  </button>
                  
                  <a 
                    href="/login" 
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Login</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Additional help */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
            <a href="/support" className="hover:text-white transition-colors">Support</a>
            <a href="/help" className="hover:text-white transition-colors">Help Center</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;