export const API_HOST = `http://localhost:4141`;
export const request = async <T>(
  route: string,
  { method = 'post', ...options } = {},
): Promise<T> => {
  const response = await fetch(`${API_HOST}${route}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: method.toUpperCase(),
    body: method === 'post' ? JSON.stringify(options) : undefined,
  });

  return response.json();
};
