import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Modal, Backdrop, Fade} from '@material-ui/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {stylesModal} from '../utils/Styles';
import CustomButton from './CustomButton';
import { fetchFilm } from '../hooks/api';
import { Film } from '../models';

function Films() {
  const { search } = useLocation();
  const classes = stylesModal();
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
        <Typography variant="h4" component="h2" className={classes.tittle}>
          {film.title}
        </Typography>
        <Typography className={classes.subtittle}>Director: {film.director}</Typography>
        <Typography  className={classes.subtittle}>Release Date: {film.release_date}</Typography>
        <Typography className={classes.p}>{film.opening_crawl}</Typography>
        <div style={{ marginTop: '50px', textAlign: 'center' }}>

        {filmIndex > 0 && (
          <CustomButton onClick={handlePreviousFilm}>
            <ArrowBackIosIcon />
          </CustomButton>
        )}
        {filmIndex < films.length - 1 && (
          <CustomButton onClick={handleNextFilm}>
            <ArrowForwardIosIcon />
          </CustomButton>
        )}
        </div>
      </Container>
    </div>
      </Fade>
    </Modal>
  );
}

export default Films;
