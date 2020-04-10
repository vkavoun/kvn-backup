import { UserAgent } from '@kvn/data';
import React from 'react';
enum AppActionType {
  SET = 'SET',
  UPDATE = 'UPDATE',
  REFRESH = 'REFRESH'
}

type Action =
  | { type: AppActionType.SET; payload: UserAgent }
  | { type: AppActionType.UPDATE; payload: UserAgent }
  | { type: AppActionType.REFRESH; payload: UserAgent };

type Dispatch = (action: Action) => void;

type State = {};

type AppProviderProps = { children: React.ReactNode };

const initialState = { userAgent: new UserAgent() };

const AppStateContext = React.createContext<State | undefined>(initialState);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case AppActionType.SET: {
      return { userAgent: action.payload };
    }
    case AppActionType.UPDATE: {
      return { ...state, userAgent: action.payload };
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

export { AppActionType, AppProvider, useAppState, useAppDispatch };

