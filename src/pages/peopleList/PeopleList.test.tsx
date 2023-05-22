import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { MemoryRouter, useLocation } from 'react-router-dom';
import PeopleList from './PeopleList';

// Mock de datos de personas
const mockPeople = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    gender: 'male',
    films: ['Film 1', 'Film 2'],
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    gender: 'male',
    films: ['Film 3', 'Film 4'],
  },
];

// Mock de la función fetchPeople
jest.mock('./fetchPeople', () => {
  return jest.fn(() => Promise.resolve(mockPeople));
});

describe('PeopleList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  test('muestra la lista de personas', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PeopleList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Esperar hasta que se carguen los datos
    const cards = await screen.findAllByTestId('person-card');
    expect(cards.length).toBe(2);
  });

  test('navega a la página siguiente al hacer clic en el botón de siguiente', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/?page=1']}>
          <PeopleList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Esperar hasta que se carguen los datos
    await screen.findAllByTestId('person-card');

    // Simular el clic en el botón de siguiente
    fireEvent.click(screen.getByTestId('next-page-button'));

    // Obtener la ubicación actual
    const { search } = useLocation();

    // Verificar que la ubicación cambió a la página siguiente
    expect(search).toBe('?page=2');
  });

  test('agrega y quita personas de favoritos al hacer clic en el botón de favorito', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PeopleList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Esperar hasta que se carguen los datos
    await screen.findAllByTestId('person-card');

    // Obtener el botón de favorito del primer elemento
    const favoriteButton = screen.getAllByTestId('favorite-button')[0];

    // Verificar que la persona no está en la lista de favoritos inicialmente
    expect(screen.queryByText('Luke Skywalker (Favorito)')).toBeNull();

    // Simular el clic en el botón de favorito
    fireEvent.click(favoriteButton);

    // Verificar que la persona se agregó a la lista de favoritos
    expect(screen.getByText('Luke Skywalker (Favorito)')).toBeInTheDocument();

    // Simular el clic nuevamente para quitar a la persona de favoritos
    fireEvent.click(favoriteButton);

    // Verificar que la persona se quitó de la lista de favoritos
    expect(screen.queryByText('Luke Skywalker (Favorito)')).toBeNull();
  });
});
