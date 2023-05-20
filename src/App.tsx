import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
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
            <Typography variant="h6" style={{ marginRight: '20px' }}>
              Star Wars Characters
            </Typography>
            <Button component={Link} to="/" color="inherit">
              Characters
            </Button>
            <Button component={Link} to="/favorites" color="inherit">
              Favorites
            </Button>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<PeopleList />} / >
            <Route path="/films" element={<Films />} />
            <Route path="/favorites" element = {<Favorites />} />
          </Routes>
        </Container>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
