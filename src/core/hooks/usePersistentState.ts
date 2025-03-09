import { Dispatch, useEffect, useState } from "react";

function getStoredValue(key: string, defaultValue: unknown) {
  const saved = localStorage.getItem(key);

  if (!saved) return defaultValue;

  const initialValue = JSON.parse(saved);

  return initialValue || defaultValue;
}

export default function usePersistentState<T>(key: string, initialState: T): [T, Dispatch<React.SetStateAction<T>>] {
  const [internalState, setInternalState] = useState<T>(() => getStoredValue(key, initialState))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(internalState));
  }, [key, internalState]);

  return [internalState, setInternalState];
}