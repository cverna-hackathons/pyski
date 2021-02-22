const API_HOST = `http://localhost:4141`

export const request = async (
  route: string,
  { method = 'post', ...options } = {},
) => {
  const response = await fetch(`${API_HOST}${route}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: method.toUpperCase(),
    body: JSON.stringify(options),
  })

  return response.json()
}
