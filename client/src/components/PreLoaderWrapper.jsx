"use client";

import { useState, useEffect } from "react";
import PreLoader from "./PreLoader";

const PreLoaderWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds (adjust as needed)

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PreLoader />; // Show loader first
  }

  return <>{children}</>; // Then show the entire site (Navbar + pages)
};

export default PreLoaderWrapper;
