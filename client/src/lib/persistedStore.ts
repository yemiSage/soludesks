import { useSyncExternalStore } from 'react';

/**
 * Tiny localStorage-backed store for per-device learner state that has no backend yet
 * (saved learning path, lesson progress). Components subscribe with the returned hook and
 * re-render on writes — including writes from another tab, via the `storage` event.
 */
export const createPersistedStore = <T>(key: string, fallback: T) => {
  const listeners = new Set<() => void>();
  let cached: T = fallback;
  let loaded = false;

  const read = (): T => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  };

  const get = () => {
    if (!loaded) {
      cached = read();
      loaded = true;
    }
    return cached;
  };

  const set = (next: T | ((current: T) => T)) => {
    cached = typeof next === 'function' ? (next as (current: T) => T)(get()) : next;
    loaded = true;
    try {
      localStorage.setItem(key, JSON.stringify(cached));
    } catch {
      // Private mode / quota — keep the in-memory value so the session still works.
    }
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      loaded = false;
      listener();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  };

  const useStore = () => useSyncExternalStore(subscribe, get);

  return { get, set, subscribe, useStore };
};
