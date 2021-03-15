export const wait = (delay: number): Promise<number> => new Promise((resolve: Function) => {
  setTimeout(() => {
    return resolve(delay);
  }, delay);
})