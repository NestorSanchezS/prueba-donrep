import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {  Container, Grid } from '@material-ui/core';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import CustomButton from '../components/CustomButton';
import CardComponent from '../components/CustomCard';
import Loading from '../components/Loading';
import {Person} from '../models/index';
import { usePeople } from '../hooks/api';


function PeopleList(): JSX.Element {
  
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  let page = parseInt(queryParams.get('page') || '1');

  const {people, isLoading} = usePeople(page);
  
  const [favorites, setFavorites] = useState<Person[]>([]);


  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleViewFilms = (films: string[]) => {
    navigate(`/films?films=${encodeURIComponent(JSON.stringify(films))}`);
  };

const handleToggleFavorite = (name: string) => {
  setFavorites((prevFavorites) => {
    const isAlreadyFavorite = prevFavorites.some((favorite) => favorite.name === name);
    if (isAlreadyFavorite) {
      return prevFavorites.filter((favorite) => favorite.name !== name);
    } else {
      const person = people && people.find((person) => person.name === name);
      if (person) {
        return [...prevFavorites, person];
      } else {
        return prevFavorites;
      }
    }
  });
};

  const isFavorite = (name: string) => favorites.some((favorite) => favorite.name === name);

  const handlePreviousPage = () => {
    if (page > 1) {
      page--;
      navigate(`?page=${page}`);
    }
  };

  const handleNextPage = () => {
    if (people && people.length > 0) {
      page++;
      navigate(`?page=${page}`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {people &&
          people.map((person) => (
            <CardComponent key={person.name}
            person={person}
            isFavorite={isFavorite}
            onToggleFavorite={() => handleToggleFavorite(person.name)}
            onViewFilms={handleViewFilms}/>
          ))}
      </Grid>
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        {page > 1 && (
          <CustomButton  onClick={handlePreviousPage}>
            <ArrowBackIosIcon />
          </CustomButton>
        )}
        {people && people.length > 0 && (
          <CustomButton   onClick={handleNextPage}>
            <ArrowForwardIosIcon />
          </CustomButton>
        )}
      </div>
    </Container>
  );
}

export default PeopleList;
