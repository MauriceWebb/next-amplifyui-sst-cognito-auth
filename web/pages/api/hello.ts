// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getRequestCookies from '../../helpers/utils/getRequestCookies'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {accessToken, idToken} = getRequestCookies(req);
  console.log({accessToken, idToken})

  res.status(200).json({ message: 'I love you' })
}
