import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import { Auth, Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import {ACtxProvider} from '../components/AuthCtx'
import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react'
// import config from '../aws-exports'
import { useEffect } from 'react'
// Amplify.configure({...config, ssr: true})
import '../helpers/utils/configureAmplify'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <Component {...pageProps} />
    </Authenticator.Provider>
  )
  // return (
  //   <ACtxProvider>
  //     <AmplifyProvider>
  //       <Component {...pageProps} />
  //     </AmplifyProvider>
  //   </ACtxProvider>
  // )
}

export default MyApp
