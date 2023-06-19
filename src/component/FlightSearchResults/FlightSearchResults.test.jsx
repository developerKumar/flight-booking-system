import React from 'react';
import { render, screen } from '@testing-library/react';
import FlightSearchResults from './index';

describe('FlightSearchResults', () => {
  const flightInfoMock = [
    {
      uuid: '1',
      origin: 'GKA',
      destination: 'MAG',
      departureDate: '2021-12-31T18:30:00.000Z',
      returnDate: '2022-01-31T18:30:00.000Z',
      price: 100,
      seatAvailability: 50,
    },
    // Add more flight info objects as needed for testing different scenarios
  ];

  test('renders flight search results heading', () => {
    render(<FlightSearchResults flightInfo={flightInfoMock} />);
    const headingElement = screen.getByTestId('flight-search-results-heading');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(
      `Available flights for your search (${flightInfoMock.length})`
    );
  });

  test('renders flight search results subheading', () => {
    render(<FlightSearchResults flightInfo={flightInfoMock} />);
    const subheadingElement = screen.getByTestId('flight-search-results-subheading');
    expect(subheadingElement).toBeInTheDocument();
    expect(subheadingElement).toHaveTextContent(`${flightInfoMock[0].origin} - ${flightInfoMock[0].destination}`);
  });

  test('renders correct number of FlightInfoCard components', () => {
    render(<FlightSearchResults flightInfo={flightInfoMock} />);
    const flightInfoCards = screen.getAllByRole('flight-info-card');
    expect(flightInfoCards).toHaveLength(flightInfoMock.length);
  });
});
