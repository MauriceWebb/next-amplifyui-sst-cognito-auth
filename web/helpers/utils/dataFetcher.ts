type dataFetcherReturnValue = [data: any, error: Error]
/**
 * 
 * @param fn An async function scope
 * @param authRequired Whether to throw an error or not if no cookie credentials are passed within the request context. Default: `false`
 * @returns {Promise<dataFetcherReturnValue>}
 */
export default async function dataFetcher (fn: () => Promise<any>, authRequired: boolean = false): Promise<dataFetcherReturnValue> {
    let data: any = null;
    let error: any = null;
  
    await fn()
      .then(res => {
        data = res;
      })
      .catch(err => {
        if (authRequired) {
          throw(err)
        }
        error = err
      })
  
    return [data, error]
  }