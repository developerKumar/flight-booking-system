export const slotPropsDatePicker = (
  shrink: boolean,
  setShrink: (shrink: boolean) => void,
  inputProps = {},
): any => ({
  textField: {
    fullWidth: true,
    size: "small",
    InputProps: {
      style: {
        flexDirection: "row-reverse",
      },
    },
    sx: {
      "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
        transform: "translate(45px, 9px)",
      },
    },
    onFocus: () => setShrink(true),
    onBlur: (e: { target: { value: any } }) => {
      !e.target.value && setShrink(false);
    },
    InputLabelProps: {
      shrink: shrink,
    },
    inputProps,
  },
  inputAdornment: {
    style: {
      marginLeft: "6px",
    },
  },
});
