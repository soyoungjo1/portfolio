export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const headers = {
    Authorization: `Bearer ${config.notionToken}`,
    'Notion-Version': '2022-06-28',
  }

  const res = await $fetch<{ results: any[] }>(
    `https://api.notion.com/v1/blocks/${config.notionRootPageId}/children?page_size=100`,
    { headers }
  )

  const pages = res.results.filter((b: any) => b.type === 'child_page')

  // 각 페이지 cover 병렬 조회
  const pageDetails = await Promise.all(
    pages.map((b: any) =>
      $fetch<any>(`https://api.notion.com/v1/pages/${b.id}`, { headers }).catch(() => null)
    )
  )

  return pages.map((b: any, i: number) => {
    const detail = pageDetails[i]
    const cover = detail?.cover
    let coverUrl: string | null = null
    if (cover?.type === 'external') coverUrl = cover.external.url
    else if (cover?.type === 'file') coverUrl = cover.file.url

    return {
      id: b.id,
      title: b.child_page.title,
      lastEdited: b.last_edited_time,
      cover: coverUrl,
    }
  })
})
