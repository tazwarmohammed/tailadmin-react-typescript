import { createContext, useContext, useState, ReactNode } from "react";

type LayoutOrientation = 'horizontal' | 'vertical';

interface LayoutContextType {
  orientation: LayoutOrientation;
  toggleOrientation: () => void;
  setOrientation: (orientation: LayoutOrientation) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [orientation, setOrientationState] = useState<LayoutOrientation>('vertical');

  const toggleOrientation = () => {
    setOrientationState(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };

  const setOrientation = (newOrientation: LayoutOrientation) => {
    setOrientationState(newOrientation);
  };

  return (
    <LayoutContext.Provider value={{
      orientation,
      toggleOrientation,
      setOrientation
    }}>
      {children}
    </LayoutContext.Provider>
  );
};
