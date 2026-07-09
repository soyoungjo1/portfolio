<template>
  <div class="font-body-md text-on-surface">
    <main class="pt-32 pb-48 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">

      <!-- Featured Video Banner -->
      <section class="mb-16">
        <div class="relative w-full rounded-2xl overflow-hidden" :style="{ aspectRatio: isMobile ? '9/16' : '21/9' }">
          <video
            v-if="isClient && isMobile"
            ref="videoEl"
            class="w-full h-full object-cover"
            autoplay muted loop playsinline preload="auto"
            src="/images/docs_mw.mp4"
          ></video>
          <video
            v-else-if="isClient"
            ref="videoEl"
            class="w-full h-full object-cover"
            autoplay muted loop playsinline preload="auto"
            src="/images/docs_web.mp4"
          ></video>
          <div v-else class="w-full h-full bg-primary-container"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 md:p-16">
            <span class="font-label-sm text-label-sm text-white/60 uppercase tracking-widest mb-3">Tech Blog</span>
            <h1 class="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-white uppercase tracking-widest">Docs</h1>
            <p class="mt-2 text-white/70 font-body-md max-w-lg">프로젝트 개발 경험과 기술적 인사이트를 기록합니다.</p>
          </div>
        </div>
      </section>

      <!-- Search -->
      <section class="mb-10">
        <div class="relative w-full max-w-xl">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-secondary">
            <span class="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            v-model="searchQuery"
            class="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 pl-11 pr-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-sm"
            placeholder="포스트 검색..."
            type="text"
          />
        </div>
      </section>

      <!-- Blog Card Grid -->
      <section>
        <!-- Loading -->
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="rounded-2xl overflow-hidden bg-surface-container animate-pulse">
            <div class="h-48 bg-surface-container-highest"></div>
            <div class="p-5 space-y-3">
              <div class="h-4 w-3/4 rounded bg-surface-container-highest"></div>
              <div class="h-3 w-1/3 rounded bg-surface-container-highest"></div>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-secondary font-body-md p-4">
          문서를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-if="filteredPages.length === 0" class="col-span-full text-secondary font-body-md p-4">
            검색 결과가 없습니다.
          </div>
          <NuxtLink
            v-for="(page, idx) in filteredPages"
            :key="page.id"
            :to="`/docs/${page.id}`"
            class="group rounded-2xl overflow-hidden bg-surface-container hover:bg-surface-container-high transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            <!-- Thumbnail -->
            <div class="h-44 relative overflow-hidden">
              <img
                v-if="page.cover"
                :src="page.cover"
                :alt="page.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
                :style="{ background: cardGradient(idx) }"
              >
                <span class="text-5xl select-none">{{ cardEmoji(page.title) }}</span>
              </div>
            </div>
            <!-- Body -->
            <div class="p-5">
              <p class="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-2">Dev Log</p>
              <h3 class="font-body-md font-semibold text-primary leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {{ page.title }}
              </h3>
              <p class="text-xs text-secondary">{{ formatDate(page.lastEdited) }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const isClient = ref(false)
const isMobile = ref(false)
const videoEl = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  isClient.value = true
  isMobile.value = window.innerWidth < 768
  const onResize = () => { isMobile.value = window.innerWidth < 768 }
  window.addEventListener('resize', onResize)
  onUnmounted(() => window.removeEventListener('resize', onResize))
})

watchEffect(() => {
  if (videoEl.value) {
    videoEl.value.muted = true
    videoEl.value.play().catch(() => {})
  }
})

const searchQuery = ref('')

const { data: pages, pending, error } = await useAsyncData(
  'notion-docs',
  () => $fetch<{ id: string; title: string; lastEdited: string; cover: string | null }[]>('/api/notion/list')
)

const filteredPages = computed(() => {
  const list = pages.value ?? []
  if (!searchQuery.value.trim()) return list
  const q = searchQuery.value.toLowerCase()
  return list.filter(p => p.title.toLowerCase().includes(q))
})

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })
}

const gradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  'linear-gradient(135deg, #0f3460 0%, #533483 100%)',
  'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
  'linear-gradient(135deg, #370617 0%, #6a040f 100%)',
  'linear-gradient(135deg, #03071e 0%, #023e8a 100%)',
  'linear-gradient(135deg, #240046 0%, #3c096c 100%)',
]

function cardGradient(idx: number) {
  return gradients[idx % gradients.length]
}

function cardEmoji(title: string) {
  if (title.includes('Telegram') || title.includes('에러')) return '📬'
  if (title.includes('AI') || title.includes('Claude')) return '🤖'
  if (title.includes('SSE') || title.includes('챗봇')) return '💬'
  if (title.includes('SEO') || title.includes('sitemap') || title.includes('Sitemap')) return '🔍'
  if (title.includes('Nuxt') || title.includes('SSR')) return '⚡'
  if (title.includes('LCP') || title.includes('성능') || title.includes('image')) return '🚀'
  if (title.includes('HEIC') || title.includes('이미지')) return '🖼️'
  if (title.includes('Pinia') || title.includes('Store') || title.includes('cache')) return '🗄️'
  if (title.includes('장바구니')) return '🛒'
  if (title.includes('로그인') || title.includes('카카오')) return '🔑'
  if (title.includes('산소') || title.includes('차트')) return '📊'
  if (title.includes('앱') || title.includes('심사')) return '📱'
  if (title.includes('commit') || title.includes('husky')) return '🪝'
  if (title.includes('okhilda') || title.includes('또박')) return '💚'
  if (title.includes('드시모네')) return '🏊'
  return '📝'
}
</script>
