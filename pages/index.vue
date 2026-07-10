<template>
  <div class="font-body-md text-body-md">

    <!-- Main -->
    <main class="w-full pt-0">

      <!-- Hero Section -->
      <section class="relative w-full bg-primary-container overflow-hidden md:aspect-[21/9]">
        <!-- Mobile video — static src so iOS native autoplay fires -->
        <video
          v-if="isClient && isMobile"
          ref="videoEl"
          class="w-full h-auto block md:absolute md:inset-0 md:h-full md:object-cover"
          autoplay muted loop playsinline preload="auto"
          src="/images/main_m.mp4"
        />
        <!-- Desktop video -->
        <video
          v-else-if="isClient"
          ref="videoEl"
          class="w-full h-auto block md:absolute md:inset-0 md:h-full md:object-cover"
          autoplay muted loop playsinline preload="auto"
          src="/images/main.mp4"
        />
        <!-- SSR fallback -->
        <img
          v-else
          class="w-full h-auto block md:absolute md:inset-0 md:h-full md:object-cover grayscale opacity-80"
          alt="JSY Portfolio Showreel"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4fcRSDMZQMC-h8r58dtGTrYSBDtpCoUxzIdxQ7E2_3_R7HMC7kBOeZEIq_6sHkhwWaHGzkPgO3UYqSjxQ0_D9BKGHd8EDKHqU-UUaP98FsJ4VEQHpCAjqW5SbrcG1ecId3LSTGijwoLAKZZrJCe5VhgDq-3VYSzwRKi12BSo6KDHEMLJIVCsmSN6Oa88xIFwERQEycyvdFJt0n0c9rJdyWuebNTFm79Y3dRKdaPUh3vTV7RuGz1WqECcWAhKlea0lu8u6KJe2VuLO"
        >
      </section>

      <!-- Content Grid -->
      <section class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">

        <div class="mb-12">
          <h2 class="font-display-lg text-4xl md:text-display-lg uppercase leading-none">Content</h2>
        </div>

        <!-- Masonry Grid -->
        <div class="masonry-grid">

          <!-- Card 1: About (Tall Image) -->
          <NuxtLink to="/about" class="col-span-1 row-span-2 md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-xl bg-surface-container cursor-pointer">
            <img
              alt="About JSY"
              class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANzNNw7RQ42tJjcbpIec0tXTQQoIBln6QgAbGe3rIQ34je3bCasfOE_83bqjExAelSHJi49dPMLWQ4e7fhw63rFszH90f2mZOc4Ee5TPbAFXguBsRHTfrEm2OqFruSoUQkNoRmvLCj9OjBTDqhADVNtf4EigMONDNpOjgGVkMAHp50ZbRsmide1ZURk21SkEQytPDlRzR-5zQmDRZZwqdZKY84TPobo5VlmX6GaR3DFvXCh06oOjf5BZmM6hARXKpMN7xTBIzre-si"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute inset-0 p-6 flex flex-col justify-between">
              <div class="flex justify-between items-start">
                <span class="text-white/80 font-label-sm text-[11px] leading-tight uppercase">Frontend Dev<br>Designer</span>
                <span class="material-symbols-outlined text-white/80 text-xl">north_east</span>
              </div>
              <h3 class="text-white font-headline-xl text-2xl md:text-3xl leading-tight uppercase font-extrabold tracking-tighter">About<br>JSY</h3>
            </div>
          </NuxtLink>

          <!-- Card 2: Works Web -->
          <NuxtLink to="/works" class="card-text group">
            <div class="flex justify-between items-start">
              <span class="text-on-surface-variant font-label-sm text-[11px] uppercase">Web Development</span>
              <span class="material-symbols-outlined text-on-surface-variant text-xl">north_east</span>
            </div>
            <h3 class="card-title">Web<br>Works</h3>
          </NuxtLink>

          <!-- Card 3: Works Visual -->
          <NuxtLink to="/works" class="card-text group">
            <div class="flex justify-between items-start">
              <span class="text-on-surface-variant font-label-sm text-[11px] uppercase">Visual Design</span>
              <span class="material-symbols-outlined text-on-surface-variant text-xl">north_east</span>
            </div>
            <h3 class="card-title">Visual<br>Works</h3>
          </NuxtLink>

          <!-- Card 4: Docs -->
          <NuxtLink to="/docs" class="card-text group">
            <div class="flex justify-between items-start">
              <span class="text-on-surface-variant font-label-sm text-[11px] uppercase">Archive</span>
              <span class="material-symbols-outlined text-on-surface-variant text-xl">north_east</span>
            </div>
            <h3 class="card-title">Docs</h3>
          </NuxtLink>

          <!-- Card 5: Contact (Wide Image) -->
          <NuxtLink to="/contact" class="col-span-1 md:col-span-4 relative group overflow-hidden rounded-xl bg-surface-container min-h-[220px] cursor-pointer">
            <img
              alt="Contact"
              class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmWDddi2O2DEtnJgSEIX1BcEf3MFcGUgHIatSNQ4a7e8UTu0m9y1YouNjd-T4thBzCnko3S1ON4pSx-v3s3Ok5XhlsMCbpM78hEjAspRi8wQUb7QkBWAZPDxPllgpX0nvH4c1cwZFm4JPTs5Qk0V3J6hcAob6XebLonFOo8RJqZJR02vGX7o1Fh6x7LH2GbJ6sE3Dgn_L3ihQbeYPfXP3ByBEstuNAX4qhZjk8pD4sRcL2lpPWFB3851CBn-QRk49KNEFKxnN-y70d"
            >
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div class="absolute inset-0 p-6 flex flex-col justify-between">
              <div class="flex justify-between items-start">
                <span class="text-white font-label-sm text-[11px] uppercase">Get in touch</span>
                <span class="material-symbols-outlined text-white text-xl">north_east</span>
              </div>
              <h3 class="text-white font-headline-xl text-2xl uppercase font-extrabold tracking-tighter">Contact</h3>
            </div>
          </NuxtLink>

        </div>

        <!-- Web Projects Scroll -->
        <div class="mt-16 mb-12">
          <div class="flex items-center justify-between mb-6 px-1">
            <h3 class="font-label-sm text-label-sm uppercase tracking-widest">Web Projects</h3>
            <NuxtLink
              to="/works"
              class="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-1"
            >
              More
              <span class="material-symbols-outlined text-sm">north_east</span>
            </NuxtLink>
          </div>
          <div class="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory" style="scrollbar-width: none;">

            <!-- 드시모네몰 -->
            <NuxtLink to="/works/web/desimone" class="project-card relative overflow-hidden bg-[#1c1c1c]">
              <img
                alt="드시모네몰"
                class="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                src="/images/sync/desimone-thumb.png"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
              <div class="relative z-20 flex flex-col justify-between h-full">
                <div class="flex justify-between items-start">
                  <span class="font-label-sm text-[11px] text-white/50 uppercase">헥토헬스케어</span>
                  <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-white text-sm">north_east</span>
                  </div>
                </div>
                <div>
                  <p class="font-label-sm text-[11px] text-white/40 uppercase mb-2">2023– · E-Commerce</p>
                  <h4 class="font-headline-md text-2xl leading-tight text-white">드시모네몰</h4>
                </div>
              </div>
            </NuxtLink>

            <!-- 아이스크림몰 -->
            <NuxtLink to="/works/web/iscreammall" class="project-card relative overflow-hidden bg-[#1a1f1f]">
              <img
                alt="아이스크림몰"
                class="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                src="/images/sync/iscreammall-thumb.png"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
              <div class="relative z-20 flex flex-col justify-between h-full">
                <div class="flex justify-between items-start">
                  <span class="font-label-sm text-[11px] text-white/50 uppercase">아이스크림미디어</span>
                  <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-white text-sm">north_east</span>
                  </div>
                </div>
                <div>
                  <p class="font-label-sm text-[11px] text-white/40 uppercase mb-2">2021–23 · Platform</p>
                  <h4 class="font-headline-md text-2xl leading-tight text-white">아이스크림몰</h4>
                </div>
              </div>
            </NuxtLink>

            <!-- 아이스크림콜 -->
            <NuxtLink to="/works/web/icall" class="project-card relative overflow-hidden bg-surface-container">
              <img
                alt="아이스크림콜"
                class="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                :src="`${imgBase}/web_list1_icall.jpg`"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
              <div class="relative z-20 flex flex-col justify-between h-full">
                <div class="flex justify-between items-start">
                  <span class="font-label-sm text-[11px] text-white/50 uppercase">아이스크림미디어</span>
                  <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-white text-sm">north_east</span>
                  </div>
                </div>
                <div>
                  <p class="font-label-sm text-[11px] text-white/40 uppercase mb-2">2021 · Web + App</p>
                  <h4 class="font-headline-md text-2xl leading-tight text-white">아이스크림콜</h4>
                </div>
              </div>
            </NuxtLink>

            <!-- 리트젠 -->
            <NuxtLink to="/works/web/lichtzen" class="project-card relative overflow-hidden bg-surface-container">
              <img
                alt="리트젠"
                class="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                :src="`${imgBase}/web_list3_lichtzen.jpg`"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
              <div class="relative z-20 flex flex-col justify-between h-full">
                <div class="flex justify-between items-start">
                  <span class="font-label-sm text-[11px] text-white/50 uppercase">올하우</span>
                  <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-white text-sm">north_east</span>
                  </div>
                </div>
                <div>
                  <p class="font-label-sm text-[11px] text-white/40 uppercase mb-2">2019 · Website</p>
                  <h4 class="font-headline-md text-2xl leading-tight text-white">(주)리트젠</h4>
                </div>
              </div>
            </NuxtLink>

            <!-- 정화폴리테크 -->
            <NuxtLink to="/works/web/jeongwha" class="project-card relative overflow-hidden bg-surface-container">
              <img
                alt="정화폴리테크"
                class="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                :src="`${imgBase}/web_list4_jeongwha.jpg`"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
              <div class="relative z-20 flex flex-col justify-between h-full">
                <div class="flex justify-between items-start">
                  <span class="font-label-sm text-[11px] text-white/50 uppercase">올하우</span>
                  <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-white text-sm">north_east</span>
                  </div>
                </div>
                <div>
                  <p class="font-label-sm text-[11px] text-white/40 uppercase mb-2">2019 · Website</p>
                  <h4 class="font-headline-md text-2xl leading-tight text-white">정화폴리테크</h4>
                </div>
              </div>
            </NuxtLink>

          </div>
        </div>

      </section>
    </main>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { public: { imgBase } } = useRuntimeConfig()
const isClient = ref(false)
const isMobile = ref(false)
const videoEl = ref<HTMLVideoElement | null>(null)

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
</script>

<style scoped>
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 12px;
}

@media (min-width: 768px) {
  .masonry-grid {
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
  }
}

/* Article card: text-only content cards (cards 2–4) — add 'group' in HTML */
.card-text {
  @apply col-span-1 md:col-span-4 p-6 bg-white flex flex-col justify-between rounded-xl border border-outline-variant/10 cursor-pointer hover:bg-surface-container transition-colors;
}

/* Active Projects scrollable cards — bg color applied per card */
.project-card {
  @apply flex-none w-[280px] md:w-[320px] rounded-xl p-6 flex flex-col justify-between min-h-[380px] snap-start border border-black/5 hover:shadow-lg transition-shadow duration-300 overflow-hidden relative;
}

/* Card title shared by cards 2–4 (font-display-lg = Hanken Grotesk) */
.card-title {
  @apply text-primary text-2xl md:text-4xl leading-tight uppercase font-extrabold tracking-tighter mt-8;
  font-family: "Hanken Grotesk", sans-serif;
}
</style>
