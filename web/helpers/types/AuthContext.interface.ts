import {Auth} from 'aws-amplify'

export interface CognitoUser {
    username: string;
    pool: Pool;
    Session?: any;
    client: Client;
    signInUserSession: SignInUserSession;
    authenticationFlowType: string;
    storage: Storage;
    keyPrefix: string;
    userDataKey: string;
    attributes: Attributes;
    preferredMFA: string;
}

interface Attributes {
    sub: string;
    birthdate: string;
    email_verified: boolean;
    given_name: string;
    family_name: string;
    email: string;
}

interface SignInUserSession {
    idToken: IdToken;
    refreshToken: RefreshToken;
    accessToken: AccessToken;
    clockDrift: number;
}

interface AccessToken {
    jwtToken: string;
    payload: Payload2;
}

interface Payload2 {
    sub: string;
    iss: string;
    client_id: string;
    origin_jti: string;
    event_id: string;
    token_use: string;
    scope: string;
    auth_time: number;
    exp: number;
    iat: number;
    jti: string;
    username: string;
}

interface RefreshToken {
    token: string;
}

interface IdToken {
    jwtToken: string;
    payload: Payload;
}

interface Payload {
    sub: string;
    email_verified: boolean;
    birthdate: string;
    iss: string;
    'cognito:username': string;
    given_name: string;
    origin_jti: string;
    aud: string;
    event_id: string;
    token_use: string;
    auth_time: number;
    exp: number;
    iat: number;
    family_name: string;
    jti: string;
    email: string;
}

interface Pool {
    userPoolId: string;
    clientId: string;
    client: Client;
    advancedSecurityDataCollectionFlag: boolean;
    storage: Storage;
}

interface Storage {
    cookies: Cookies2;
    store: Store;
}

interface Store {
    [key: string]: string;
}

interface Cookies2 {
    changeListeners: any[];
    HAS_DOCUMENT_COOKIE: boolean;
    cookies: Cookies;
}

interface Cookies {
    [key: string]: string;
}

interface Client {
    endpoint: string;
    fetchOptions: FetchOptions;
}

interface FetchOptions {}

export interface AuthContextInterface {
    user: CognitoUser | undefined;
    signOutUser: () => Promise<void>;
    updateUser: 
        (authenticatedUser?: CognitoUser) => Promise<void>;
    isLoading: boolean;
}