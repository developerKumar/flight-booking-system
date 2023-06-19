import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface IPassengerCounterFormProps {
  title: string;
  subtitle: string;
  onCountChange: (count: number, identityKey: string) => void;
  identityKey: string;
  defaultValue: number;
}
const PassengerCounterForm = ({
  title,
  subtitle,
  onCountChange,
  identityKey,
  defaultValue,
}: IPassengerCounterFormProps): JSX.Element => {
  const [count, setCount] = useState(defaultValue);

  const handleDecrease = () => {
    if (count > 0) {
      const val = count - 1;
      setCount(val);
      onCountChange(val, identityKey);
    }
  };

  const handleIncrease = () => {
    // Maximum allowed passengers are less than 10
    if (count < 9) {
      const val = count + 1;
      setCount(val);
      onCountChange(val, identityKey);
    }
  };
  return (
    <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
      <Box width="50%">
        <Typography variant="h6" align="left" data-testid="passenger-counter-form-title">
          {title}
        </Typography>
        <Typography variant="body2" color="grey" data-testid="passenger-counter-form-subtitle" align="left">
          {subtitle}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" data-testid="passenger-counter-form-button-box" width="50%">
        <Button
          variant="outlined"
          size="small"
          onClick={handleDecrease}
          style={{ height: "30px", minWidth: "40px" }}
          data-testid="passenger-counter-form-button-decrease"
        >
          -
        </Button>

        <TextField
          variant="outlined"
          value={count}
          style={{
            height: "30px",
            width: "40px",
            margin: "0px 2px",
            textAlign: "center",
          }}
          InputProps={{
            style: {
              height: "30px",
            },
          }}
          data-testid="passenger-counter-form-field"
        />

        <Button
          variant="outlined"
          size="small"
          onClick={handleIncrease}
          style={{ height: "30px", minWidth: "40px" }}
          data-testid="passenger-counter-form-button-increase"
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(PassengerCounterForm);
