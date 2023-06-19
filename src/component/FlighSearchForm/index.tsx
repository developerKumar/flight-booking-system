import { Autocomplete, Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { SyntheticEvent, useCallback, useState } from "react";
import PassengerSelectForm from "../PassengerSelectForm";
import { slotPropsDatePicker } from "./slotProps";
import { AutoCompleteTextFieldRender } from "./AutoCompleteTextFieldRender";
import airports from "@/data/airports.json";

export interface IAirports {
  id: string;
  name: string;
  city: string;
  country: string;
  iata: string;
  icao: string;
  latitude: string;
  longitude: string;
  altitude: string;
  timezone: string;
  dst: string;
  tz: string;
}
export interface IFlightSearchFormProps {
  onSearch: (
    origin?: string,
    destination?: string,
    departureDate?: string,
    returnDate?: string
  ) => void;
}
const FlightSearchForm = ({
  onSearch,
}: IFlightSearchFormProps): JSX.Element => {
  const [origin, setOrigin] = useState<IAirports | null>(null);
  const [destination, setDestination] = useState<IAirports | null>(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  // To fix label and icon overlapping in datepicker also, we want to shrink both pickers with one state
  const [shrink, setShrink] = useState(true);

  const handleOriginChange = (
    event: SyntheticEvent<Element, Event>,
    value: IAirports | null
  ) => {
    setOrigin(value);
  };

  const handleDestinationChange = (
    event: SyntheticEvent<Element, Event>,
    value: IAirports | null
  ) => {
    setDestination(value);
  };

  const handleSearchFlight = useCallback(() => {
    onSearch(
      origin?.iata,
      destination?.iata,
      departureDate || "",
      returnDate || ""
    );
  }, [departureDate, destination?.iata, onSearch, origin?.iata, returnDate]);

  const isFormValid = origin && destination && departureDate && returnDate;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={airports}
            getOptionLabel={(option) => `${option.city} - ${option.iata}`}
            value={origin}
            onChange={handleOriginChange}
            size="small"
            renderInput={(params) => (
              <AutoCompleteTextFieldRender
                {...params}
                label="Departure airport*"
                inputProps={{
                  "data-testid": "departure-airport-field",
                  ...params.inputProps
                }}
              >
                <FlightTakeoffIcon />
              </AutoCompleteTextFieldRender>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={airports}
            getOptionLabel={(option) => `${option.city} - ${option.iata}`}
            value={destination}
            onChange={handleDestinationChange}
            renderInput={(params) => (
              <AutoCompleteTextFieldRender
                {...params}
                label="Destination airport*"
                inputProps={{
                  "data-testid": "destination-airport-field",
                  ...params.inputProps
                }}
              >
                <FlightLandIcon />
              </AutoCompleteTextFieldRender>
            )}
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "16px" }}>
        <Grid item xs={12} md={3}>
          <DatePicker
            slotProps={slotPropsDatePicker(shrink, setShrink, {
              "data-testid": "departure-date-field",
            })}
            label="Departure Date*"
            onChange={setDepartureDate}
            // data-testid="departure-date-field"
            value={departureDate}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DatePicker
            slotProps={slotPropsDatePicker(shrink, setShrink, {
              "data-testid": "return-airport-field",
            })}
            label="Return Date*"
            onChange={setReturnDate}
            // data-testid="return-airport-field"
            value={returnDate}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          {/* We are leaving it's data as it is inside the component for now reason being
          API doesn't require the passengers detail while fetching the flights */}
          <PassengerSelectForm />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            onClick={handleSearchFlight}
            size="large"
            fullWidth
            disabled={!isFormValid}
            data-testid="search-flight-button"
          >
            Search for flight
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default FlightSearchForm;
