export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  const headers = {
    Authorization: `Bearer ${config.notionToken}`,
    'Notion-Version': '2022-06-28',
  }

  const [page, blocks] = await Promise.all([
    $fetch<any>(`https://api.notion.com/v1/pages/${id}`, { headers }),
    $fetch<{ results: any[] }>(`https://api.notion.com/v1/blocks/${id}/children?page_size=100`, { headers }),
  ])

  const title =
    page.properties?.title?.title?.[0]?.plain_text ||
    page.child_page?.title ||
    'Untitled'

  return {
    id,
    title,
    icon: page.icon ?? null,
    lastEdited: page.last_edited_time,
    blocks: blocks.results,
  }
})
