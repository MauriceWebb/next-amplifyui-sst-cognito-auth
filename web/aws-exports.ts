import cdkOutputs from './cdk-outputs.json'
const outPuts: { [key: string]: any } = cdkOutputs
const cdkExports = outPuts[Object.keys(cdkOutputs)[0]]

const awsExports = {
    aws_cognito_region: cdkExports.awsCognitoRegion || null,
    aws_user_pools_id: cdkExports.awsUserPoolsId || null,
    aws_user_pools_web_client_id: cdkExports.awsUserPoolsWebClientId || null,
    aws_cognito_identity_pool_id: cdkExports.awsCognitoIdentityPoolId || null
}

export default awsExports