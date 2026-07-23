<template>
  <div class="font-body-md text-on-background">
    <main class="pt-24 pb-32 md:pb-40">

      <!-- Back nav + Hero -->
      <section class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mb-12 lg:mb-20">
        <NuxtLink
          :to="`/works?tab=${project.category}`"
          class="inline-flex items-center gap-2 mb-8 text-secondary hover:text-primary font-label-sm text-[12px] uppercase tracking-widest transition-colors"
        >
          <span class="material-symbols-outlined text-base">arrow_back</span>
          Back to Works
        </NuxtLink>

        <div
          class="relative w-full rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm"
          style="aspect-ratio: 16/9"
        >
          <img
            :src="thumbUrl(project.banner ?? project.thumb)"
            :alt="project.title"
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 brightness-90"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div class="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 flex flex-col gap-2">
            <span class="font-label-sm text-[10px] text-white/60 uppercase tracking-widest">
              {{ project.company }} · {{ project.year }}
            </span>
            <h1 class="font-display-lg text-3xl md:text-5xl text-white font-bold leading-tight tracking-tight">
              {{ project.title }}
            </h1>
            <p class="font-label-sm text-sm text-white/70">{{ project.titleEn }}</p>
          </div>
        </div>
      </section>

      <!-- Body -->
      <section class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="bg-surface-container-low rounded-3xl p-8 md:p-16 border border-outline-variant/20">
          <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16">

            <!-- Meta column -->
            <aside class="space-y-6">
              <div>
                <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-2">Type</p>
                <p class="font-body-md text-primary">{{ project.type }}</p>
              </div>
              <div>
                <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-2">Year</p>
                <p class="font-body-md text-primary">{{ project.year }}</p>
              </div>
              <div>
                <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-2">Company</p>
                <p class="font-body-md text-primary">{{ project.company }}</p>
              </div>
              <div>
                <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-2">Stack</p>
                <div class="flex gap-2 flex-wrap">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="inline-block px-3 py-1 bg-surface-container text-on-surface rounded-full font-label-sm text-[11px]"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-3 bg-primary text-on-primary rounded-full font-label-sm text-[12px] uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Visit Site
                <span class="material-symbols-outlined text-base">north_east</span>
              </a>
            </aside>

            <!-- Description -->
            <div>
              <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-4">Overview</p>
              <p class="font-body-md text-body-md text-on-surface leading-relaxed whitespace-pre-line">
                {{ project.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 주요 구현 (Highlights) -->
      <section v-if="project.sections?.length" class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mt-6">
        <div class="bg-surface-container-low rounded-3xl p-8 md:p-16 border border-outline-variant/20">
          <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-8">Highlights</p>
          <div class="space-y-10">
            <div v-for="sec in project.sections" :key="sec.title">
              <h3 class="font-headline-md text-lg md:text-xl text-primary font-bold mb-4">{{ sec.title }}</h3>
              <ul class="space-y-2.5">
                <li
                  v-for="(item, i) in sec.items"
                  :key="i"
                  class="flex gap-3 font-body-md text-body-md text-on-surface leading-relaxed"
                >
                  <span class="text-secondary mt-1 shrink-0">—</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Mockup Images -->
      <section v-if="project.mockups?.length" class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mt-6">
        <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-6">Mockup</p>
        <div class="space-y-4">
          <img
            v-for="(img, i) in project.mockups"
            :key="i"
            :src="thumbUrl(img)"
            :alt="`${project.title} mockup ${i + 1}`"
            class="w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <!-- Slides Carousel -->
      <section v-if="project.slides?.length" class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mt-10">
        <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-6">Gallery</p>
        <div class="swiper-container relative">
          <div ref="swiperEl" class="swiper">
            <div class="swiper-wrapper">
              <div
                v-for="(img, i) in project.slides"
                :key="i"
                class="swiper-slide"
              >
                <img
                  :src="thumbUrl(img)"
                  :alt="`${project.title} slide ${i + 1}`"
                  class="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div class="swiper-pagination mt-4" />
          </div>
          <button class="swiper-btn swiper-btn-prev" aria-label="Previous">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="swiper-btn swiper-btn-next" aria-label="Next">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { webProjects, type WebProject } from '~/data/webProjects'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

definePageMeta({
  layout: 'default',
  key: route => route.fullPath,
})

const route = useRoute()
const id = String(route.params.id)

const project = webProjects.find(p => p.id === id) as WebProject | undefined

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: '프로젝트를 찾을 수 없습니다.',
    fatal: true,
  })
}

const thumbUrl = useThumbUrl()

const swiperEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (swiperEl.value && project.slides?.length) {
    new Swiper(swiperEl.value, {
      modules: [Navigation, Pagination],
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.swiper-btn-prev',
        nextEl: '.swiper-btn-next',
      },
      breakpoints: {
        768: {
          slidesPerView: 1.5,
          spaceBetween: 24,
        },
      },
    })
  }
})

useHead({
  title: `${project.title} — JSY Portfolio`,
  meta: [
    { name: 'description', content: project.description },
  ],
})
</script>

<style scoped>
.swiper-container {
  padding: 0 0 40px;
}
.swiper {
  height: 600px;
}
@media (max-width: 768px) {
  .swiper {
    height: 360px;
  }
}
.swiper-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.swiper-btn:hover {
  opacity: 0.8;
}
.swiper-btn-prev {
  left: -8px;
}
.swiper-btn-next {
  right: -8px;
}
.swiper-slide {
  height: auto;
}
</style>
