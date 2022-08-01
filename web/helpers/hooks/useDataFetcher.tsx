import { useState, useEffect } from "react"

export interface DataFetchInterface {
    data: null | any;
    error: null | any;
    loading: boolean;
  }

export default function useDataFetcher(route: string) {
    const [state, setState] = useState<DataFetchInterface>({
        data: null,
        error: null,
        loading: false
      })
    
      async function fetchState(e: any) {
        console.log(`fetching data for '${route}':`, e)
        setState(prev => ({...prev, loading: true}))
        await fetch(route)
          .then(res => res.json())
          .then((data) => setState(prev => ({...prev, data })))
          .catch(err => setState(prev => ({...prev, error: err})))
          .then(() => setState(prev => ({...prev, loading: false})))
      }
    
      useEffect(() => {
        if (state.data) {
          console.log('state.data:', state.data)
        }
      }, [state.data])
      
      return [state, fetchState]
}