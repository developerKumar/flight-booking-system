import { render, screen, fireEvent, act } from "@testing-library/react";
import PassengerSelectForm, { DEFAULT_PASSENGERS_STATE } from "./index";

describe("PassengerSelectForm", () => {
  test("renders the selected passengers field", () => {
    render(<PassengerSelectForm />);

    const selectedPassengerField = screen.getByTestId(
      "selected-passenger-field"
    );

    expect(selectedPassengerField).toBeInTheDocument();
  });

  test("opens the passenger popover on click", () => {
    render(<PassengerSelectForm />);

    const selectedPassengerField = screen.getByTestId(
      "selected-passenger-field"
    );

    act(() => {
      fireEvent.click(selectedPassengerField);
      setTimeout(() => {
        const passengerPopover = screen.getByTestId(
          "passenger-popover-heading"
        );

        expect(passengerPopover).toBeInTheDocument();
      }, 1000);
    });
  });

  test("updates the passengers state when count changes in PassengerCounterForm", () => {
    render(<PassengerSelectForm />);
    const selectedPassengerField = screen.getByTestId(
      "selected-passenger-field"
    );

    act(() => {
      fireEvent.click(selectedPassengerField);
      setTimeout(() => {
        const adultsCounterForm = screen
          .getByTestId("passenger-counter-form-box")
          .querySelector('[title="adults"]');
        const childrenCounterForm = screen
          .getByTestId("passenger-counter-form-box")
          .querySelector('[title="children"]');

        fireEvent.click(
          adultsCounterForm?.querySelector(
            '[data-testid="passenger-counter-form-button-increase"]'
          )
        );
        fireEvent.click(
          childrenCounterForm?.querySelector(
            '[data-testid="passenger-counter-form-button-increase"]'
          )
        );
        fireEvent.click(
          childrenCounterForm?.querySelector(
            '[data-testid="passenger-counter-form-button-increase"]'
          )
        );

        expect(selectedPassengerField).toHaveValue("2 adults, 2 children");
      }, 1000);
    });
  });

  test("resets the passengers state to default on popover close", () => {
    render(<PassengerSelectForm />);
    const selectedPassengerField = screen.getByTestId(
      "selected-passenger-field"
    );
    act(() => {
      fireEvent.click(selectedPassengerField);
      setTimeout(() => {
        const adultsCounterForm = screen
          .getByTestId("passenger-counter-form-box")
          .querySelector('[title="adults"]');
        const childrenCounterForm = screen
          .getByTestId("passenger-counter-form-box")
          .querySelector('[title="children"]');

        fireEvent.click(
          adultsCounterForm?.querySelector(
            '[data-testid="passenger-counter-form-button-increase"]'
          )
        );
        fireEvent.click(
          childrenCounterForm?.querySelector(
            '[data-testid="passenger-counter-form-button-increase"]'
          )
        );

        fireEvent.click(screen.getByTestId("passenger-popover-heading"));

        const selectedPassengerField = screen.getByTestId(
          "selected-passenger-field"
        );

        expect(selectedPassengerField).toHaveValue("1 adult");
      }, 1000);
    });
  });

  test("renders with default passengers state when no values are selected", () => {
    render(<PassengerSelectForm />);

    const selectedPassengerField = screen.getByTestId(
      "selected-passenger-field"
    );

    setTimeout(() => {
      expect(selectedPassengerField).toHaveValue("1 adult");
    }, 1000);
  });
});
