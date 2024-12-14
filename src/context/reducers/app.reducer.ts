import {ROOT_STACK} from '@/navigation/screenTypes';
import {AppActions} from '../actions/app.actions';
import {AppActionTypes, AppInitialType} from '../types';

export const appReducer = (state: AppInitialType, action: AppActions) => {
  console.log('hehe');
  switch (action.type) {
    case AppActionTypes.SWITCH_STACK: {
      return {...state, rootStack: action.payload};
    }
    case AppActionTypes.SET_APP_STATE: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
};

export const switchStack = (state: ROOT_STACK): AppActions => ({
  type: AppActionTypes.SWITCH_STACK,
  payload: state,
});

export const setAppState = (state: AppInitialType): AppActions => ({
  type: AppActionTypes.SET_APP_STATE,
  payload: state,
});
