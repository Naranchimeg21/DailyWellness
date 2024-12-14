//Root
export enum ROOT_STACK {
  SPLASH = 'SPLASH',
  AUTH = 'AUTH',
  MAIN = 'MAIN',
}

export type RootStackParamList = {
  [ROOT_STACK.SPLASH]: undefined;
  [ROOT_STACK.AUTH]: undefined;
  [ROOT_STACK.MAIN]: undefined;
};

//Auth
export enum AUTH_STACK {
  CREATE_ACCOUNT = 'CreateAccount',
}

export type AuthStackParamList = {
  [AUTH_STACK.CREATE_ACCOUNT]: undefined;
};

//Main
export enum MAIN_STACK {
  MAIN_TABS = 'Main_tabs',
  DASHBOARD = 'Dashboard',
}

export enum MAIN_TAB_STACK {
  HOME = 'Home',
  TRACKER = 'Tracker',
  HEALTH = 'Health',
}
export type MainTabStackParamList = {
  [MAIN_TAB_STACK.HOME]: undefined;
  [MAIN_TAB_STACK.TRACKER]: undefined;
  [MAIN_TAB_STACK.HEALTH]: undefined;
};

export type MainStackParamList = {
  [MAIN_STACK.MAIN_TABS]: undefined;
  [MAIN_STACK.DASHBOARD]: undefined;
};

//Home
export enum HOME_STACK {
  LIST = 'List',
  QUOTE = 'Quote',
  WEATHER = 'Weather',
}
export type HomeStackParamList = {
  [HOME_STACK.LIST]: undefined;
  [HOME_STACK.QUOTE]: undefined;
  [HOME_STACK.WEATHER]: undefined;
};

export enum TRACKER_STACK {
  LIST = 'List',
  ADD = 'Add',
}
export type TrackerStackParamList = {
  [TRACKER_STACK.LIST]: undefined;
  [TRACKER_STACK.ADD]: undefined;
};

export enum HEALTH_STACK {
  LIST = 'List',
}
export type HealthStackParamList = {
  [HEALTH_STACK.LIST]: undefined;
};

export enum DASHBOARD_STACK {
  LIST = 'List',
}
export type DashboardStackParamList = {
  [DASHBOARD_STACK.LIST]: undefined;
};
