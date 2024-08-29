import { useState, useEffect } from "react";

const useError = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    if (error) {
      // Automatically clear the error after 2.5 seconds
      timer = setTimeout(() => setError(null), 2500);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return [error, setError];
};

export { useError };
