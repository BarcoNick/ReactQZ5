import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const MovieContext = createContext()

const DATA_URL = 'https://raw.githubusercontent.com/lomsadze123/movie-api/refs/heads/main/data.json'

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedMovies') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    let mounted = true
    setLoading(true)
    axios
      .get(DATA_URL)
      .then((res) => {
        if (!mounted) return
        // Map API shape to app-friendly fields and assign stable ids
        const data = (res.data || []).map((item, idx) => ({
          id: item.id || `${item.title.replace(/\s+/g, '-').toLowerCase()}-${idx}`,
          title: item.title,
          year: item.year,
          category: item.category || item.type || 'Unknown',
          rating: item.rating,
          isBookmarked: !!item.isBookmarked,
          isTrending: !!item.isTrending,
          image:
            (item.thumbnail && item.thumbnail.regular && (item.thumbnail.regular.medium || item.thumbnail.regular.small || item.thumbnail.regular.large)) || item.image || '',
          raw: item,
        }))
        setMovies(data)
        setError(null)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message || 'Failed to load')
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('savedMovies', JSON.stringify(saved))
    } catch {}
  }, [saved])

  function toggleSave(movie) {
    setSaved((prev) => {
      const exists = prev.find((m) => m.id === movie.id)
      if (exists) return prev.filter((m) => m.id !== movie.id)
      return [...prev, movie]
    })
  }

  return (
    <MovieContext.Provider value={{ movies, loading, error, saved, toggleSave }}>
      {children}
    </MovieContext.Provider>
  )
}

export function useMovies() {
  return useContext(MovieContext)
}

export default MovieContext
