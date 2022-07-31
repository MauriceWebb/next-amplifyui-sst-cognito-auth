import { NextRouter } from "next/router"

export function redirectToAuth(r: NextRouter) {
    if (r.isReady) {
        r.push({
            pathname: '/auth',
            query: { from: r.pathname }
        })
    }
}

export function redirectToPrev(r: NextRouter) {
    if (r.isReady) {
        r.push(r.query.from as string || '/')
    }
}