import fetch from 'isomorphic-unfetch'

/**
 * Base Fetch
 */

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: any
}

export async function fetcher<T>(
  url: string | URL,
  options: FetchOptions = {},
): Promise<T> {
  try {
    const { method, headers, body } = options
    const res = await fetch(url.toString(), {
      method,
      mode: 'no-cors',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    console.log(res)
    const data = await res.text()
    console.log(data)
    return JSON.parse(data) as T
  } catch (err) {
    console.log(err)
  }
}
