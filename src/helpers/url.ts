import querystring, { ParsedUrlQueryInput } from 'querystring'

export interface PathOptions {
  pathname: string
  params?: ParsedUrlQueryInput
}

export interface UrlOptions {
  baseUrl: string
  query?: ParsedUrlQueryInput
  path?: string
}

export const buildUrl = ({ baseUrl, query, path }: UrlOptions) => {
  let fullUrl = new URL(baseUrl)

  if (path) {
    fullUrl = new URL(path, fullUrl)
  }

  if (query) {
    fullUrl = new URL('?' + querystring.stringify(query), fullUrl)
  }

  return fullUrl.toString()
}
