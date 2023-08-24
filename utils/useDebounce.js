import { useState, useEffect } from "react";

// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   const [isDebouncing, setIsDebouncing] = useState(true);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     const timeHandler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//     return () => {
//       clearTimeout(timeHandler);
//     };
//   }, [value, delay]);
// };

export default function useDebounce(value, delay, fn = () => {}) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(
    () => {
      if (!isMounted) {
        setIsMounted(true);
        return;
      }
      setIsDebouncing(true);
      const handler = setTimeout(() => {
        setIsDebouncing(false);
        fn(value, debouncedValue);
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
        setIsDebouncing(false);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return { debouncedValue, isDebouncing };
}
