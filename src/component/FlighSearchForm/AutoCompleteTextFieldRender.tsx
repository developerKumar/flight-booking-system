import {
  AutocompleteRenderInputParams,
  InputAdornment,
  TextField,
} from "@mui/material";
import { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  "data-testid"?: string;
}
export const AutoCompleteTextFieldRender = (
  props: AutocompleteRenderInputParams & { label: string; children: ReactNode; inputProps: InputProps }
): JSX.Element => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        startAdornment: (
          <InputAdornment position="start">{props.children}</InputAdornment>
        ),
      }}
    />
  );
};
