"use client";

const ForgotPassword = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Forgot Your Password?</h2>
  
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300"
              >
                Reset Password
              </button>
            </div>
          </form>
  
          <div className="mt-6 text-center">
            <a href="/login" className="text-sm text-blue-500 hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default ForgotPassword;
  