import { WithAuthenticatorOptions } from "@aws-amplify/ui-react/dist/types/components/Authenticator/withAuthenticator"
import handleSignUp from "./services/handleSignUp";
import SignUp from "./components/SignUp";

const config: WithAuthenticatorOptions = {
    signUpAttributes: [
        'email',
        'given_name',
        'family_name',
        'birthdate',
    ],
    socialProviders: ['google'],
    loginMechanisms: ['email'],
    services: {
        handleSignUp,
    },
    components: {
        SignUp
    }
};

export default config