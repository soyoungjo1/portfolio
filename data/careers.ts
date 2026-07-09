export interface Project {
  name: string
}

export interface Career {
  period: string
  company: string
  role: string
  rank: string
  team: string
  stacks: string[]
  projects: Project[]
}

export const careers: Career[] = [
  {
    period: '2023.09 — Present',
    company: '㈜헥토헬스케어',
    role: 'Frontend Developer',
    rank: '선임연구원',
    team: '서비스운영팀',
    stacks: ['Vue 3', 'Nuxt 3 (SSR)', 'TypeScript', 'Pinia', 'Vuetify 3', 'SCSS', 'Vite', 'Amplitude', 'Airbridge', 'Sentry'],
    projects: [
      { name: '드시모네몰 — 헬스케어 이커머스 (PC·모바일 웹·앱 웹뷰) 프론트엔드 단독 설계·구현. PHP → Vue 3 SPA → Nuxt 3 SSR → UI/UX 전면 개편 4단계 기술 전환 주도' },
      { name: '결제 9종 · 정기구독 · VIP 라운지 · 마이페이지 · 상품상세 · CS AI 챗봇(SSE) 등 전 영역 구현' },
      { name: '앱 웹뷰 — 스토어·영양제분석·섭취알람·포인트교환소(36회+ 운영). 네이티브 앱팀 협업, 산소지수 차트 Vue+CSS 직접 구현' },
      { name: '백엔드 6명과 도메인 분리 협업(Swagger), 기획리뷰 → 개발 → QA 프로세스' },
    ],
  },
  {
    period: '2021.09 — 2023.09',
    company: '㈜아이스크림미디어',
    role: 'Frontend Developer',
    rank: '대리',
    team: '커머스 운영팀',
    stacks: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Photoshop', 'Illustrator', 'After Effects'],
    projects: [
      { name: '교사 대상 교육 커머스몰 프론트엔드 운영·개발 (상품·기획전·결제 화면)' },
      { name: '사내 어드민·관리자 도구 UI 퍼블리싱 + 기능 연결 (지출 증빙·입점사 페이지 등)' },
      { name: '기획전·상세페이지 제작, 시즌 배너·로고 GIF 모션그래픽 (After Effects)' },
    ],
  },
  {
    period: '2018.11 — 2021.08',
    company: '올하우㈜',
    role: '웹디자이너 · 퍼블리셔',
    rank: '사원',
    team: '웹개발팀',
    stacks: ['HTML5', 'CSS3', 'jQuery', 'Photoshop', 'Illustrator'],
    projects: [
      { name: '중소기업 홈페이지 17개 — 기획→디자인→퍼블→납품 1인 풀사이클 (제조·산업재·협동조합·병원·교육 등)' },
      { name: 'PHP CMS 어드민 연동, 도메인·FTP 배포·호스팅 관리, 견적 산출·고객 응대' },
    ],
  },
]
