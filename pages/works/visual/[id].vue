<template>
  <div class="font-body-md text-on-background">
    <main class="pt-24 pb-32 md:pb-40">

      <!-- Back nav + Hero -->
      <section class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mb-12 lg:mb-20">
        <NuxtLink
          to="/works?tab=visual"
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
            :src="thumbUrl(project.thumb)"
            :alt="project.title"
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 brightness-90"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div class="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 flex flex-col gap-2">
            <span class="font-label-sm text-[10px] text-white/60 uppercase tracking-widest">
              {{ project.client }} · {{ project.year }}
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
                <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-2">Client</p>
                <p class="font-body-md text-primary">{{ project.client }}</p>
              </div>
              <div>
                <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-2">Tools</p>
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

      <!-- Sections -->
      <template v-if="project.sections?.length">
        <section
          v-for="(section, si) in project.sections"
          :key="si"
          class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mt-10"
        >
          <!-- Section title -->
          <p v-if="section.title" class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-6">
            {{ section.title }}
          </p>

          <!-- Mockups -->
          <div v-if="section.mockups?.length" class="space-y-4 mb-8">
            <p v-if="!section.title" class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-6">Mockup</p>
            <img
              v-for="(img, i) in section.mockups"
              :key="i"
              :src="thumbUrl(img)"
              :alt="`${project.title} mockup ${i + 1}`"
              class="w-full rounded-2xl object-cover"
            />
          </div>

          <!-- TYPE B: thumbnail grid → click → modal -->
          <div v-if="section.items?.length" class="mt-6">
            <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-4">Gallery</p>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <button
                v-for="(item, ii) in section.items"
                :key="ii"
                class="gallery-thumb group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer"
                @click="openModal([item.full])"
              >
                <img
                  :src="thumbUrl(item.thumb)"
                  :alt="item.title ?? `${project.title} ${ii + 1}`"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-3xl">zoom_in</span>
                </div>
              </button>
            </div>
          </div>

          <!-- TYPE C: bulk "전체 보기" button -->
          <div v-if="section.bulkImages?.length" class="mt-6">
            <p v-if="!section.items?.length" class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-4">Gallery</p>
            <button
              class="gallery-thumb group relative overflow-hidden rounded-xl cursor-pointer w-full max-w-xs"
              style="aspect-ratio: 3/4"
              @click="openModal(section.bulkImages!)"
            >
              <img
                v-if="section.bulkThumb"
                :src="thumbUrl(section.bulkThumb)"
                :alt="`${project.title} 전체 보기`"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex flex-col items-center justify-center gap-2">
                <span class="material-symbols-outlined text-white text-4xl">collections</span>
                <span class="font-label-sm text-[12px] text-white uppercase tracking-widest">
                  전체 보기 ({{ section.bulkImages.length }})
                </span>
              </div>
            </button>
          </div>

          <!-- GIF Grid (no modal) -->
          <div v-if="section.gifGrid?.length" class="mt-6">
            <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-4">Animation</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                v-for="(gif, gi) in section.gifGrid"
                :key="gi"
                class="flex flex-col items-center gap-2"
              >
                <div class="w-full rounded-xl overflow-hidden bg-surface-container aspect-square flex items-center justify-center p-4">
                  <img
                    :src="thumbUrl(gif.src)"
                    :alt="gif.title"
                    class="max-w-full max-h-full object-contain"
                  />
                </div>
                <span class="font-label-sm text-[11px] text-secondary">{{ gif.title }}</span>
              </div>
            </div>
          </div>
        </section>
      </template>

    </main>

    <!-- Modal Overlay -->
    <Teleport to="body">
      <div
        v-if="modalActive"
        class="modal-overlay"
        @click.self="closeModal"
      >
        <button class="modal-close" @click="closeModal" aria-label="닫기">
          <span class="material-symbols-outlined">close</span>
        </button>
        <div class="modal-scroll">
          <img
            v-for="(img, i) in modalImages"
            :key="i"
            :src="thumbUrl(img)"
            :alt="`이미지 ${i + 1}`"
            class="modal-img"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { visualProjects, type VisualProject } from '~/data/visualProjects'

definePageMeta({
  layout: 'default',
  key: route => route.fullPath,
})

const route = useRoute()
const id = String(route.params.id)

const project = visualProjects.find(p => p.id === id) as VisualProject | undefined

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: '프로젝트를 찾을 수 없습니다.',
    fatal: true,
  })
}

const thumbUrl = useThumbUrl()

const modalActive = ref(false)
const modalImages = ref<string[]>([])

function openModal(images: string[]) {
  modalImages.value = images
  modalActive.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  modalActive.value = false
  document.body.style.overflow = ''
}

onUnmounted(() => {
  document.body.style.overflow = ''
})

useHead({
  title: `${project.title} — JSY Portfolio`,
  meta: [
    { name: 'description', content: project.description },
  ],
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 60px 16px 40px;
}

.modal-close {
  position: fixed;
  top: 16px;
  right: 20px;
  z-index: 10000;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

.modal-scroll {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.modal-img {
  width: 100%;
  border-radius: 12px;
  display: block;
}

.gallery-thumb {
  border: none;
  padding: 0;
  background: none;
}
</style>
