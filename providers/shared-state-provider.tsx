"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { TriedPassword } from '@prisma/client';

type StateContextType = {
  passwords: TriedPassword[];
  setPasswords: (value: TriedPassword[]) => void;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  const [passwords, setPasswords] = useState<TriedPassword[]>([]);

  return (
    <StateContext.Provider value={{ passwords, setPasswords }}>
      {children}
    </StateContext.Provider>
  );
}

export function useSharedState(): StateContextType {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a StateProvider');
  }
  return context;
}