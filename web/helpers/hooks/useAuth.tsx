import { useAuthenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {redirectToAuth} from '../utils/redirectToAuth';

export default function useAuth(isProtected = false) {
    const actx = useAuthenticator(ctx => [ctx.authStatus]);
    const router = useRouter();

    useEffect(() => {
        if (isProtected && actx.authStatus === 'unauthenticated') {
            console.log('User must be authenticated. Redirecting to login...')
            redirectToAuth(router)
        }
    })

    return actx
}