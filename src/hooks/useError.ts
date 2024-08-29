import { useState, useEffect } from "react";

type UseErrorReturn = [string | null, (error: string | null) => void];

const useError = (): UseErrorReturn => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (error) {
      // Automatically clear the error after 2.5 seconds
      timer = setTimeout(() => setError(null), 2500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error]);

  return [error, setError];
};

export { useError };
