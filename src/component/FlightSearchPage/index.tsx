import { Box, Container } from "@mui/material";
import React, { useCallback, useState } from "react";
import FlightSearchForm from "../FlighSearchForm";
import FlightSearchResults from "../FlightSearchResults";
import { searchFlight } from "@/services/flight.service";

const FlightSearchPage = () => {
  const [result, setResult] = useState<any>();
  const handleSearch = useCallback(
    async (
      origin?: string,
      destination?: string,
      departureDate?: string,
      returnDate?: string
    ) => {
      const response = await searchFlight(
        origin,
        destination,
        departureDate,
        returnDate
      ).catch((error) => {
        console.log(error);
        // Show something on Ui like something went wrong....
      });
      setResult(response);
    },
    []
  );
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box
        boxShadow={3}
        sx={{
          padding: "20px",
          borderRadius: "10px",
          background: "white",
        }}
        data-testid="flight-search-form-box"
      >
        <FlightSearchForm onSearch={handleSearch} />
      </Box>
      {result && <Box data-testid="flight-search-results-box" sx={{ mt: 8 }}>
         <FlightSearchResults flightInfo={result} />
      </Box>}
    </Container>
  );
};

export default FlightSearchPage;
