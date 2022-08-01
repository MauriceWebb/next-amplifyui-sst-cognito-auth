import { NextApiRequest } from "next"
interface RequestCookiesInterface {
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    LastAuthUser?: string;
    [key: string]: any;
}
export default function getRequestCookies (req: NextApiRequest): RequestCookiesInterface {
    if (!req.cookies) {
        return {}
    }
    return Object.keys(req.cookies).reduce(
        (obj, key) => {
          const names = key.split('.')
          obj[names[names.length - 1]] = req.cookies[key]
          return obj
        },
        {} as {[key: string]: any}
      )
}