/**
 * We are saving the data for this component at it's level only,
 * because this data is not required to fetch the flight details.
 * But later this can be utilized. Like while booking the flight
 */

import {
  Box,
  Divider,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import PassengerCounterForm from "../PassengerCounterForm";
import { MouseEvent, useCallback, useState } from "react";
import { convertPassengersToTextFormat } from "@/utils/passengers";
import PersonIcon from "@mui/icons-material/Person";

export interface IStatePassengers {
  [identityKey: string]: number;
}

export const DEFAULT_PASSENGERS_STATE = { adults: 1 };
const PassengerSelectForm = (): JSX.Element => {
  const [passengers, setPassengers] = useState<IStatePassengers>(
    DEFAULT_PASSENGERS_STATE
  );
  const [popoverAnchor, setPopoverAnchor] = useState<
    EventTarget & HTMLDivElement
  >();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const handeOnCountChange = useCallback(
    (count: number, identityKey: string) => {
      setPassengers((prevState: IStatePassengers) => ({
        ...prevState,
        [identityKey]: count,
      }));
    },
    []
  );
  const handlePopoverOpen = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    setPopoverAnchor(target);
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(undefined);
    setPopoverOpen(false);
  };
  return (
    <>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
        size="small"
        label="Passengers"
        fullWidth
        value={convertPassengersToTextFormat(passengers, true)}
        onClick={handlePopoverOpen}
        data-testid="selected-passenger-field"
      />
      <Popover
        open={popoverOpen}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div
          style={{
            width: "400px",
            minHeight: "300px",
            borderRadius: "8px",
          }}
        >
          <Box sx={{ p: "10px 8px" }}>
            <Typography data-testid="passenger-popover-heading" variant="body1" sx={{ fontWeight: "bold" }}>
              Passenger
            </Typography>
            <Typography variant="body2" data-testid="passenger-popover-details" gutterBottom>
              {/* toString() because we want the comma separated values */}
              {convertPassengersToTextFormat(passengers, false).toString()}
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              p: "10px 8px",
            }}
            data-testid="passenger-counter-form-box"
          >
            <PassengerCounterForm
              title="adults"
              subtitle="passengers ages 12+"
              onCountChange={handeOnCountChange}
              identityKey="adults"
              defaultValue={passengers["adults"] || 0}
            />
            <Divider />
            <PassengerCounterForm
              title="children"
              subtitle="(2-11 yrs.)"
              onCountChange={handeOnCountChange}
              identityKey="children"
              defaultValue={passengers["children"] || 0}
            />
          </Box>
        </div>
      </Popover>
    </>
  );
};

export default PassengerSelectForm;
