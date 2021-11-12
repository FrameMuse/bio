/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/

import { Action, Client, createClient, QueryResponse, RequestInterceptor, ResponseInterceptor } from "react-fetching-library"
import { СacheProvider } from "./cache"

const requestHostInterceptor: RequestInterceptor = (_client: Client) => async (action: Action) => {
  return {
    ...action,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    referrer: process.env.REACT_APP_HOSTNAME,
    credentials: "include",
    endpoint: `http://${process.env.REACT_APP_HOSTNAME}${action.endpoint}`,
  }
}

const responseInterceptor: ResponseInterceptor = () => async (action: Action, response: QueryResponse) => {
  if (process.env.NODE_ENV === "development") {
    console.group(`CLientAPI - '${action.endpoint}' => Response`)
    console.log(response)
    console.groupEnd()

    if (response.error) {
      throw response.errorObject
    }
  }

  return response
}

export const ClientAPI = createClient({
  requestInterceptors: [requestHostInterceptor],
  responseInterceptors: [responseInterceptor],
  cacheProvider: СacheProvider,
  fetch: (input, init) => {
    return fetch(input, init).catch(r => (console.error(r), r))
  }
})
