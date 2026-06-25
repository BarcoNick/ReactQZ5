import React from 'react'
import { useMovies } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'

export default function Home() {
  const { movies, loading, error } = useMovies()

  if (loading) return <div className="center">Loading…</div>
  if (error) return <div className="center">Error: {error}</div>

  return (
    <main>
      <div className="container header-row">
        <h2>TV Series</h2>
        <div className="search-row">
          <input className="search big" placeholder="Search for TV series" />
        </div>
      </div>
      <div className="container grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </main>
  )
}
