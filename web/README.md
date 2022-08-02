# AuthX

### NextJS + AWS(Amplify UI, CDK, Cognito, Lambda) and more!

AWS Cognito is a secure and cheap, managed solution to handling authentication flows. The major downside has been interacting with the service from the front-end. 

This project demonstrates a simplified way to integrate and customize the AWS Cognito service into a react (NextJS) application using AWS Amplify API and UI libraries. This is achieved in 5 simple steps:

1. Provisioning a new Cognito UserPool for your application using AWS CDK (or rather use an existing one). See: `../infra/stacks/AuthStack.ts`
2. Import and configure Amplify with `ssr: true` within your `_app.tsx`, and wrap the child `Component` with Amplify UI's `Authenticator.Provider` component to provide an app-wide access to the Authenticator's context that will be provided by the custom hook created in the next step.
3. Create a hook that provides useful methods and an authentication context provided by Amplify's Authenticator. See: `./helpers/hooks/useAuth.tsx`
4. Create a component that will serve a customizable and configurable UI that handles all authentication flows. See: `./components/AuthX/index.tsx`
5. Lastly, authentication data can be handled on the server by passing a request context into Amplify's `withSSRContext` method to initialize a scoped Amplify instance from cookie credentials. The Cognito cookies can be decoded using the Auth methods on the returned `AmplifyClass` instance.

This project serves a simple app that demonstrates using the auth hook to conditionaly render UI that should only be visible to authenticated users, redirecting a user to a signin/signup page when navigating to an auth-restricted page, how an authenticated user's tokens are automatically passed on each request by use of cookies, and locking down API endpoints by interrogating cookies.

## Roadmap

Besides Amplify, I'm not aware any open-sourced packages for React that really simplifies the ease of usage for Amplify or AWS Cognito. I'd like to refactor the pieces mentioned above into an intuitive HOC that abstracts the hooks and pieces and accepts a config.