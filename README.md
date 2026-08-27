# JSY Portfolio

포트폴리오 사이트. Nuxt 3 SSR 기반으로 프로젝트·경력·기술 블로그를 담았고, About 페이지에는 이력 기반으로 답변하는 AI 챗봇을 붙였다.

## Stack

- **Framework** Nuxt 3 (SSR) · Vue 3 · TypeScript
- **Style** Tailwind CSS · SCSS
- **Content** Notion API 연동(기술 블로그) · Claude API(About AI 챗봇, SSE)
- **etc** Swiper · Resend(문의 메일)

## 구조

| 경로 | 설명 |
|---|---|
| `pages/` | index / about / works(dev·web·visual) / docs / contact |
| `components/` | 공통 헤더·네비·푸터 |
| `composables/` | `useThumbUrl` 등 |
| `data/` | 프로젝트·경력·스킬 정적 데이터 |
| `server/api/` | Notion 목록·상세, About 챗봇(SSE), 문의 메일 |

## 개발

```bash
npm install
cp .env.example .env   # 키 채우기
npm run dev
```

## 환경변수

`.env.example` 참고. Notion 토큰·Claude 키·메일(Resend) 키 등은 서버 런타임에서만 사용하며 클라이언트 번들에 노출되지 않는다.
