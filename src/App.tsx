import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container } from '@material-ui/core';
import CustomAppBar from './components/CustomAppBar'
import PeopleList from './pages/PeopleList';
import Films from './components/Films';
import Favorites from './pages/Favorites';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <CustomAppBar>
              <Container style={{ marginTop: '20px' }}>
                <PeopleList />
              </Container>
            </CustomAppBar>
          }
        />
        <Route
          path="/films"
          element={
            <CustomAppBar>
              <Container style={{ marginTop: '20px' }}>
                <Films />
              </Container>
            </CustomAppBar>
          }
        />
        <Route
          path="/favorites"
          element={
            <CustomAppBar>
              <Container style={{ marginTop: '20px' }}>
                <Favorites />
              </Container>
            </CustomAppBar>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
