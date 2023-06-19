import React from "react";
import { render, screen } from "@testing-library/react";
import FlightInfoCard from "./index";

const mockFlight = {
  departureDate: "2023-06-20T10:00:00.000Z",
  returnDate: "2023-06-25T16:30:00.000Z",
  price: {
    currency: "EUR",
    amount: 199.99,
  },
  seatAvailability: 50,
};

describe("FlightInfoCard", () => {
  test("renders departure date correctly", () => {
    render(
      <FlightInfoCard
        departureDate={mockFlight.departureDate}
        returnDate={mockFlight.returnDate}
        price={mockFlight.price}
        seatAvailability={mockFlight.seatAvailability}
      />
    );

    const departureDateHeading = screen.getByTestId(
      "flight-search-results-departure-date-heading"
    );
    const departureDateValue = screen.getByTestId(
      "flight-search-results-departure-date"
    );

    expect(departureDateHeading).toBeInTheDocument();
    expect(departureDateValue).toBeInTheDocument();
    expect(departureDateValue.textContent).toBe("2023-06-20");
  });

  test("renders return date correctly", () => {
    render(
      <FlightInfoCard
        departureDate={mockFlight.departureDate}
        returnDate={mockFlight.returnDate}
        price={mockFlight.price}
        seatAvailability={mockFlight.seatAvailability}
      />
    );

    const returnDateHeading = screen.getByTestId(
      "flight-search-results-return-date-heading"
    );
    const returnDateValue = screen.getByTestId(
      "flight-search-results-return-date"
    );

    expect(returnDateHeading).toBeInTheDocument();
    expect(returnDateValue).toBeInTheDocument();
    expect(returnDateValue.textContent).toBe("2023-06-25");
  });

  test("renders price correctly", () => {
    render(
      <FlightInfoCard
        departureDate={mockFlight.departureDate}
        returnDate={mockFlight.returnDate}
        price={mockFlight.price}
        seatAvailability={mockFlight.seatAvailability}
      />
    );

    const priceHeading = screen.getByTestId(
      "flight-search-results-return-price-heading"
    );
    const priceValue = screen.getByTestId("flight-search-results-return-price");

    expect(priceHeading).toBeInTheDocument();
    expect(priceValue).toBeInTheDocument();
    expect(priceValue.textContent).toBe("€ 199.99");
  });

  test("renders seat availability correctly", () => {
    render(
      <FlightInfoCard
        departureDate={mockFlight.departureDate}
        returnDate={mockFlight.returnDate}
        price={mockFlight.price}
        seatAvailability={mockFlight.seatAvailability}
      />
    );

    const seatsHeading = screen.getByTestId(
      "flight-search-results-return-seats-heading"
    );
    const seatsValue = screen.getByTestId("flight-search-results-return-seats");

    expect(seatsHeading).toBeInTheDocument();
    expect(seatsValue).toBeInTheDocument();
    expect(seatsValue.textContent).toBe("50");
  });
});
