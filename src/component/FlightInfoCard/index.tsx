import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import { IFlight } from "@/pages/api/search";
import dayjs from "dayjs";

export const currencySymobl: {
  [key: string]: string;
} = {
  EUR: "€",
};
const FlightInfoCard = ({
  departureDate,
  returnDate,
  price,
  seatAvailability,
}: IFlight): JSX.Element => {
  return (
    <Paper role="flight-info-card" elevation={5} sx={{ p: "20px", mt: 1.5 }}>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6} lg={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography data-testid="flight-search-results-departure-date-heading" variant="body2">Departure Date</Typography>
              <Typography variant="h5" data-testid="flight-search-results-departure-date">
                {dayjs(departureDate).format("YYYY-MM-DD")}
              </Typography>
            </Box>
            <Box>
              <ConnectingAirportsIcon />
            </Box>
            <Box>
              <Typography data-testid="flight-search-results-return-date-heading" variant="body2">Return Date</Typography>
              <Typography variant="h5" data-testid="flight-search-results-return-date">
                {dayjs(returnDate).format("YYYY-MM-DD")}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="body2" data-testid="flight-search-results-return-price-heading">Price</Typography>
              <Typography variant="h5" data-testid="flight-search-results-return-price">
                {currencySymobl[price.currency]} {price.amount}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" data-testid="flight-search-results-return-seats-heading">Seats availability</Typography>
              <Typography variant="h5" data-testid="flight-search-results-return-seats">{seatAvailability}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FlightInfoCard;
