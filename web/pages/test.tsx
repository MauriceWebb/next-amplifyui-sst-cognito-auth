import type { NextPage } from 'next'
import useAuth from '../helpers/hooks/useAuth';

const Test: NextPage = (props: any) => {
    const {authStatus, toAuth} = useAuth();
    return (
        <>
            <h1>Test Page</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dignissimos sequi omnis excepturi sunt veritatis eligendi perferendis sed numquam dolore magni deserunt voluptas consequuntur ex, vero quam, consectetur hic dolores culpa laborum expedita libero voluptatum. Ut repellat minus voluptates in libero sunt voluptatum excepturi aut expedita distinctio illo illum, voluptate reprehenderit? Sed ipsum totam natus dolor!
            </p>
            { 
                authStatus !== 'authenticated' && 
                <button onClick={toAuth}>Sign In</button>
            }
        </>
    )
}

export default Test;