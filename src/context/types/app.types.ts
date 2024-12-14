import {ROOT_STACK} from '@/navigation/screenTypes';

const enum AppActionTypes {
  SET_APP_STATE,
  SWITCH_STACK,
}

const AppInitialState = {
  rootStack: ROOT_STACK.SPLASH,
  user: null,
};
type User = {
  name: string;
  gender: 'male' | 'female';
  birthday: Date;
};
type AppInitialType = {
  rootStack?: ROOT_STACK;
  user?: User | null;
};

export {AppActionTypes, AppInitialState};
export type {AppInitialType};
