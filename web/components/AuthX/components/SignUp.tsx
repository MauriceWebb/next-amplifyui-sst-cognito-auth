import { useAuthenticator, useTheme, Heading, Text } from '@aws-amplify/ui-react';

const signUpConfig = {
    Header
}
export default signUpConfig

function Header() {
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