import React, {createContext, useReducer} from 'react';
import {AppInitialState, AppInitialType, ProviderPropsType} from '../types';
import {AppActions} from '../actions/app.actions';
import {appReducer} from '../reducers/app.reducer';

const AppContext = createContext<{
  appState: AppInitialType;
  appDispatch: React.Dispatch<AppActions>;
}>({
  appState: AppInitialState,
  appDispatch: () => undefined,
});

export const AppProvider = ({children}: ProviderPropsType) => {
  const [appState, appDispatch] = useReducer(appReducer, AppInitialState);

  return (
    <AppContext.Provider
      value={{
        appState,
        appDispatch,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const withContext = (Component: any) =>
  function MyComponent(props: any) {
    return (
      <AppContext.Consumer>
        {({appState, appDispatch}) => (
          <Component {...props} appState={appState} appDispatch={appDispatch} />
        )}
      </AppContext.Consumer>
    );
  };

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
