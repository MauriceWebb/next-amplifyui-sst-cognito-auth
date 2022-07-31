import type { NextPage } from 'next'
import useAuth from '../helpers/hooks/useAuth';

const Home: NextPage = (props: any) => {
  const {user, signOut, authStatus} = useAuth(true);

  const title = authStatus === 'configuring' ? 
    'Welcome to the home page ...' : authStatus === 'authenticated' ?
      `Welcome back home ${user.attributes?.email}!`
      : 'Welcome to the home page. Please sign in'

  return (
    <>
      <h1>{title}</h1>
      { authStatus === 'authenticated' && <button onClick={signOut}>Sign Out</button>}
    </>
  )
}

export default Home;