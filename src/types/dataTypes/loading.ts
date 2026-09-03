export const loading = {
  NONE: 0,
  ERROR: 1,
  LOADED: 2,
  LOADING: 3,
} as const;

export type Loading = (typeof loading)[keyof typeof loading];
