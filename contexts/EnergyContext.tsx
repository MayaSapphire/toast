import React, { createContext, ReactNode, useContext, useState } from 'react';

interface EnergyContextType {
  energy: number;
  setEnergy: (energy: number) => void;
}

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

export const EnergyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [energy, setEnergy] = useState<number>(0.5); // default value

  return (
    <EnergyContext.Provider value={{ energy, setEnergy }}>
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error('useEnergy must be used within an EnergyProvider');
  }
  return context;
};

export const setEnergy = (energy: number) => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error('setEnergy must be used within an EnergyProvider');
  }
  context.setEnergy(energy);
};