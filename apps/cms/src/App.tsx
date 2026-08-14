import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function getArticles() {
      const { data: articles } = await supabase.from('articles').select()
      setArticles(articles)
    }

    getArticles()
  }, [])

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  )
}