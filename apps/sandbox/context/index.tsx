import React from 'react';

type Action =
  | { type: 'set'; payload: Record<string, object> }
  | { type: 'update'; payload: Record<string, object> }
  | { type: 'refresh'; payload: Record<string, object> };

type Dispatch = (action: Action) => void;

type State = {};

type AppProviderProps = { children: React.ReactNode };

const initialState = {};

const AppStateContext = React.createContext<State | undefined>(initialState);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case 'set': {
      return { ...action.payload };
    }
    case 'update': {
      return { ...state, ...action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }
  return context;
}

export { AppProvider, useAppState, useAppDispatch };
