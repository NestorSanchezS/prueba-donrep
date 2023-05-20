import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import {IconButton, Avatar,CardHeader, Container, Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendIcon from '@mui/icons-material/Send';
import { makeStyles, createStyles } from "@material-ui/core/styles";

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  films: string[];
}

async function fetchPeople(page: number): Promise<Person[]> {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}&limit=20`);
  const data = await response.json();
  return data.results;
}
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 345
    },
    avatar: {
      backgroundColor: theme.palette.primary.main
    },
    avatarContainer: {
      width: 60,
      height: 60,
    },
    avatarImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
    },
  })
);


function PeopleList() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  let page = parseInt(queryParams.get('page') || '1');
  const classes = useStyles();

  const { data: people, isLoading } = useQuery(['people', page], () => fetchPeople(page));

  const handleViewFilms = (films: string[]) => {
    navigate(`/films?films=${encodeURIComponent(JSON.stringify(films))}`);
  };

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
    return <Typography>Loading...</Typography>;
  }

  

  return (
    <Container>
      <Grid container spacing={2}>
        {people &&
          people.map((person) => (
            <Grid item xs={12} sm={6} md={4} key={person.name}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <div aria-label="recipe" className={classes.avatarContainer}>
                      <img src="/wars.webp" alt="avatar" className={classes.avatarImg}/>
                    </div>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <FavoriteIcon />
                    </IconButton>
                  }
                  title={person.name}
                  subheader={`${person.height}, ${person.gender}`}
                />
                <div style={{textAlign: 'center', marginBottom:"10px"}}>
                <Button variant="contained" endIcon={<SendIcon />}  size="small" color="primary" onClick={() => handleViewFilms(person.films)}>
                  View Films
                </Button>
                </div>
                
              </Card>
            </Grid>
          ))}
      </Grid>
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        {page > 1 && (
          <Button style={{marginRight: '10px'}} variant="contained" color="primary" onClick={handlePreviousPage}>
            Previous Page
          </Button>
        )}
        {people && people.length > 0 && (
          <Button variant="contained" color="primary" onClick={handleNextPage}>
            Next Page
          </Button>
        )}
      </div>
      
    </Container>
  );
}

export default PeopleList;


