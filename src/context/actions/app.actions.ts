import {ROOT_STACK} from '@/navigation/screenTypes';
import {AppActionTypes, AppInitialType} from '../types';

type ActionMap<M extends {[index: string]: any}> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type AppPayload = {
  [AppActionTypes.SET_APP_STATE]: AppInitialType;
  [AppActionTypes.SWITCH_STACK]: ROOT_STACK;
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];
