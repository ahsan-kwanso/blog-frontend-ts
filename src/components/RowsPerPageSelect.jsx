// src/components/RowsPerPageSelect.js
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const RowsPerPageSelect = ({ rowsPerPage, onChange }) => {
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
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={18}>18</MenuItem>
        <MenuItem value={24}>24</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RowsPerPageSelect;
