const getItem = <T = unknown>(key: string): T | null => {
  if (typeof window === 'undefined') return null;

  const value = window.localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
};

const setItem = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(key, JSON.stringify(value));
};

export { getItem, setItem };
