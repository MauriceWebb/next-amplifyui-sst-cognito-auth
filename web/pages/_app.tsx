import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Amplify, { Auth } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import { AmplifyProvider } from '@aws-amplify/ui-react'
import config from '../aws-exports'
Amplify.configure(config)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AmplifyProvider>
      <Component {...pageProps} />
    </AmplifyProvider>
  )
}

export default MyApp
