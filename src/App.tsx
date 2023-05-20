import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleList from './components/PeopleList';
import Films from './components/Films';
import Favorites from './components/Favorites';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppBar position="static">
          <Toolbar>
          <Button component ={Link} to="/" style={{ marginRight: '20px', textTransform: 'none', color: 'white', fontSize: '1.2rem' }}>
              Start Wars Characters
            </Button>
            <div style={{ marginLeft: 'auto' }}> {/* Espacio flexible para empujar el IconButton hacia la derecha */}
              <IconButton
                component={Link}
                to="/favorites"
                color="inherit"
                style={{ fontSize: '24px', color: 'red' }}
              >
                <FavoriteIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<PeopleList />} / >
            <Route path="/films" element={<Films />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Container>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
