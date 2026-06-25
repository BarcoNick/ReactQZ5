import React from 'react'
import logoIcon from '../assets/Logo.svg'
import libraryIcon from '../assets/Library.svg'
import moviesIcon from '../assets/Movies.svg'
import tvIcon from '../assets/Tv Shows.svg'
import savedIcon from '../assets/Saved.svg'

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-hidden>
      <div className="brand">
        <img src={logoIcon} alt="Brand logo" />
      </div>
      <nav className="side-nav">
        <button className="icon" aria-label="library">
          <img src={libraryIcon} alt="Library" />
        </button>
        <button className="icon" aria-label="movies">
          <img src={moviesIcon} alt="Movies" />
        </button>
        <button className="icon active" aria-label="tv shows">
          <img src={tvIcon} alt="TV Shows" />
        </button>
        <button className="icon" aria-label="saved">
          <img src={savedIcon} alt="Saved" />
        </button>
      </nav>
      <div className="profile">S</div>
    </aside>
  )
}
