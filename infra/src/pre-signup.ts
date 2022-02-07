import { PreSignUpTriggerHandler } from "aws-lambda";
import AWS from 'aws-sdk'
const cognitoIdp = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18'
});

export const handler: PreSignUpTriggerHandler = async (event, context) => {

    console.log(
        'Cognito pre-signup lambda trigger event:', 
        JSON.stringify(event, null, 2)
    )

    const email = event.request.userAttributes.email;
    
    const params = {
      UserPoolId: event.userPoolId,
      Filter: `email = "${email}"`,
    };

    return await cognitoIdp.listUsers(params).promise()
        .then (results => {
            console.log('listUsers results:', JSON.stringify(results));
            // if the usernames are the same, dont raise and error here so that
            // cognito will raise the duplicate username error
            if (results?.Users && results.Users.length > 0 && results.Users[0].Username !== event.userName) {
                console.log('Duplicate email address in signup. ' + email);
                return Error('A user with the same email address exists')
            }

            console.log(
                'Event response:', 
                JSON.stringify(event.response, null, 2)
            )

            return event
        })
        .catch (error => {
            console.log(error);
            return error
        });
};
