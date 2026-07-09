export function useThumbUrl() {
  const { public: { imgBase } } = useRuntimeConfig()

  return (thumb: string | undefined | null): string => {
    if (!thumb) return ''
    if (thumb.startsWith('/')) return thumb          // public/ 직접 경로 (/images/sync/ 등)
    if (thumb.startsWith('auto/')) return `${imgBase}/${thumb.slice(5)}`
    return `${imgBase}/${thumb}`
  }
}
