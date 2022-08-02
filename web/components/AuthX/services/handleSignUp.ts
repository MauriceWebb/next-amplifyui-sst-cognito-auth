import { v4 as uuidv4 } from 'uuid';
import { Auth } from 'aws-amplify';

export default async function handleSignUp (formData: any) {
    formData.username = uuidv4()
    formData.attributes.email = formData.attributes.email.toLowerCase()
    console.log('formData:', formData)
    return Auth.signUp(formData)
}