import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import FlightInfoCard from "../FlightInfoCard";
import { IFlight } from "@/pages/api/search";

export interface IFlightSearchResultsProps {
  flightInfo: IFlight[];
}
const FlightSearchResults = ({flightInfo}: IFlightSearchResultsProps): JSX.Element => {
  return (
    <>
      <Box sx={{ mt: 8 }} data-testid="flight-search-results-box">
        <Typography
          variant="h5"
          sx={{
            mb: 2,
          }}
          gutterBottom
          data-testid="flight-search-results-heading"
        >
          Available flights for your search ({flightInfo.length})
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }} data-testid="flight-search-results-subheading">
          {flightInfo[0].origin} - {flightInfo[0].destination}
        </Typography>
        {flightInfo.map((flight: IFlight) => <FlightInfoCard {...flight} key={flight.uuid} />)}
      </Box>
    </>
  );
};

export default FlightSearchResults;
