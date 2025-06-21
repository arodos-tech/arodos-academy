"use client";

import { ExtractState, StoreAdapter, StoreFactory } from "./types";

import { create } from "zustand";
import { store as stateDefinition } from "@/AppStore";

// Create a null storage implementation for server-side rendering
const createNoopStorage = (): Storage => {
  return {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {},
    removeItem: (_key: string) => {},
    clear: () => {},
    key: (_index: number) => null,
    length: 0
  };
};

// Get storage that works in browser and safely handles server-side rendering
const getStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage;
  }
  return createNoopStorage();
};

// Create Zustand implementation of our store factory
export function createZustandFactory(storage: Storage = getStorage()): StoreFactory {
  return {
    createStore<T>(key: string, initialState: T, persist?: boolean | string[]): StoreAdapter<T> {
      const useStore = create<T>((set, get) => {
        // Load persisted state if it exists
        let state = initialState;
        if (persist) {
          try {
            const persistedJson = storage.getItem(`store-${key}`);
            if (persistedJson) {
              const persisted = JSON.parse(persistedJson);
              if (Array.isArray(persist)) {
                // Only persist specified fields
                const persistedState = { ...initialState };
                for (const field of persist) {
                  const value = persisted.state[field];
                  if (value !== undefined) {
                    (persistedState as any)[field] = value;
                  }
                }
                state = persistedState;
              } else {
                state = {
                  ...initialState,
                  ...persisted.state,
                };
              }
            }
          } catch (error) {
            console.error("Error loading persisted state:", error);
          }
        }

        return state;
      });

      // Create store slice that implements our store adapter interface
      const storeSlice: StoreAdapter<T> = Object.assign(
        // Callable function that returns state (reactive in React)
        () => useStore() as ExtractState<T>,
        {
          // Non-reactive getter for snapshots
          get: () => useStore.getState() as ExtractState<T>,

          // State setter with partial updates
          set: (newState: Partial<ExtractState<T>>) => {
            useStore.setState((state) => {
              const updatedState = { ...state, ...newState };

              // Handle persistence
              if (persist) {
                try {
                  storage.setItem(
                    `store-${key}`,
                    JSON.stringify({
                      state: Array.isArray(persist)
                        ? Object.fromEntries(persist.map((field) => [field, (updatedState as any)[field]]))
                        : updatedState,
                    })
                  );
                } catch (error) {
                  console.error("Error persisting state:", error);
                }
              }

              return updatedState;
            });
          },
        }
      );

      return storeSlice;
    },
  };
}

// Create store factory with lazy initialization
let storeFactory: StoreFactory | null = null;

// Initialize the store only once
function getStore() {
  if (!storeFactory) {
    storeFactory = createZustandFactory();
    for (const [key, initialState] of Object.entries(stateDefinition)) {
      const persist = "persist" in initialState ? initialState.persist : false;
      storeFactory.createStore(key, initialState, persist);
    }
  }
  return storeFactory;
}

// Export store instance with safe initialization
export const store = typeof window !== 'undefined' ? getStore() : createZustandFactory();
