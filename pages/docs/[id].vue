<template>
  <div class="font-body-md text-on-surface min-h-screen">
    <main class="pt-32 pb-48 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">

      <!-- Loading -->
      <div v-if="pending" class="space-y-4 max-w-2xl">
        <div class="h-3 w-24 rounded bg-surface-container-highest animate-pulse" />
        <div class="h-8 w-80 rounded bg-surface-container-highest animate-pulse" />
        <div class="mt-12 space-y-3">
          <div v-for="i in 8" :key="i" class="h-4 rounded bg-surface-container-highest animate-pulse" />
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-secondary font-body-md p-4">
        문서를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </div>

      <!-- Content -->
      <template v-else-if="data">

        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 mb-8">
          <NuxtLink to="/docs" class="text-[11px] font-mono text-secondary hover:text-primary transition-colors tracking-widest uppercase">docs</NuxtLink>
          <span class="text-[11px] font-mono text-outline-variant">/</span>
          <span class="text-[11px] font-mono text-on-surface tracking-widest uppercase truncate max-w-xs">{{ data.title }}</span>
        </nav>

        <!-- Page Header -->
        <div class="mb-12 pb-8 border-b border-outline-variant/30">
          <div class="flex items-center gap-4">
            <span v-if="data.icon?.type === 'emoji'" class="text-4xl leading-none">{{ data.icon.emoji }}</span>
            <img v-else-if="data.icon?.type === 'external'" :src="data.icon.external?.url" class="w-9 h-9 object-contain rounded" alt="" />
            <h1 class="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary leading-tight">
              {{ data.title }}
            </h1>
          </div>
          <p class="mt-3 text-[12px] text-secondary font-mono tracking-wider">
            {{ formatDate(data.lastEdited) }}
          </p>
        </div>

        <!-- Blocks -->
        <div class="blocks-body max-w-2xl">
          <template v-for="block in data.blocks" :key="block.id">

            <!-- Paragraph -->
            <div
              v-if="block.type === 'paragraph' && block.paragraph?.rich_text?.length"
              class="nb-paragraph"
              v-html="renderRichText(block.paragraph.rich_text)"
            />
            <!-- Empty paragraph = spacer -->
            <div v-else-if="block.type === 'paragraph'" class="nb-spacer" />

            <!-- Heading 1 -->
            <h2
              v-else-if="block.type === 'heading_1'"
              class="nb-h1"
              v-html="renderRichText(block.heading_1?.rich_text || [], 'inline')"
            />

            <!-- Heading 2 -->
            <h3
              v-else-if="block.type === 'heading_2'"
              class="nb-h2"
              v-html="renderRichText(block.heading_2?.rich_text || [], 'inline')"
            />

            <!-- Heading 3 -->
            <h4
              v-else-if="block.type === 'heading_3'"
              class="nb-h3"
              v-html="renderRichText(block.heading_3?.rich_text || [], 'inline')"
            />

            <!-- Bulleted List -->
            <div v-else-if="block.type === 'bulleted_list_item'" class="nb-li-wrap">
              <span class="nb-bullet">—</span>
              <span v-html="renderRichText(block.bulleted_list_item?.rich_text || [], 'inline')" />
            </div>

            <!-- Numbered List -->
            <div v-else-if="block.type === 'numbered_list_item'" class="nb-li-wrap">
              <span class="nb-bullet nb-num">·</span>
              <span v-html="renderRichText(block.numbered_list_item?.rich_text || [], 'inline')" />
            </div>

            <!-- To Do -->
            <div v-else-if="block.type === 'to_do'" class="nb-todo">
              <span class="todo-check" :class="{ 'is-done': block.to_do?.checked }">
                {{ block.to_do?.checked ? '✓' : '○' }}
              </span>
              <span :class="{ 'todo-done': block.to_do?.checked }" v-html="renderRichText(block.to_do?.rich_text || [], 'inline')" />
            </div>

            <!-- Toggle -->
            <div v-else-if="block.type === 'toggle'" class="nb-toggle">
              <button class="toggle-head" @click="toggleBlock(block.id)">
                <span class="toggle-icon" :class="{ open: isOpen(block.id) }">▶</span>
                <span v-html="renderRichText(block.toggle?.rich_text || [], 'inline')" />
              </button>
            </div>

            <!-- Quote -->
            <blockquote
              v-else-if="block.type === 'quote'"
              class="nb-quote"
              v-html="renderRichText(block.quote?.rich_text || [], 'inline')"
            />

            <!-- Callout -->
            <div v-else-if="block.type === 'callout'" class="nb-callout">
              <div v-if="block.callout?.icon" class="callout-icon">
                <span v-if="block.callout.icon.type === 'emoji'">{{ block.callout.icon.emoji }}</span>
              </div>
              <div v-html="renderRichText(block.callout?.rich_text || [], 'inline')" />
            </div>

            <!-- Divider -->
            <div v-else-if="block.type === 'divider'" class="nb-divider" />

            <!-- Code block (dedicated code type) -->
            <div v-else-if="block.type === 'code'" class="nb-code">
              <div class="code-header">
                <span class="code-lang">{{ block.code?.language || 'plain' }}</span>
                <button class="code-copy" @click="copyCode(block)">
                  {{ copiedId === block.id ? 'copied!' : 'copy' }}
                </button>
              </div>
              <pre class="code-pre"><code>{{ getCodeText(block.code?.rich_text || []) }}</code></pre>
            </div>

            <!-- Child Page (sub-page link) -->
            <div v-else-if="block.type === 'child_page'" class="nb-child-page">
              <NuxtLink :to="`/docs/${block.id}`" class="child-page-link">
                <span class="material-symbols-outlined child-page-icon">description</span>
                <span class="child-page-title">{{ block.child_page?.title || '제목 없음' }}</span>
                <span class="material-symbols-outlined child-page-arrow">arrow_forward</span>
              </NuxtLink>
            </div>

            <!-- Image -->
            <figure v-else-if="block.type === 'image' && getImageUrl(block)" class="nb-figure">
              <img :src="getImageUrl(block)!" :alt="getCaption(block, 'image')" class="nb-image" loading="lazy" />
              <figcaption v-if="getCaption(block, 'image')" class="nb-caption">{{ getCaption(block, 'image') }}</figcaption>
            </figure>

            <!-- Video -->
            <figure v-else-if="block.type === 'video' && getVideoUrl(block)" class="nb-figure">
              <video :src="getVideoUrl(block)!" controls class="nb-video" />
            </figure>

            <!-- File -->
            <div v-else-if="block.type === 'file' && getFileUrl(block)" class="nb-file">
              <a :href="getFileUrl(block)!" target="_blank" rel="noopener noreferrer" class="file-link">
                <span class="material-symbols-outlined text-sm">download</span>
                <span>{{ getCaption(block, 'file') || block.file?.name || '파일 다운로드' }}</span>
              </a>
            </div>

            <!-- Embed -->
            <div v-else-if="block.type === 'embed' && block.embed?.url" class="nb-embed">
              <iframe :src="block.embed.url" class="embed-frame" frameborder="0" allowfullscreen />
            </div>

          </template>
        </div>

        <!-- Back link -->
        <div class="mt-16 pt-8 border-t border-outline-variant/30">
          <NuxtLink to="/docs" class="inline-flex items-center gap-2 text-[12px] font-mono text-secondary hover:text-primary transition-colors tracking-widest uppercase">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            Back to Docs
          </NuxtLink>
        </div>

      </template>

    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const id = route.params.id as string

const { data, pending, error } = await useAsyncData(
  `notion-doc-${id}`,
  () => $fetch<{
    id: string
    title: string
    icon: any
    lastEdited: string
    blocks: any[]
  }>(`/api/notion/${id}`)
)

const openToggles = ref<Set<string>>(new Set())
const copiedId = ref<string | null>(null)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })
}

/* ── Rich Text → HTML ─────────────────────────────────────────────────────── */

/**
 * Pre-process rich_text array into render segments.
 * Adjacent code-annotated spans (with optional newline-only text between them)
 * are merged into a single 'code' segment so they render as one code block.
 */
type Seg = { kind: 'code'; content: string } | { kind: 'text'; item: any }

function segmentRichText(richText: any[]): Seg[] {
  const segs: Seg[] = []
  let i = 0

  while (i < richText.length) {
    const t = richText[i]
    if (t.annotations?.code) {
      // Collect consecutive code spans (allow bare-newline gaps between them)
      let content = t.plain_text ?? ''
      let j = i + 1
      while (j < richText.length) {
        const nx = richText[j]
        if (nx.annotations?.code) {
          content += nx.plain_text ?? ''
          j++
        } else {
          // bare whitespace/newline gap — include only if next item is also code
          const isGap = /^\n+$/.test(nx.plain_text ?? '')
          if (isGap && j + 1 < richText.length && richText[j + 1].annotations?.code) {
            content += nx.plain_text ?? ''
            j++
          } else {
            break
          }
        }
      }
      segs.push({ kind: 'code', content })
      i = j
    } else {
      segs.push({ kind: 'text', item: t })
      i++
    }
  }
  return segs
}

/**
 * Render a segment list to HTML.
 * mode 'block'  — multi-line code → <pre><code>
 * mode 'inline' — all code stays inline <code>
 */
function renderRichText(richText: any[], mode: 'block' | 'inline' = 'block'): string {
  const segs = segmentRichText(richText)
  let html = ''

  for (const seg of segs) {
    if (seg.kind === 'code') {
      const raw = seg.content
      if (mode === 'block' && raw.includes('\n')) {
        html += `<pre class="emb-code"><code>${escHtml(raw)}</code></pre>`
      } else {
        html += `<code class="t-code">${escHtml(raw).replace(/\n/g, '<br>')}</code>`
      }
      continue
    }

    // text segment
    const t = seg.item
    const raw: string = t.plain_text ?? ''
    const a = t.annotations ?? {}

    let chunk = escHtml(raw).replace(/\n/g, '<br>')

    if (a.bold)          chunk = `<strong>${chunk}</strong>`
    if (a.italic)        chunk = `<em>${chunk}</em>`
    if (a.underline)     chunk = `<span class="t-underline">${chunk}</span>`
    if (a.strikethrough) chunk = `<span class="t-strike">${chunk}</span>`
    if (t.href) chunk = `<a href="${escAttr(t.href)}" target="_blank" rel="noopener noreferrer" class="nb-link">${chunk}</a>`

    html += chunk
  }

  return html
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escAttr(s: string): string {
  return s.replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

/* ── Code block helpers ───────────────────────────────────────────────────── */
function getCodeText(richText: any[]): string {
  return richText.map((t: any) => t.plain_text ?? '').join('')
}

async function copyCode(block: any) {
  const text = block.type === 'code'
    ? getCodeText(block.code?.rich_text || [])
    : ''
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = block.id
    setTimeout(() => { copiedId.value = null }, 1500)
  } catch {}
}

/* ── Media helpers ────────────────────────────────────────────────────────── */
function getImageUrl(block: any): string | null {
  return block.image?.type === 'file'     ? block.image.file?.url
       : block.image?.type === 'external' ? block.image.external?.url
       : null
}
function getVideoUrl(block: any): string | null {
  return block.video?.type === 'file'     ? block.video.file?.url
       : block.video?.type === 'external' ? block.video.external?.url
       : null
}
function getFileUrl(block: any): string | null {
  return block.file?.type === 'file'     ? block.file.file?.url
       : block.file?.type === 'external' ? block.file.external?.url
       : null
}
function getCaption(block: any, key: string): string {
  return (block[key]?.caption ?? []).map((t: any) => t.plain_text).join('') || ''
}

/* ── Toggle ───────────────────────────────────────────────────────────────── */
function toggleBlock(id: string) {
  if (openToggles.value.has(id)) openToggles.value.delete(id)
  else openToggles.value.add(id)
}
function isOpen(id: string) { return openToggles.value.has(id) }
</script>

<style scoped>
/* ── paragraph ────────────────────────────────────────── */
.nb-paragraph {
  font-size: 15px;
  line-height: 1.9;
  color: var(--color-on-surface, #1c1b1f);
  margin: 0 0 0.6em;
  word-break: break-word;
}
/* empty paragraph = vertical spacer */
.nb-spacer { height: 0.9em; }

/* ── headings ─────────────────────────────────────────── */
.nb-h1 {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary, #1a1a2e);
  margin: 2.4em 0 0.6em;
  letter-spacing: -0.025em;
  line-height: 1.25;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.nb-h2 {
  font-size: 19px;
  font-weight: 600;
  color: var(--color-on-surface, #1c1b1f);
  margin: 2em 0 0.5em;
  letter-spacing: -0.02em;
  line-height: 1.35;
}
.nb-h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-on-surface, #1c1b1f);
  margin: 1.6em 0 0.4em;
  line-height: 1.4;
}

/* ── list items ───────────────────────────────────────── */
.nb-li-wrap {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;
  line-height: 1.85;
  margin-bottom: 0.3em;
  padding-left: 4px;
}
.nb-bullet {
  font-family: monospace;
  font-size: 12px;
  color: #bbb;
  flex-shrink: 0;
  margin-top: 4px;
}

/* ── to do ────────────────────────────────────────────── */
.nb-todo {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 0.4em;
  font-size: 15px;
  line-height: 1.85;
}
.todo-check {
  font-family: monospace;
  font-size: 12px;
  color: #888;
  flex-shrink: 0;
  margin-top: 4px;
}
.todo-done {
  text-decoration: line-through;
  color: #ccc;
}

/* ── toggle ───────────────────────────────────────────── */
.nb-toggle { margin-bottom: 0.8em; }
.toggle-head {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  font-size: 15px;
  line-height: 1.85;
  width: 100%;
}
.toggle-icon {
  font-size: 9px;
  color: #888;
  flex-shrink: 0;
  margin-top: 6px;
  transition: transform 0.2s;
}
.toggle-icon.open { transform: rotate(90deg); }

/* ── quote ────────────────────────────────────────────── */
.nb-quote {
  margin: 0 0 1.2em;
  padding: 12px 20px;
  border-left: 2px solid var(--color-on-surface, #1c1b1f);
  font-size: 15px;
  line-height: 1.85;
  color: #888;
  font-style: italic;
}

/* ── callout ──────────────────────────────────────────── */
.nb-callout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 8px;
  margin-bottom: 1.2em;
  font-size: 14px;
  line-height: 1.8;
}
.callout-icon {
  font-size: 18px;
  flex-shrink: 0;
  line-height: 1.6;
}

/* ── divider ──────────────────────────────────────────── */
.nb-divider {
  height: 1px;
  background: rgba(0,0,0,0.1);
  margin: 2em 0;
}

/* ── dedicated code block ─────────────────────────────── */
.nb-code {
  margin-bottom: 1.5em;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
}
.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #1a1a1a;
  border-bottom: 1px solid #2a2a2a;
}
.code-lang {
  font-family: monospace;
  font-size: 10px;
  color: #666;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.code-copy {
  font-family: monospace;
  font-size: 10px;
  color: #555;
  background: none;
  border: 1px solid #333;
  padding: 2px 8px;
  cursor: pointer;
  letter-spacing: 0.06em;
  border-radius: 3px;
  transition: color 0.15s, border-color 0.15s;
}
.code-copy:hover { color: #ccc; border-color: #555; }
.code-pre {
  margin: 0;
  padding: 20px 16px;
  background: #111;
  overflow-x: auto;
}
.code-pre code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #d4d4d4;
  white-space: pre;
  display: block;
}

/* ── embedded code blocks (from inline annotations) ──── */
:deep(.emb-code) {
  margin: 0.8em 0 1em;
  padding: 16px;
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  overflow-x: auto;
}
:deep(.emb-code code) {
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #d4d4d4;
  white-space: pre;
  display: block;
}

/* ── child page ───────────────────────────────────────── */
.nb-child-page {
  margin: 0.4em 0;
}
.child-page-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 8px;
  text-decoration: none;
  color: var(--color-on-surface, #1c1b1f);
  font-size: 14px;
  transition: background 0.15s, border-color 0.15s;
}
.child-page-link:hover {
  background: rgba(0,0,0,0.03);
  border-color: rgba(0,0,0,0.18);
}
.child-page-icon {
  font-size: 18px;
  color: #888;
  flex-shrink: 0;
}
.child-page-title {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.child-page-arrow {
  font-size: 16px;
  color: #ccc;
  flex-shrink: 0;
  transition: transform 0.15s;
}
.child-page-link:hover .child-page-arrow {
  transform: translateX(3px);
  color: #888;
}

/* ── image / video ────────────────────────────────────── */
.nb-figure {
  margin: 0 0 1.5em;
  display: flex;
  flex-direction: column;
}
.nb-image {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}
.nb-video {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}
.nb-caption {
  margin-top: 8px;
  font-family: monospace;
  font-size: 11px;
  color: #bbb;
  letter-spacing: 0.04em;
}

/* ── file ─────────────────────────────────────────────── */
.nb-file { margin-bottom: 1em; }
.file-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: monospace;
  font-size: 12px;
  color: #888;
  border: 1px solid rgba(0,0,0,0.1);
  padding: 8px 14px;
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.15s, border-color 0.15s;
}
.file-link:hover { color: var(--color-on-surface, #1c1b1f); border-color: rgba(0,0,0,0.3); }

/* ── embed ────────────────────────────────────────────── */
.nb-embed { margin-bottom: 1.5em; }
.embed-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 8px;
}

/* ── inline text styles (used inside v-html) ──────────── */
:deep(.t-code) {
  font-family: monospace;
  font-size: 0.88em;
  background: rgba(0,0,0,0.06);
  padding: 1px 5px;
  border-radius: 3px;
  color: #c0392b;
}
:deep(.t-underline) { text-decoration: underline; text-underline-offset: 3px; }
:deep(.t-strike)    { text-decoration: line-through; }
:deep(.nb-link) {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: #ccc;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.15s;
}
:deep(.nb-link:hover) { text-decoration-color: currentColor; }
</style>
