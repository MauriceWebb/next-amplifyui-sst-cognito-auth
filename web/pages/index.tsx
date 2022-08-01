import type { NextPage } from 'next'
import { withRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '../helpers/hooks/useAuth';
import useDataFetcher from '../helpers/hooks/useDataFetcher'
import { redirectToAuth } from '../helpers/utils/redirectToAuth';

const Home: NextPage = (props: any) => {
  const {user, signOut, authStatus } = useAuth();
  const title = authStatus === 'authenticated' ?
      `Welcome back home ${user.attributes?.email}!`
      : 'Please sign in:'

  const [messageState, fetchMessage]: any[] = useDataFetcher('api/hello')

  function handleSignIn () {
    redirectToAuth(props.router)
  }
  
  return (
    <>
      <h1>{title}</h1>
      { authStatus === 'authenticated' && 
        <button onClick={signOut}>Sign Out</button>
      }
      { authStatus !== 'authenticated' && 
        <button onClick={handleSignIn}>Sign In</button>
      }
      { authStatus === 'authenticated' && (
        <pre>
          {JSON.stringify(user.attributes, null, 2)}
        </pre>
      )}
      <button onClick={fetchMessage as any}>
        Request Message
      </button>
      {
        messageState.loading ? (<p>Loading...</p>) : 
        !messageState.loading && messageState.data && 
        <pre>
          {JSON.stringify(messageState.data, null, 2)}
        </pre>
      }
    </>
  )
}

export default withRouter(Home);