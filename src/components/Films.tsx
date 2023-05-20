import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Modal } from '@material-ui/core';

interface Film {
  title: string;
  opening_crawl: string;
  director: string;
  release_date: string;
}

async function fetchFilm(url: string): Promise<Film> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function Films() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const films = JSON.parse(queryParams.get('films') || '[]');

  const [filmIndex, setFilmIndex] = useState(0);
  const [film, setFilm] = useState<Film | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true); // Variable de estado para controlar la apertura y el cierre del modal

  useEffect(() => {
    const fetchAndSetFilm = async () => {
      if (filmIndex >= 0 && filmIndex < films.length) {
        const fetchedFilm = await fetchFilm(films[filmIndex]);
        setFilm(fetchedFilm);
      }
    };

    fetchAndSetFilm();
  }, [filmIndex, films]);

  const handleNextFilm = () => {
    setFilmIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousFilm = () => {
    setFilmIndex((prevIndex) => prevIndex - 1);
  };

  const handleClose = () => {
    setIsModalOpen(false); // Actualiza la variable de estado para cerrar el modal
    setFilm(null);
  };

  if (!film) {
    return null;
  }

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <div>
        <Container>
          <Typography variant="h4" component="h2">
            {film.title}
          </Typography>
          <Typography color="textSecondary">Director: {film.director}</Typography>
          <Typography color="textSecondary">Release Date: {film.release_date}</Typography>
          <Typography>{film.opening_crawl}</Typography>
          {filmIndex > 0 && (
            <button onClick={handlePreviousFilm}>Previous Film</button>
          )}
          {filmIndex < films.length - 1 && (
            <button onClick={handleNextFilm}>Next Film</button>
          )}
        </Container>
      </div>
    </Modal>
  );
}

export default Films;
