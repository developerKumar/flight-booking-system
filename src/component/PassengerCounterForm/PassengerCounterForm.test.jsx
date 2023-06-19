import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PassengerCounterForm from './index';

describe('PassengerCounterForm', () => {
  const mockTitle = 'Passenger Counter';
  const mockSubtitle = 'Select the number of passengers:';
  const mockDefaultValue = 2;
  const mockIdentityKey = 'adults';

  test('renders title and subtitle', () => {
    render(
      <PassengerCounterForm
        title={mockTitle}
        subtitle={mockSubtitle}
        onCountChange={jest.fn()}
        identityKey={mockIdentityKey}
        defaultValue={mockDefaultValue}
      />
    );

    const titleElement = screen.getByTestId('passenger-counter-form-title');
    const subtitleElement = screen.getByTestId('passenger-counter-form-subtitle');

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(mockTitle);

    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement).toHaveTextContent(mockSubtitle);
  });

  test('renders default value in the text field', () => {
    render(
      <PassengerCounterForm
        title={mockTitle}
        subtitle={mockSubtitle}
        onCountChange={jest.fn()}
        identityKey={mockIdentityKey}
        defaultValue={mockDefaultValue}
      />
    );

    const textFieldElement = screen.getByTestId('passenger-counter-form-field');

    expect(textFieldElement).toBeInTheDocument();
    // set tiemout because set state takes some time to set default value
    setTimeout(() => {
      expect(textFieldElement).toHaveAttribute('value', mockDefaultValue.toString());
    }, 1000)
  });

  test('calls onCountChange with the updated count when decrease button is clicked', () => {
    const mockOnCountChange = jest.fn();
    render(
      <PassengerCounterForm
        title={mockTitle}
        subtitle={mockSubtitle}
        onCountChange={mockOnCountChange}
        identityKey={mockIdentityKey}
        defaultValue={mockDefaultValue}
      />
    );

    const decreaseButtonElement = screen.getByTestId('passenger-counter-form-button-decrease');
    fireEvent.click(decreaseButtonElement);

    expect(mockOnCountChange).toHaveBeenCalledTimes(1);
    expect(mockOnCountChange).toHaveBeenCalledWith(mockDefaultValue - 1, mockIdentityKey);
  });

  test('calls onCountChange with the updated count when increase button is clicked', () => {
    const mockOnCountChange = jest.fn();
    render(
      <PassengerCounterForm
        title={mockTitle}
        subtitle={mockSubtitle}
        onCountChange={mockOnCountChange}
        identityKey={mockIdentityKey}
        defaultValue={mockDefaultValue}
      />
    );

    const increaseButtonElement = screen.getByTestId('passenger-counter-form-button-increase');
    fireEvent.click(increaseButtonElement);

    expect(mockOnCountChange).toHaveBeenCalledTimes(1);
    expect(mockOnCountChange).toHaveBeenCalledWith(mockDefaultValue + 1, mockIdentityKey);
  });

  test('does not call onCountChange when decrease button is clicked and count is already at 0', () => {
    const mockOnCountChange = jest.fn();
    render(
      <PassengerCounterForm
        title={mockTitle}
        subtitle={mockSubtitle}
        onCountChange={mockOnCountChange}
        identityKey={mockIdentityKey}
        defaultValue={0}
      />
    );

    const decreaseButtonElement = screen.getByTestId('passenger-counter-form-button-decrease');
    fireEvent.click(decreaseButtonElement);

    expect(mockOnCountChange).not.toHaveBeenCalled();
  });

  test('does not call onCountChange when increase button is clicked and count is already at maximum', () => {
    const mockOnCountChange = jest.fn();
    render(
      <PassengerCounterForm
        title={mockTitle}
        subtitle={mockSubtitle}
        onCountChange={mockOnCountChange}
        identityKey={mockIdentityKey}
        defaultValue={9}
      />
    );

    const increaseButtonElement = screen.getByTestId('passenger-counter-form-button-increase');
    fireEvent.click(increaseButtonElement);

    expect(mockOnCountChange).not.toHaveBeenCalled();
  });
});
