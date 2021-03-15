export const API_HOST = 'localhost:4141';
export const API_URI = `http://${API_HOST}`;
export const request = async <T>(
  route: string,
  { method = 'post', ...options } = {},
): Promise<T> => {
  const response = await fetch(`${API_URI}${route}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: method.toUpperCase(),
    body: method === 'post' ? JSON.stringify(options) : undefined,
  });

  return response.json();
};
