export type RecursiveRequired<T> = {
  [K in keyof T]: Required<RecursiveRequired<T[K]>>;
};

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | null | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};
