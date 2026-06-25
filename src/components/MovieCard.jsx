import React from "react";
import { useMovies } from "../context/MovieContext";
import savedTrue from "../assets/Saved_True.svg";
import savedFalse from "../assets/Saved_False.svg";

export default function MovieCard({ movie }) {
  const { saved, toggleSave } = useMovies();
  const isSaved = saved.find((m) => m.id === movie.id);

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img src={movie.image} alt={movie.title} className="poster" />
        <button
          className={"save-btn " + (isSaved ? "saved" : "")}
          aria-label="save"
          onClick={() => toggleSave(movie)}
        >
          <img
            src={isSaved ? savedTrue : savedFalse}
            alt={isSaved ? "Saved" : "Save"}
            className="save-icon"
          />
        </button>
      </div>
      <div className="meta">
        <h3 className="title">{movie.title}</h3>
        <p className="info">
          {movie.category} • {movie.year}
        </p>
      </div>
    </article>
  );
}
