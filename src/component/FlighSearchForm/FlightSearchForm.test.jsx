import { render, screen, fireEvent } from "@testing-library/react";
import FlightSearchForm from "./index";

describe("FlightSearchForm", () => {
  it("should render the form fields correctly", () => {
    render(<FlightSearchForm onSearch={jest.fn()} />);

    expect(screen.getByLabelText("Departure airport*")).toBeInTheDocument();
    expect(screen.getByLabelText("Destination airport*")).toBeInTheDocument();
    expect(screen.getByLabelText("Departure Date*")).toBeInTheDocument();
    expect(screen.getByLabelText("Return Date*")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Search for flight" })
    ).toBeInTheDocument();
  });

  it("should enable the search button when all required fields are filled", () => {
    render(<FlightSearchForm onSearch={jest.fn()} />);

    // Fill in required fields
    fireEvent.change(screen.getByTestId("departure-airport-field"), {
      target: { value: "Goroka" },
    });
    const optionElement = screen.getByText("Goroka - GKA");
    fireEvent.click(optionElement); // Select the desired option
    fireEvent.change(screen.getByTestId("destination-airport-field"), {
      target: { value: "Madang" },
    });
    const optionElement2 = screen.getByText("Madang - MAG");
    fireEvent.click(optionElement2);
    fireEvent.change(screen.getByTestId("departure-date-field"), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(screen.getByTestId("return-airport-field"), {
      target: { value: "02/01/2022" },
    });

    expect(screen.getByTestId("search-flight-button")).toBeEnabled();
  });

  it("should disable the search button when a required field is empty", () => {
    render(<FlightSearchForm onSearch={jest.fn()} />);

    // Fill in some fields but leave a required field empty
    fireEvent.change(screen.getByTestId("departure-airport-field"), {
      target: { value: "Airport A" },
    });
    fireEvent.change(screen.getByTestId("destination-airport-field"), {
      target: { value: "Airport B" },
    });
    fireEvent.change(screen.getByTestId("departure-date-field"), {
      target: { value: "2022-01-01" },
    });

    expect(screen.getByTestId("search-flight-button")).toBeDisabled();
  });

  it("should call the onSearch function when the search button is clicked", () => {
    const onSearchMock = jest.fn();
    render(<FlightSearchForm onSearch={onSearchMock} />);

    // Fill in required fields
    fireEvent.change(screen.getByTestId("departure-airport-field"), {
      target: { value: "Goroka" },
    });
    const optionElement = screen.getByText("Goroka - GKA");
    fireEvent.click(optionElement); // Select the desired option
    fireEvent.change(screen.getByTestId("destination-airport-field"), {
      target: { value: "Madang" },
    });
    const optionElement2 = screen.getByText("Madang - MAG");
    fireEvent.click(optionElement2);
    fireEvent.change(screen.getByTestId("departure-date-field"), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(screen.getByTestId("return-airport-field"), {
      target: { value: "02/01/2022" },
    });

    fireEvent.click(screen.getByTestId("search-flight-button"));
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });
});
