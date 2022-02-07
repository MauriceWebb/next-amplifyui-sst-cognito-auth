import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { withAuthenticator, Authenticator, TextField, useTheme, Heading, Text, useAuthenticator } from '@aws-amplify/ui-react'
import { I18n, Auth } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'

I18n.putVocabulariesForLanguage('en', {
  Email: 'Email',
  'Preferred Username': 'Username',
  'Given Name': 'First Name',
  'Family Name': 'Last Name'
})

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <Authenticator 
          signUpAttributes={[
            'email',
            'given_name',
            'family_name',
            'birthdate',
          ]}
          // socialProviders={['google']}
          loginMechanisms={['email']}
          services={{
            async handleSignUp(formData) {
              formData.username = uuidv4()
              formData.attributes.email = formData.attributes.email.toLowerCase()
              console.log('formData:', formData)
              return Auth.signUp(formData)
            }
          }}
          components={{
            SignUp: {
              Header() {
                const { tokens } = useTheme();
                const { toSignIn } = useAuthenticator()
                const buttonStyles = { 
                  border: 'none', 
                  backgroundColor: 'inherit', 
                  padding: 0, 
                  fontSize: 16, 
                  textDecoration: 'underline', 
                  color: '#047D95', 
                  cursor: 'pointer' 
                }
          
                return (
                  <>
                    <Heading
                      padding={tokens.space.xl}
                      level={3}
                      textAlign='center'
                    >
                      Sign Up
                    </Heading>
                    <Text textAlign='center' padding={`0 ${tokens.space.large}`}>
                      Register an account to get started on your project or <button style={buttonStyles} onClick={toSignIn}>Sign in to your account</button>.
                    </Text>
                  </>
                );
              },
            }
          }}
        >
        {({ signOut, user }: { signOut: (data?: Record<string | number | symbol, any> | undefined) => void; user: any;}) => {
          console.log('user:', user)
          return (
            <div>
            <Head>
              <title>Next Cognito Auth</title>
              <meta name="description" content="Nextjs with Amplify UI" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
              <h1>Hello {user.attributes.given_name}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          </div>
          )
        }}
      </Authenticator>
      </div>
    </div>
  )
  return (
    <div>
      <Head>
        <title>Next Cognito Auth</title>
        <meta name="description" content="Nextjs with Amplify UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home

// export default withAuthenticator(Home, {
//   signUpAttributes: ['email'],
//   loginMechanisms: ['email']
// })
