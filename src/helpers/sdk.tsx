import { Configuration, PublicApi } from '@oryd/kratos-client'
import Constants from 'expo-constants'

// canonicalize removes the trailing slash from URLs.
const canonicalize = (url: string = '') => url.replace(/\/+$/, '')

export const kratosUrl =
  canonicalize(Constants.manifest?.extra?.kratosUrl) || ''

// axios.defaults.withCredentials = false
const kratos = new PublicApi(
  new Configuration({
    basePath: kratosUrl,
    baseOptions: {
      // Setting this is very important as axios will send the CSRF cookie otherwise
      // which causes problems with ORY Kratos' security detection.
      withCredentials: false
    }
  })
)

export const kratosWithSessionToken = (token: string) =>
  new PublicApi(
    new Configuration({
      basePath: kratosUrl,
      apiKey: token,
      baseOptions: {
        // Setting this is very important as axios will send the CSRF cookie otherwise
        // which causes problems with ORY Kratos' security detection.
        withCredentials: false
      }
    })
  )

// This exports the ORY Kratos SDK
export default kratos
