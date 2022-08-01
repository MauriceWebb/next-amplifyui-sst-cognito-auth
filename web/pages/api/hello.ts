import type { NextApiRequest, NextApiResponse } from 'next'
import { withSSRContext } from "aws-amplify";
import dataFetcher from '../../helpers/utils/dataFetcher'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // initialize a scoped Amplify instance from cookie credentials:
  const SSR = withSSRContext({ req })
  const [userData] = await dataFetcher(
    async () => SSR.Auth.currentAuthenticatedUser(), true
  )

  const user = userData.attributes;

  const message = `Dear ${user.given_name || user.email}, since the day you were born${user.birthdate && ' on '+user.birthdate}, I knew you would achieve great things 💪!`

  res.status(200).json({ message });
}
