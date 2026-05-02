export const fakeApi = <T>(data: T, ms = 700): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
