import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: articles } = await supabase.from('articles').select('*')

  return (
    <ul>
      {articles?.map((article) => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  )
}