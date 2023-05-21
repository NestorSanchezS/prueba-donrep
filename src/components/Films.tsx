import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Modal, makeStyles, Backdrop, Fade, Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ColorGreen } from '../utils/constans';
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
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    maxWidth: 600,
    margin: '0 auto',
    marginTop: 20,
  }
})
);

function Films() {
  const { search } = useLocation();
  const classes = useStyles();
  const queryParams = new URLSearchParams(search);
  const films = JSON.parse(queryParams.get('films') || '[]');

  const [filmIndex, setFilmIndex] = React.useState(0);
  const [film, setFilm] = React.useState<Film | null>(null);
  const [open, setOpen] = React.useState(true); 

  const navigate = useNavigate();

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
    setOpen(false);
    navigate(-1); 
  };


  if (!film) {
    return null;
  }

  return (
    <Modal
      open={open} 
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
        <div style={{ marginTop: '50px', textAlign: 'center' }}>

        {filmIndex > 0 && (
          <Button onClick={handlePreviousFilm} style={{color: ColorGreen}}>
            <ArrowBackIosIcon />
          </Button>
        )}
        {filmIndex < films.length - 1 && (
          <Button onClick={handleNextFilm} style={{color: ColorGreen}}>
            <ArrowForwardIosIcon />
          </Button>
        )}
        </div>
      </Container>
    </div>
      </Fade>
    </Modal>
  );
}

export default Films;
