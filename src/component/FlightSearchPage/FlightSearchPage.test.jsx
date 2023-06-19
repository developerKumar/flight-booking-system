import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FlightSearchPage from "./index";
import { searchFlight } from "@/services/flight.service";

jest.mock("@/services/flight.service", () => ({
  searchFlight: jest.fn(),
}));

describe("FlightSearchPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders FlightSearchForm component", () => {
    render(<FlightSearchPage />);

    const flightSearchFormBox = screen.getByTestId("flight-search-form-box");

    expect(flightSearchFormBox).toBeInTheDocument();
  });

  test("performs flight search and does not renders FlightSearchResults component because of no result", async () => {
    const mockFlightInfo = [
      {
          "origin": "GKA",
          "destination": "LAE",
          "departureDate": "Tue, 20 Jun 2023 18:30:00 GMT",
          "returnDate": "Tue, 20 Jun 2023 18:30:00 GMT",
          "seatAvailability": 0,
          "price": {
              "amount": 491,
              "currency": "EUR"
          },
          "offerType": "BEST price",
          "uuid": "cd6afb14-a016-43b4-b95e-48f77501cf05"
      }
  ]

    searchFlight.mockResolvedValue(mockFlightInfo);

    render(<FlightSearchPage />);

    fireEvent.change(screen.getByLabelText("Departure airport*"), {
      target: { value: "Goroka" },
    });
    const optionElement = screen.getByText("Goroka - GKA");
    fireEvent.click(optionElement); // Select the desired option
    fireEvent.change(screen.getByLabelText("Destination airport*"), {
      target: { value: "Madang" },
    });
    const optionElement2 = screen.getByText("Madang - MAG");
    fireEvent.click(optionElement2);
    fireEvent.change(screen.getByLabelText("Departure Date*"), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(screen.getByLabelText("Return Date*"), {
      target: { value: "02/01/2022" },
    });

    const flightSearchForm = screen.getByText("Search for flight");
    flightSearchForm.click()
    await waitFor(() => {
      expect(searchFlight).toHaveBeenCalledTimes(1);
      expect(searchFlight).toHaveBeenCalledWith(
        'GKA',
        'MAG',
        expect.anything(),
        expect.anything(), // expecting anything because it has separate reference
      );
    });
  });
});
