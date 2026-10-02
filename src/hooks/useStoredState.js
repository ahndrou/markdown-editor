import { useEffect, useState } from "react";

export default function useStoredState(key, fallback) {
  const storedState = localStorage.getItem(key);

  const [state, setState] = useState(() =>
    storedState !== null ? storedState : fallback,
  );

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}
