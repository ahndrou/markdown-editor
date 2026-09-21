import { useEffect, useState } from "react";
import {
  retrieveFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageUtils";

export default function useStoredState(key, fallback) {
  const storedState = retrieveFromLocalStorage(key);

  const [state, setState] = useState(storedState ? storedState : fallback);

  useEffect(() => {
    saveToLocalStorage(key, state);
  }, [key, state]);

  return [state, setState];
}
