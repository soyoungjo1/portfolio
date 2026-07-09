export interface SkillGroup {
  label: string
  icon: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    icon: 'code',
    items: ['Vue 3', 'Nuxt 3 (SSR)', 'TypeScript', 'JavaScript', 'Pinia', 'Vuetify 3', 'SCSS', 'Swiper', 'GSAP', 'VueUse'],
  },
  {
    label: 'Prior',
    icon: 'history_edu',
    items: ['HTML5', 'CSS3', 'jQuery', 'Photoshop', 'Illustrator', 'After Effects'],
  },
  {
    label: 'Test / DX',
    icon: 'science',
    items: ['Vitest', '@vue/test-utils', 'Husky', 'commitlint', 'Vite'],
  },
  {
    label: 'Analytics',
    icon: 'analytics',
    items: ['Amplitude', 'Airbridge', 'FlareLane', 'GTM', 'Facebook Pixel', 'Kakao Pixel', 'Naver WCS'],
  },
  {
    label: 'Tools',
    icon: 'handyman',
    items: ['Git', 'Figma', 'Jira', 'Axios', 'DayJS', 'DOMPurify'],
  },
  {
    label: 'AI Collab',
    icon: 'smart_toy',
    items: ['Claude Code', 'Multi-agent Pipeline', 'MCP', 'Prompt Engineering', 'Claude API'],
  },
]
