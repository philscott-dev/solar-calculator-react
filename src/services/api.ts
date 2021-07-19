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
    const { method, headers } = options
    const res = await fetch(url, {
      method,
      mode: 'cors',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        ...headers,
      },
    })
    const data = await res.text()
    return JSON.parse(data) as T
  } catch (err) {
    console.log(err)
  }
}
