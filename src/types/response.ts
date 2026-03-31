export type TResponse<T> = {
  data: {
    data: T;
    message: string;
    success: boolean;
  };
};
