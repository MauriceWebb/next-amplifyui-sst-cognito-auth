import type { NextPage } from 'next'
import useAuth from '../helpers/hooks/useAuth';
import useDataFetcher from '../helpers/hooks/useDataFetcher'

const Home: NextPage = (props: any) => {
  const {user, signOut, authStatus } = useAuth(true);
  const title = authStatus === 'configuring' ? 
    'Welcome to the home page ...' : authStatus === 'authenticated' ?
      `Welcome back home ${user.attributes?.email}!`
      : 'Welcome to the home page. Please sign in'

  const [messageState, fetchMessage]: any[] = useDataFetcher('api/hello')
  
  return (
    <>
      <h1>{title}</h1>
      { authStatus === 'authenticated' && <button onClick={signOut}>Sign Out</button>}
      { authStatus === 'authenticated' && (
        <>
          <pre>
            {JSON.stringify(user.attributes, null, 2)}
          </pre>
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
      )}
    </>
  )
}

export default Home;