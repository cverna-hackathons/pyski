export const getToken = (): string | null => window.localStorage.getItem('token');
export const setToken = (token: string): void => window.localStorage.setItem('token', token);
export const clearToken = () => window.localStorage.removeItem('token');
