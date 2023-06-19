import { convertPassengersToTextFormat } from './passengers';

describe('convertPassengersToTextFormat', () => {
  it('should return an array of passenger strings in the correct format', () => {
    const passengers = {
      adults: 2,
      children: 1,
      infants: 0,
    };
    const expectedOutput = [' adults 2', ' children 1'];

    expect(convertPassengersToTextFormat(passengers, false)).toEqual(expectedOutput);
  });

  it('should return an array of passenger strings in reverse order when "reverse" parameter is true', () => {
    const passengers = {
      adults: 1,
      children: 2,
      infants: 0,
    };
    const expectedOutput = [' 1 adults', ' 2 children'];

    expect(convertPassengersToTextFormat(passengers, true)).toEqual(expectedOutput);
  });

  it('should exclude any passengers with zero count from the output array', () => {
    const passengers = {
      adults: 0,
      children: 3,
      infants: 0,
    };
    const expectedOutput = [' children 3'];

    expect(convertPassengersToTextFormat(passengers, false)).toEqual(expectedOutput);
  });
});
