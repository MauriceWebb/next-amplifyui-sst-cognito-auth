import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@aws-amplify/ui-react/styles.css'
import { Authenticator } from '@aws-amplify/ui-react'
import '../helpers/utils/configureAmplify'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <Component {...pageProps} />
    </Authenticator.Provider>
  )
}

export default MyApp
