'use client';

import { useEffect } from 'react';
import { useImmer } from 'use-immer';

export default function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useImmer(fallbackValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}