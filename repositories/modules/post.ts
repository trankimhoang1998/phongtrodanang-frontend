import HttpFactory from '../factory'

class PostModule extends HttpFactory {
  private config = useRuntimeConfig()

  async getPostList(page: string | number): Promise<any> {
    return await this.call<any>(
      'GET',
      `${this.config.public.apiVer}/posts?page=${page}`
    )
  }

  async getPostDetail(id: string | number): Promise<any> {
    return await this.call<any>(
      'GET',
      `${this.config.public.apiVer}/posts/${id}`
    )
  }
}

export default PostModule
