import fetch from 'isomorphic-unfetch'

/**
 * Base Fetch
 */

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: any
}

export async function fetcher<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  try {
    const { method, headers, body } = options
    const res = await fetch(url, {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify(body),
    })

    return (await res.json()) as T
  } catch (err) {
    console.log(err)
  }
}
