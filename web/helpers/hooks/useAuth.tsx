import { useAuthenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuth = (isProtected = false) => {
    const actx = useAuthenticator(ctx => [ctx.authStatus, ctx.user]);
    const router = useRouter();

    function toAuth () {
        if (router.isReady) {
            router.push({
                pathname: '/auth',
                query: { from: router.pathname }
            })
        }
    }

    function toPrev () {
        if (router.isReady) {
            router.push(router.query.from as string || '/')
        }
    }

    useEffect(() => {
        if (isProtected && actx.authStatus === 'unauthenticated') {
            console.log('User must be authenticated. Redirecting to login...');
            toAuth();
        }
    })

    return {...actx, router, toAuth, toPrev};
}

export default useAuth