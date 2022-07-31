import type { NextPage } from 'next'
import { Authenticator, useAuthenticator, useTheme, Heading, Text } from '@aws-amplify/ui-react'
import { useEffect } from 'react'
import '../helpers/utils/configureAmplify'
import { withRouter } from 'next/router'
import {redirectToPrev} from '../helpers/utils/redirectToAuth'
import { I18n } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'
import { Auth } from 'aws-amplify'

const dictionaries = [
    {
        language: 'en',
        vocabularies: {
            Email: 'Email',
            'Preferred Username': 'Username',
            'Given Name': 'First Name',
            'Family Name': 'Last Name'
        }
    }
]

dictionaries?.forEach(
    dict => I18n.putVocabulariesForLanguage(dict.language, dict.vocabularies)
)

const AuthPage: NextPage = (props: any) => {
    const {user, authStatus} = useAuthenticator(ctx => [ctx.authStatus, ctx.user])

    useEffect(() => {
        if (user !== undefined && authStatus !== 'unauthenticated') {
            redirectToPrev(props.router)
        }
    })

    return (
        <>
            <h1>Auth Page</h1>
            <Authenticator
                    signUpAttributes={[
                        'email',
                        'given_name',
                        'family_name',
                        'birthdate',
                    ]}
                    socialProviders={['google']}
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
                                        <Text 
                                            textAlign='center' 
                                            padding={`0 ${tokens.space.large}`}
                                        >
                                            Register an account to get started on your project or <button style={buttonStyles} onClick={toSignIn}>Sign in to your account</button>.
                                        </Text>
                                    </>
                                );
                            }
                        }
                    }}
                />
        </>
    )
}

export default withRouter(AuthPage)
