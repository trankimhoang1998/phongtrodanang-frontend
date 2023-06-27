import { IPostDetail } from '@/interfaces/post'

export const usePost = defineStore('post', {
  state: (): {
    postList: IPostDetail[]
    postDetail: IPostDetail | null
    meta: {
      count: number | null
      page_no: number | null
      page_size: number | null
      total_page: number | null
    }
  } => ({
    postList: [],
    postDetail: null,
    meta: {
      count: null,
      page_no: null,
      page_size: null,
      total_page: null,
    },
  }),

  actions: {
    async getPostList(page: string | number) {
      const { $api } = useNuxtApp()
      try {
        const res = await $api.post.getPostList(page)
        this.postList = res.data
        this.meta = res.meta
      } catch (error) {}
    },

    async getPostDetail(id: string | number) {
      const { $api } = useNuxtApp()
      try {
        const res = await $api.post.getPostDetail(id)
        this.postDetail = res.data
      } catch (error) {}
    },
  },
  getters: {},
})
