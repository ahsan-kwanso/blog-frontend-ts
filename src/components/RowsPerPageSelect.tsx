import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface RowsPerPageSelectProps {
  rowsPerPage: number;
  onChange: (event: SelectChangeEvent<number>) => void;
  lowLimits?: boolean;
}

const RowsPerPageSelect = ({
  rowsPerPage,
  onChange,
  lowLimits = false,
}: RowsPerPageSelectProps): JSX.Element => {
  const limit = lowLimits ? 4 : 6;
  return (
    <FormControl
      sx={{
        minWidth: 120,
        maxWidth: 200, // Limit the maximum width
        ml: 2,
        "& .MuiSelect-root": {
          padding: "4px 14px", // Adjust padding inside Select
        },
        "& .MuiInputBase-root": {
          padding: "4px 14px", // Adjust padding inside Select input
        },
        "& .MuiFormControl-root": {
          margin: 0, // Remove margin
        },
      }}
    >
      <InputLabel id="rows-per-page-label">Rows per page</InputLabel>
      <Select
        labelId="rows-per-page-label"
        id="rows-per-page"
        value={rowsPerPage}
        onChange={onChange}
        label="Rows per page"
        sx={{
          "& .MuiSelect-select": {
            padding: "4px 14px", // Adjust padding inside Select
          },
        }}
      >
        <MenuItem value={limit * 1}>{limit * 1}</MenuItem>
        <MenuItem value={limit * 2}>{limit * 2}</MenuItem>
        <MenuItem value={limit * 3}>{limit * 3}</MenuItem>
        <MenuItem value={limit * 4}>{limit * 4}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RowsPerPageSelect;
