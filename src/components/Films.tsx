import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Modal, makeStyles, Backdrop, Fade } from '@material-ui/core';

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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Films() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const films = JSON.parse(queryParams.get('films') || '[]');

  const [filmIndex, setFilmIndex] = React.useState(0);
  const [film, setFilm] = React.useState<Film | null>(null);
  const [open, setOpen] = React.useState(true); // Estado para controlar la apertura y cierre del modal

  const navigate = useNavigate(); // Historial de navegación de React Router

  React.useEffect(() => {
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
    setOpen(false); // Cerrar el modal estableciendo el estado de "open" en false
    navigate(-1); // Regresar al componente anterior utilizando la función goBack() del historial de navegación
  };

  const classes = useStyles();

  if (!film) {
    return null;
  }

  return (
    <Modal
      open={open} // Utilizar el estado "open" para controlar la apertura y cierre del modal
      onClose={handleClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
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
      </Fade>
    </Modal>
  );
}

export default Films;
