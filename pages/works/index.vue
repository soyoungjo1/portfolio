<template>
  <div class="font-body-md text-body-md">
    <main class="w-full">

      <!-- Hero Section -->
      <section class="relative w-full bg-primary-container overflow-hidden md:[aspect-ratio:21/9]">
        <video
          v-if="isClient && isMobile"
          ref="videoEl"
          class="w-full h-auto block md:absolute md:inset-0 md:h-full md:object-cover"
          autoplay muted loop playsinline preload="auto"
          src="/images/main_m.mp4"
        />
        <video
          v-else-if="isClient"
          ref="videoEl"
          class="w-full h-auto block md:absolute md:inset-0 md:h-full md:object-cover"
          autoplay muted loop playsinline preload="auto"
          src="/images/main.mp4"
        />
        <img
          v-else
          class="w-full h-full object-cover grayscale opacity-80"
          alt="JSY Portfolio"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4fcRSDMZQMC-h8r58dtGTrYSBDtpCoUxzIdxQ7E2_3_R7HMC7kBOeZEIq_6sHkhwWaHGzkPgO3UYqSjxQ0_D9BKGHd8EDKHqU-UUaP98FsJ4VEQHpCAjqW5SbrcG1ecId3LSTGijwoLAKZZrJCe5VhgDq-3VYSzwRKi12BSo6KDHEMLJIVCsmSN6Oa88xIFwERQEycyvdFJt0n0c9rJdyWuebNTFm79Y3dRKdaPUh3vTV7RuGz1WqECcWAhKlea0lu8u6KJe2VuLO"
        />
      </section>

      <!-- Content -->
      <section class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">

        <!-- Header -->
        <div class="mb-8">
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">포트폴리오</span>
          <h2 class="font-headline-xl text-2xl md:text-4xl text-primary font-bold mt-1 leading-tight">프로젝트 및 작업물</h2>
        </div>

        <!-- Category Tabs -->
        <div class="flex gap-2 mb-10 p-1.5 bg-surface-container-low rounded-2xl w-fit">
          <button
            class="px-8 py-3 rounded-xl font-label-sm text-sm uppercase tracking-widest transition-all duration-200"
            :class="activeTab === 'dev' ? 'bg-primary text-on-primary shadow-sm' : 'text-secondary hover:text-primary'"
            @click="setTab('dev')"
          >
            Dev
          </button>
          <button
            class="px-8 py-3 rounded-xl font-label-sm text-sm uppercase tracking-widest transition-all duration-200"
            :class="activeTab === 'web' ? 'bg-primary text-on-primary shadow-sm' : 'text-secondary hover:text-primary'"
            @click="setTab('web')"
          >
            Web
          </button>
          <button
            class="px-8 py-3 rounded-xl font-label-sm text-sm uppercase tracking-widest transition-all duration-200"
            :class="activeTab === 'visual' ? 'bg-primary text-on-primary shadow-sm' : 'text-secondary hover:text-primary'"
            @click="setTab('visual')"
          >
            Visual
          </button>
        </div>

        <!-- Dev Grid -->
        <div v-show="activeTab === 'dev'" class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <NuxtLink
            v-for="(project, i) in devProjects"
            :key="project.id"
            :to="`/works/web/${project.id}`"
            class="bento-card group relative bg-surface-container overflow-hidden flex flex-col justify-end cursor-pointer"
            :class="isWide(i) ? 'col-span-1 md:col-span-2' : ''"
            :style="{ aspectRatio: isWide(i) ? '16/9' : '4/5' }"
          >
            <img
              :src="thumbUrl(project.thumb)"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-50 group-hover:brightness-75 scale-105 group-hover:scale-100"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div class="relative z-10 p-6 md:p-8">
              <div class="flex items-center gap-2 mb-3 flex-wrap">
                <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-label-sm text-[10px] uppercase tracking-wider">
                  {{ project.type }}
                </span>
                <span class="font-label-sm text-[10px] text-white/50 uppercase tracking-widest">{{ project.year }}</span>
              </div>
              <h3 class="font-headline-xl text-xl md:text-2xl text-white font-bold leading-tight">{{ project.title }}</h3>
              <p class="font-label-sm text-[11px] text-white/60 uppercase tracking-wider mt-1">{{ project.company }}</p>
              <p v-if="isWide(i)" class="text-white/70 text-sm mt-2 max-w-lg line-clamp-2">{{ project.description }}</p>
            </div>
          </NuxtLink>
        </div>

        <!-- Web Grid -->
        <div v-show="activeTab === 'web'" class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <NuxtLink
            v-for="(project, i) in webOnlyProjects"
            :key="project.id"
            :to="`/works/web/${project.id}`"
            class="bento-card group relative bg-surface-container overflow-hidden flex flex-col justify-end cursor-pointer"
            :class="isWide(i) ? 'col-span-1 md:col-span-2' : ''"
            :style="{ aspectRatio: isWide(i) ? '16/9' : '4/5' }"
          >
            <img
              :src="thumbUrl(project.thumb)"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-50 group-hover:brightness-75 scale-105 group-hover:scale-100"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div class="relative z-10 p-6 md:p-8">
              <div class="flex items-center gap-2 mb-3 flex-wrap">
                <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-label-sm text-[10px] uppercase tracking-wider">
                  {{ project.type }}
                </span>
                <span class="font-label-sm text-[10px] text-white/50 uppercase tracking-widest">{{ project.year }}</span>
              </div>
              <h3 class="font-headline-xl text-xl md:text-2xl text-white font-bold leading-tight">{{ project.title }}</h3>
              <p class="font-label-sm text-[11px] text-white/60 uppercase tracking-wider mt-1">{{ project.company }}</p>
              <p v-if="isWide(i)" class="text-white/70 text-sm mt-2 max-w-lg line-clamp-2">{{ project.description }}</p>
            </div>
          </NuxtLink>
        </div>

        <!-- Visual Grid -->
        <div v-show="activeTab === 'visual'" class="grid grid-cols-2 gap-4 md:gap-6">
          <NuxtLink
            v-for="(project, i) in visualProjects"
            :key="project.id"
            :to="`/works/visual/${project.id}`"
            class="bento-card group relative bg-surface-container overflow-hidden flex flex-col justify-end cursor-pointer"
            :class="isWide(i) ? 'col-span-2' : ''"
            :style="{ aspectRatio: isWide(i) ? '16/9' : '1/1' }"
          >
            <img
              :src="thumbUrl(project.thumb)"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-50 group-hover:brightness-75 scale-105 group-hover:scale-100"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div class="relative z-10 p-5 md:p-6">
              <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-label-sm text-[10px] uppercase tracking-wider mb-2">
                {{ project.type }}
              </span>
              <h3 class="font-headline-xl text-base md:text-xl text-white font-bold leading-tight">{{ project.title }}</h3>
              <p class="font-label-sm text-[10px] text-white/50 uppercase tracking-widest mt-1">{{ project.client }} · {{ project.year }}</p>
            </div>
          </NuxtLink>
        </div>

      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { webProjects } from '~/data/webProjects'
import { visualProjects } from '~/data/visualProjects'

definePageMeta({ layout: 'default' })

const thumbUrl = useThumbUrl()

const isClient = ref(false)
const isMobile = ref(false)
const videoEl = ref<HTMLVideoElement | null>(null)

const route = useRoute()
const router = useRouter()

type Tab = 'dev' | 'web' | 'visual'
const validTabs: Tab[] = ['dev', 'web', 'visual']

const activeTab = computed<Tab>(() => {
  const q = route.query.tab as string
  return validTabs.includes(q as Tab) ? (q as Tab) : 'dev'
})

function setTab(tab: Tab) {
  router.replace({ query: { tab } })
}

const devProjects = computed(() => webProjects.filter(p => p.category === 'dev'))
const webOnlyProjects = computed(() => webProjects.filter(p => p.category === 'web'))

onMounted(async () => {
  isMobile.value = window.innerWidth < 768
  isClient.value = true
  await nextTick()
  if (videoEl.value) {
    videoEl.value.muted = true
    videoEl.value.play().catch(() => {})
  }
  const onResize = () => { isMobile.value = window.innerWidth < 768 }
  window.addEventListener('resize', onResize)
  onUnmounted(() => window.removeEventListener('resize', onResize))
})

function isWide(index: number) {
  return (index + 1) % 3 === 0
}
</script>

<style scoped>
.bento-card {
  border-radius: 32px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.bento-card:hover {
  transform: scale(0.98);
}
</style>
