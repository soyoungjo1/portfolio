<template>
  <div class="font-body-md text-on-surface">

    <main class="pt-32 pb-48 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">

      <!-- Hero Section -->
      <section class="mb-24">
        <h1 class="font-display-lg text-[64px] md:text-display-lg uppercase tracking-tight text-primary leading-none mb-4">
          CONTACT
        </h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
          문의, 협업, 그리고 의견 교환을 위한 공식 채널입니다. 프로젝트나 함께할 작업에 대해 편하게 연락 주세요.
        </p>
      </section>

      <!-- Main Content: Form & Info -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-gutter items-start">

        <!-- Contact Form -->
        <div class="md:col-span-7 bg-surface-container-low rounded-xl p-8 md:p-12 border border-outline-variant/20">
          <form class="space-y-8" @submit.prevent="handleSubmit">

            <div class="group">
              <label class="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-3 transition-all group-focus-within:text-primary" for="name">이름</label>
              <input
                id="name"
                v-model="form.name"
                class="form-field"
                placeholder="성함을 입력해주세요"
                required
                type="text"
              />
            </div>

            <div class="group">
              <label class="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-3 transition-all group-focus-within:text-primary" for="email">이메일</label>
              <input
                id="email"
                v-model="form.email"
                class="form-field"
                placeholder="회신 받으실 이메일 주소"
                required
                type="email"
              />
            </div>

            <div class="group">
              <label class="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-3 transition-all group-focus-within:text-primary" for="message">메시지</label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-field resize-none"
                placeholder="프로젝트나 문의 내용을 간단히 적어주세요"
                required
                rows="4"
              ></textarea>
            </div>

            <p v-if="errorMsg" class="font-body-md text-sm text-red-500">{{ errorMsg }}</p>

            <div class="pt-4">
              <button
                class="font-label-sm text-label-sm uppercase py-5 px-12 rounded-full transition-all flex items-center gap-4 group disabled:cursor-not-allowed"
                :class="submitted
                  ? 'bg-green-600 text-white'
                  : 'bg-primary text-on-primary hover:opacity-90 active:scale-[0.98]'"
                type="submit"
                :disabled="submitting || submitted"
              >
                <template v-if="submitted">
                  <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                  전송 완료
                </template>
                <template v-else-if="submitting">
                  전송 중...
                </template>
                <template v-else>
                  문의 보내기
                  <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </template>
              </button>
            </div>

          </form>
        </div>

        <!-- Side Info & Socials -->
        <div class="md:col-span-4 md:col-start-9 space-y-16 mt-8 md:mt-0">

          <!-- Direct Contact -->
          <div>
            <h3 class="font-label-sm text-label-sm uppercase text-on-surface-variant mb-6 border-b border-outline-variant/30 pb-2">직접 연락</h3>
            <p class="font-headline-md text-[22px] text-primary mb-2 break-all">whthdud9628@gmail.com</p>
            <p class="font-body-md text-on-surface-variant">Seoul, KR · Remote 가능</p>
          </div>

          <!-- Social Platforms -->
          <div>
            <h3 class="font-label-sm text-label-sm uppercase text-on-surface-variant mb-6 border-b border-outline-variant/30 pb-2">소셜</h3>
            <ul class="space-y-4">
              <li v-for="social in socials" :key="social.label">
                <a
                  class="flex items-center justify-between group py-2 hover:translate-x-1 transition-transform"
                  :href="social.href"
                  target="_blank"
                  rel="noopener"
                >
                  <span class="flex items-center gap-4">
                    <span class="material-symbols-outlined text-on-surface-variant">{{ social.icon }}</span>
                    <span class="font-headline-md text-[20px] text-primary">{{ social.label }}</span>
                  </span>
                  <span class="material-symbols-outlined text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">north_east</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Decorative Image Card -->
          <div class="relative h-[300px] rounded-xl overflow-hidden group">
            <img
              alt="Architectural space"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxITAh88BmTIEKyaE9TbESOt-ROIZANId3Lw4sUJ4i5lk5xcrW6BcE83jsvzCFcVRawpkWfaNeuHwjdSHZkGO_eZwMiz98NLCX0bpq7kFu7_1JiVlRIEp5j8WA6uPPPDl-FeQSI7mVb_J06oXSNclxRlMKUNwc-j-BA7lkLCzbTxeVLr_EmWd1Gm78adlv6maRcwqxvR7db7slj23vFLvgzSvI-BdXPFImVPqLmAUhj2GOt-mrFlvbg4d19hwk_xj3xBeyDNm18l83"
            >
            <div class="absolute inset-0 bg-primary/20 backdrop-blur-[2px] p-6 flex flex-col justify-end">
              <span class="text-white font-label-sm text-label-sm uppercase tracking-widest opacity-80">Studio</span>
              <span class="text-white font-headline-md text-[24px]">서울 · Remote</span>
            </div>
          </div>

        </div>
      </div>
    </main>


  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

interface FormData {
  name: string
  email: string
  message: string
}

const form = reactive<FormData>({ name: '', email: '', message: '' })
const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref('')

const socials = [
  { label: 'GitHub',   icon: 'code',        href: 'https://github.com/' },
  { label: 'Notion',   icon: 'description', href: '#' },
  { label: 'LinkedIn', icon: 'work',        href: '#' },
]

async function handleSubmit() {
  errorMsg.value = ''
  submitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { name: form.name, email: form.email, message: form.message },
    })
    submitted.value = true
    Object.assign(form, { name: '', email: '', message: '' })
  } catch (err: any) {
    errorMsg.value = err?.data?.message || err?.statusMessage || '전송에 실패했습니다. 잠시 후 다시 시도해주세요.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form-field {
  @apply w-full bg-transparent border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-primary placeholder:text-outline-variant transition-all outline-none text-primary;
  font-family: "Hanken Grotesk", sans-serif;
  font-size: 22px;
  line-height: 1.3;
}
</style>
