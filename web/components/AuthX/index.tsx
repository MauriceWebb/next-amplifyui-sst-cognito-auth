import { Authenticator } from "@aws-amplify/ui-react";
import config from "./config";
import Layout from './components/Layout'
import { useEffect } from "react";
import { I18n } from "aws-amplify";
import useAuth from "../../helpers/hooks/useAuth";

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

const AuthX = () => {
    const {user, authStatus, toPrev} = useAuth();

    useEffect(() => {
        if (user !== undefined && authStatus !== 'unauthenticated') {
            toPrev()
        }
    })

    return (
        <Layout>
            <Authenticator {...config}/>
        </Layout>
    )
}

export default AuthX