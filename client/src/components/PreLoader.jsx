"use client";

const PreLoader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 text-white z-50">
      <div className="loader"></div>
      <span className="ml-4 text-lg">Loading Mindnest...</span>
    </div>
  );
};

export default PreLoader;
