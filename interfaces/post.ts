export interface IPostDetail {
  category_id: number
  content: string
  created_at: string | null
  description: string | null
  id: number
  slug: string
  status: number
  title: string
  updated_at: string | null
  user_id: number
  author: string
  avatar: string
  comment_count: number
  like_count: number
}
