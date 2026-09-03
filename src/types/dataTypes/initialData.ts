import type { Loading } from "./loading";

export type InitialData<T> = {
  isLoading: Loading;
  error: {
    message: string | undefined;
    status: number | string | undefined;
  };
  data: T | null;
};
