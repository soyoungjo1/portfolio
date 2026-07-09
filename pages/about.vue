<template>
  <div class="font-body-md text-on-background">

    <main class="pt-24 pb-40">

      <!-- Hero Section -->
      <section class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mb-20 lg:mb-32">
        <div class="relative w-full rounded-xl overflow-hidden mb-12 border border-outline-variant/20 shadow-sm" style="aspect-ratio: 21/9">
          <img
            alt="JSY Portfolio"
            class="w-full h-full object-cover grayscale brightness-90"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4rIqAEKK_nJHEbACybXWNgWp5-dPfXxn5lQjkj77Cr0OhnWWaEjoJErHQdy8-G2DZSg00Zly15v-UUTRcHfL7RMrNI1kwPXHB1xNVIxhIfNvIaFgTmc3aQ9cdVPUs36snjFMdVq5AXwKkDnIk7UBiMPNyQH-7ToH6lEmCvQseWavtPcYyyvtLrKm2qgt5MO1WK893qIPiN26DQkRAWuIZ9ecBWdSnO8ehpcVkjCzT7TzjdZbc25GGTqCKFWqtBivQNurh_RI0-4ee"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <!-- Caption -->
          <div class="absolute bottom-6 left-6 md:left-10 flex flex-col gap-1">
            <span class="font-label-sm text-[10px] text-white/60 uppercase tracking-widest">Seoul, KR</span>
            <span class="font-label-sm text-[10px] text-white/60 uppercase tracking-widest">Frontend Developer · since 2018</span>
          </div>
          <div class="absolute bottom-6 right-6 md:right-10 hidden md:flex flex-col items-end gap-1">
            <span class="font-label-sm text-[10px] text-white/60 uppercase tracking-widest">Design × Development</span>
            <span class="font-label-sm text-[10px] text-white/60 uppercase tracking-widest">조소영 / JSY</span>
          </div>
        </div>

        <div class="max-w-4xl">
          <h1 class="font-display-lg text-[40px] md:text-display-lg leading-[1.1] text-primary mb-6 tracking-tighter">
            Design ×<br class="hidden md:block" /> Development.
          </h1>
          <p class="font-body-lg text-body-lg text-secondary max-w-xl">
            디자인부터 개발까지,<br />
            웹의 처음부터 끝을 만드는 프론트엔드 개발자 조소영입니다.
          </p>
        </div>
      </section>

      <!-- Career Section -->
      <section class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mb-6">
        <div class="bg-surface-container-low rounded-3xl p-8 md:p-16 border border-outline-variant/20">

          <h2 class="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-12">
            Career
          </h2>

          <div class="space-y-0">
            <div
              v-for="(career, i) in careers"
              :key="i"
              class="flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-b border-outline-variant/10 last:border-0 last:pb-0 first:pt-0"
            >
              <!-- Left: period + company info -->
              <div class="md:w-52 shrink-0">
                <p class="font-label-sm text-[12px] uppercase tracking-widest text-secondary mb-3">{{ career.period }}</p>
                <h3 class="font-headline-md text-primary text-[22px] leading-tight mb-1">{{ career.company }}</h3>
                <p class="font-label-sm text-[13px] text-secondary">{{ career.role }}</p>
                <p class="font-label-sm text-[12px] text-on-surface-variant mt-0.5">{{ career.rank }} · {{ career.team }}</p>
              </div>

              <!-- Right: stacks + projects -->
              <div class="flex-1">
                <div class="flex flex-wrap gap-2 mb-6">
                  <span
                    v-for="s in career.stacks"
                    :key="s"
                    class="px-3 py-1.5 bg-white border border-outline-variant/20 rounded-full font-label-sm text-[12px] text-secondary"
                  >{{ s }}</span>
                </div>
                <ul class="space-y-2.5">
                  <li
                    v-for="proj in career.projects"
                    :key="proj.name"
                    class="flex items-start gap-3"
                  >
                    <span class="material-symbols-outlined text-[16px] text-secondary mt-0.5 shrink-0">arrow_forward</span>
                    <span class="font-body-md text-[15px] text-on-surface-variant leading-relaxed">{{ proj.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Chat Section -->
      <section class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mb-6">
        <div class="bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/20 shadow-lg flex flex-col" style="height: 520px;">

          <!-- Chat Header -->
          <div class="px-6 py-4 bg-surface-container-highest/40 backdrop-blur-md flex items-center justify-between border-b border-outline-variant/20 shrink-0">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <h3 class="font-label-sm text-label-sm text-primary uppercase tracking-widest">무엇이든 물어보세요</h3>
            </div>
            <span class="font-label-sm text-[10px] text-secondary">JSY AI</span>
          </div>

          <!-- Messages -->
          <div ref="chatWindowEl" class="flex-1 overflow-y-auto p-6 flex flex-col gap-5 chat-scroll">
            <div
              v-for="(msg, i) in messages"
              :key="i"
              class="flex flex-col gap-1.5"
              :class="msg.role === 'ai' ? 'self-start max-w-[85%]' : 'self-end max-w-[85%]'"
            >
              <div
                class="px-4 py-3 text-[14px] leading-relaxed"
                :class="msg.role === 'ai'
                  ? 'bg-primary text-on-primary rounded-2xl rounded-tl-none'
                  : 'bg-surface-container-high text-on-surface rounded-2xl rounded-tr-none border border-outline-variant/20'"
              >
                <!-- typing dots -->
                <template v-if="msg.typing">
                  <span class="inline-flex gap-1 items-center h-4">
                    <span class="typing-dot" /><span class="typing-dot" /><span class="typing-dot" />
                  </span>
                </template>
                <template v-else>
                  <span v-html="renderMarkdown(msg.text)" />
                </template>
              </div>
              <span class="font-label-sm text-[9px] text-secondary" :class="msg.role === 'user' ? 'text-right' : ''">
                {{ msg.role === 'ai' ? 'JSY AI' : '나' }}
              </span>
            </div>
          </div>

          <!-- Input Area -->
          <div class="p-4 bg-surface border-t border-outline-variant/20 shrink-0">
            <!-- Quick chips -->
            <div class="flex flex-wrap gap-2 mb-3">
              <button
                v-for="chip in quickChips"
                :key="chip"
                class="bg-surface-container text-secondary font-label-sm text-[11px] px-3 py-1.5 rounded-full border border-outline-variant/20 hover:text-primary hover:border-primary/30 transition-all disabled:opacity-40"
                :disabled="isStreaming"
                @click="sendChip(chip)"
              >{{ chip }}</button>
            </div>
            <!-- Input -->
            <form class="flex items-center gap-2 bg-surface-container rounded-2xl p-1.5 border border-outline-variant/20 focus-within:border-primary/40 transition-all" @submit.prevent="sendMessage">
              <input
                v-model="inputText"
                class="flex-1 bg-transparent border-none focus:ring-0 font-body-md text-[14px] text-on-surface placeholder:text-secondary px-3 py-1.5 outline-none disabled:opacity-40"
                :placeholder="isStreaming ? '답변 중...' : '질문을 입력하세요...'"
                :disabled="isStreaming"
                type="text"
              />
              <button
                class="w-9 h-9 bg-primary text-on-primary rounded-xl flex items-center justify-center hover:opacity-90 active:scale-90 transition-all shrink-0"
                type="submit"
              >
                <span class="material-symbols-outlined text-[18px]">arrow_upward</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      <!-- Skills Section -->
      <section class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div class="bg-surface-container-low rounded-3xl p-8 md:p-16 border border-outline-variant/20">

          <h2 class="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-12">
            Stack
          </h2>

          <div class="space-y-0">
            <div
              v-for="group in skillGroups"
              :key="group.label"
              class="flex flex-col md:flex-row md:items-start gap-3 md:gap-10 py-6 border-b border-outline-variant/10 last:border-0 last:pb-0 first:pt-0"
            >
              <div class="flex items-center gap-2 md:w-36 shrink-0">
                <span class="material-symbols-outlined text-[20px] text-secondary">{{ group.icon }}</span>
                <span class="font-label-sm text-[13px] uppercase tracking-widest text-secondary">{{ group.label }}</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="item in group.items"
                  :key="item"
                  class="px-3 py-1.5 bg-white border border-outline-variant/20 rounded-full font-label-sm text-[13px] text-primary"
                >{{ item }}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { careers } from '~/data/careers'
import { skillGroups } from '~/data/skills'

definePageMeta({ layout: 'default' })

/* ── Chat ──────────────────────────────────────────────────────── */
interface Message { role: 'ai' | 'user'; text: string; typing?: boolean }

const chatWindowEl = ref<HTMLElement | null>(null)
const inputText = ref('')
const messages = ref<Message[]>([
  { role: 'ai', text: '안녕하세요 👋 저는 조소영의 포트폴리오 AI입니다. 경력, 기술 스택, 프로젝트에 대해 무엇이든 물어보세요!' },
])

const quickChips = [
  '경력 소개해줘',
  '기술 스택이 뭐야?',
  '주요 프로젝트 알려줘',
  '연락은 어떻게 해?',
]

const isStreaming = ref(false)

/* ── Markdown 렌더러 ────────────────────────────────────────────── */
function renderMarkdown(text: string): string {
  return text
    // 헤더 ### ## # → 굵은 텍스트 블록
    .replace(/^#{1,3} (.+)$/gm, '<strong class="block mt-2 mb-0.5">$1</strong>')
    // 굵게 **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // 이탤릭 *text*
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // 불릿 리스트 - item
    .replace(/^[-•] (.+)$/gm, '<span class="flex gap-1.5"><span class="opacity-50 shrink-0">·</span><span>$1</span></span>')
    // 줄바꿈 (연속 빈 줄은 하나로)
    .replace(/\n{2,}/g, '\n')
    .replace(/\n/g, '<br>')
}

async function scrollToBottom() {
  await nextTick()
  if (chatWindowEl.value) chatWindowEl.value.scrollTop = chatWindowEl.value.scrollHeight
}

async function streamAiReply(userMessage: string) {
  if (isStreaming.value) return
  isStreaming.value = true

  // Add typing indicator
  messages.value.push({ role: 'ai', text: '', typing: true })
  await scrollToBottom()

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    })

    if (!response.ok) throw new Error('API error')

    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    const lastIdx = messages.value.length - 1

    // Switch from typing indicator to streaming text
    messages.value[lastIdx] = { role: 'ai', text: '', typing: false }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const lines = decoder.decode(value, { stream: true }).split('\n')
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const raw = line.slice(6)
        if (raw === '[DONE]') break
        try {
          const { text } = JSON.parse(raw)
          messages.value[lastIdx].text += text
          await scrollToBottom()
        } catch {}
      }
    }
  } catch {
    const lastIdx = messages.value.length - 1
    messages.value[lastIdx] = { role: 'ai', text: '오류가 발생했어요. 잠시 후 다시 시도해 주세요 🙏', typing: false }
  } finally {
    isStreaming.value = false
    await scrollToBottom()
  }
}

async function sendChip(chip: string) {
  messages.value.push({ role: 'user', text: chip })
  await scrollToBottom()
  await streamAiReply(chip)
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isStreaming.value) return
  inputText.value = ''
  messages.value.push({ role: 'user', text })
  await scrollToBottom()
  await streamAiReply(text)
}
</script>

<style scoped>
.chat-scroll::-webkit-scrollbar { width: 0; }
.chat-scroll { scrollbar-width: none; }

.typing-dot {
  width: 5px;
  height: 5px;
  background: currentColor;
  border-radius: 50%;
  display: inline-block;
  animation: typingBounce 1.4s infinite ease-in-out both;
}
.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typingBounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
  40%           { transform: scale(1); opacity: 1; }
}
</style>
