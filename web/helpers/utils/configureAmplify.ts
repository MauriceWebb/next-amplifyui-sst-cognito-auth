import { Amplify } from 'aws-amplify'
import config from '../../aws-exports'

// configure Amplify and set ssr: true to pass credentials to server via cookies:
Amplify.configure({...config, ssr: true})