import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create cognito auth provider:
    const auth = new sst.Auth(this, 'auth-provider', {
      cognito: {
        userPool: {
          signInAliases: {
            username: true,
            preferredUsername: true,
            email: true
          },
          standardAttributes: {
            email: {
              required: true,
              mutable: true
            },
            givenName: {
              required: true,
              mutable: true
            },
            familyName: {
              required: true,
              mutable: true
            },
            birthdate: {
              required: true,
              mutable: false
            },
            address: {
              required: false,
              mutable: true
            },
            gender: {
              required: false,
              mutable: true
            },
            phoneNumber: {
              required: false,
              mutable: true
            },
            profilePicture: {
              required: false,
              mutable: true
            },
            preferredUsername: {
              required: false,
              mutable: true,
            }
          },
        },
        triggers: {
          preSignUp: new sst.Function(this, 'pre-signup', {
            functionName: 'pre-signup-lambda-trigger',
            handler: 'src/pre-signup.handler',
          })
        }
      }
    })

    auth.attachPermissionsForTriggers(['cognito-idp:ListUsers'])

    // output the cognito userPool region:
    this.addOutputs({
      "awsCognitoRegion": auth.cognitoUserPool?.stack.region || '',
    });
    
    // output the cognito userPoolId:
    this.addOutputs({
      "awsUserPoolsId": auth.cognitoUserPool?.userPoolId || '',
    });
    
    // output the cognito userPoolClientId:
    this.addOutputs({
      "awsUserPoolsWebClientId": auth.cognitoUserPoolClient?.userPoolClientId || '',
    });
    
    // output the cognito identityPoolId:
    this.addOutputs({
      "awsCognitoIdentityPoolId": auth.cognitoCfnIdentityPool.ref,
    });
    
  }
}
