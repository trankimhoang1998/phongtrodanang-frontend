<script lang="ts" setup>
import { capitalize } from '@/utils/str'
import { usePost } from '@/stores/post'
import _cloneDeep from 'lodash/cloneDeep'

// composable
const { t } = useLang()
const postStore = usePost()
const router = useRouter()
const route = useRoute()
const { formatDate } = useHelper()
const currentPage = ref(1)
const isLoading = ref(false)

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.post.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.post.description'),
    },
  ],
}))

const postList = computed(() => {
  return postStore.postList
})

const meta = computed(() => {
  return postStore.meta
})

const getListPost = async () => {
  isLoading.value = true
  await postStore.getPostList(currentPage.value)
  isLoading.value = false
}

const handleViewDetailPost = (id: number) => {
  router.push(`post/${id}`)
}

watch(currentPage, async () => {
  await getListPost()
})

onMounted(() => {
  getListPost()
})
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="'Bài Viết'" class="capitalize" />
    </PageHeader>
    <PageBody v-if="!isLoading" class="lg:w-3/4">
      <!-- <ContentList v-slot="{ list }" path="/post">
        <PageSection v-for="article in list" :key="article._path">
          <div
            class="block hover:no-underline p-6 flex space-x-6 rounded border border-gray-900/10 dark:border-gray-50/[0.2]"
          >
            <div class="mt-1 text-slate-600 dark:text-gray-400 text-right">
              <div>{{ article.date }}</div>
              <Anchor
                class="text-sm flex items-center justify-end space-x-1"
                :href="`https://www.github.com/${article.author}`"
              >
                <icon-mdi:github-face class="text-xs" />
                <span>{{ article.author }}</span>
              </Anchor>
            </div>
            <div class="flex flex-col">
              <div
                class="text-xl font-semibold text-slate-800 dark:text-gray-50"
              >
                {{ article.title }}
              </div>
              <div class="text-slate-700 dark:text-gray-300 mb-1">
                {{ article.description }}
              </div>
              <div class="flex">
                <Anchor
                  class="text-sm flex space-x-1 items-center text-primary-500"
                  :to="article._path"
                >
                  <span>{{ $t('others.learn_more') }}</span>
                  <icon:ic:baseline-arrow-right-alt class="text-sm" />
                </Anchor>
              </div>
            </div>
          </div>
        </PageSection>
      </ContentList> -->

      <PageSection v-for="article in postList" :key="article.id">
        <!-- <div
          class="block hover:no-underline p-6 flex space-x-6 rounded border border-gray-900/10 dark:border-gray-50/[0.2]"
        >
          <div
            class="w-100px mt-1 text-slate-600 dark:text-gray-400 text-right"
          >
            <div>{{ formatDate(article.updated_at) }}</div>
            <div class="text-sm flex items-center justify-end space-x-1">
              <icon-mdi:github-face class="text-xs" />
              <span>{{ article.user_id }}</span>
            </div>
          </div>
          <div class="flex flex-col w-[calc(100%-100px)]">
            <div class="text-xl font-semibold text-slate-800 dark:text-gray-50">
              {{ article.title }}
            </div>
            <div class="article__desc text-slate-700 dark:text-gray-300 mb-1">
              {{ article.description }}
            </div>
            <div class="flex">
              <div
                class="text-sm flex space-x-1 items-center text-primary-500 cursor-pointer"
                @click="handleViewDetailPost(article.id)"
              >
                <span>{{ $t('others.learn_more') }}</span>
                <icon:ic:baseline-arrow-right-alt class="text-sm" />
              </div>
            </div>
          </div>
        </div> -->

        <div
          class="dark:bg-gray-900 flex items-center justify-center cursor-pointer"
          @click="handleViewDetailPost(article.id)"
        >
          <div
            class="w-full px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-lg"
          >
            <div class="flex mb-4">
              <img class="w-12 h-12 rounded-full" :src="article.avatar" />
              <div class="ml-2 mt-0.5">
                <span
                  class="block font-medium text-base leading-snug text-black dark:text-gray-100"
                  >{{ article.author }}</span
                >
                <span
                  class="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug"
                  >{{ article.updated_at }}</span
                >
              </div>
            </div>
            <p
              class="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal"
            >
              {{ article.content }}
            </p>
            <div class="flex justify-between items-center mt-5">
              <div class="flex">
                <svg
                  class="p-0.5 h-6 w-6 rounded-full z-20 bg-white dark:bg-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 16 16"
                >
                  <defs>
                    <linearGradient id="a1" x1="50%" x2="50%" y1="0%" y2="100%">
                      <stop offset="0%" stop-color="#18AFFF" />
                      <stop offset="100%" stop-color="#0062DF" />
                    </linearGradient>
                    <filter
                      id="c1"
                      width="118.8%"
                      height="118.8%"
                      x="-9.4%"
                      y="-9.4%"
                      filterUnits="objectBoundingBox"
                    >
                      <feGaussianBlur
                        in="SourceAlpha"
                        result="shadowBlurInner1"
                        stdDeviation="1"
                      />
                      <feOffset
                        dy="-1"
                        in="shadowBlurInner1"
                        result="shadowOffsetInner1"
                      />
                      <feComposite
                        in="shadowOffsetInner1"
                        in2="SourceAlpha"
                        k2="-1"
                        k3="1"
                        operator="arithmetic"
                        result="shadowInnerInner1"
                      />
                      <feColorMatrix
                        in="shadowInnerInner1"
                        values="0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0"
                      />
                    </filter>
                    <path
                      id="b1"
                      d="M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z"
                    />
                  </defs>
                  <g fill="none">
                    <use fill="url(#a1)" xlink:href="#b1" />
                    <use fill="black" filter="url(#c1)" xlink:href="#b1" />
                    <path
                      fill="white"
                      d="M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z"
                    />
                  </g>
                </svg>
                <span
                  class="ml-1 text-gray-500 dark:text-gray-400 font-light"
                  >{{ article.like_count }}</span
                >
              </div>
              <div class="ml-1 text-gray-500 dark:text-gray-400 font-light">
                {{ article.comment_count }} comments
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <Pagination
        :current-page="currentPage"
        :total-items="meta?.count"
        :per-page="meta?.page_size"
        :total-page="meta?.total_page"
        @page-changed="currentPage = $event"
      ></Pagination>
    </PageBody>
    <Loading v-if="isLoading" class="absolute w-full h-screen top-0 left-0" />
  </PageWrapper>
</template>

<style lang="scss" scoped>
.article__desc {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
