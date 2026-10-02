import { useEffect, useState } from "react";

/**
 * Provides state which is persisted between mounts/remounts and browser sessions.
 * @param {*} key Name of the state.
 * @param {*} fallback Value to fallback to incase there is no currently stored state.
 * @returns
 */
export default function usePersistedState(key, fallback) {
  const storedState = localStorage.getItem(key);

  const [state, setState] = useState(() =>
    storedState !== null ? storedState : fallback,
  );

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}
