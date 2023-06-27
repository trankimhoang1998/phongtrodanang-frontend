import { $Fetch } from 'ohmyfetch'

class HttpFactory {
  private $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  /**
   * method - GET, POST, PUT
   * URL
   **/
  async call<T>(
    method: string,
    url: string,
    data?: object,
    extras = {}
  ): Promise<T> {
    const config = useRuntimeConfig()

    const $res: T = await this.$fetch(url, {
      method,
      body: data,
      ...extras,
      baseURL: config.public.apiUrl,
    })
    return $res as T
  }
}

export default HttpFactory
