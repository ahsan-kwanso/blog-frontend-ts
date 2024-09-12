import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

interface UserFilterProps {
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
  onFilterChange: (role: string) => void;
}

const FilterUsers: React.FC<UserFilterProps> = ({
  onSortChange,
  onFilterChange,
}) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [role, setRole] = useState<string>("");

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const [newSortBy, newOrder] = event.target.value.split(":");
    setSortBy(newSortBy);
    setOrder(newOrder as "asc" | "desc");
    onSortChange(newSortBy, newOrder as "asc" | "desc");
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const newRole = event.target.value;
    setRole(newRole);
    onFilterChange(newRole);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        gap: 2, // Adjust gap between filters
        width: "auto", // Allow width to adjust based on content
      }}
    >
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="sort-select-label">Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          value={`${sortBy}:${order}`}
          onChange={handleSortChange}
          displayEmpty
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value="name:asc">Name (A-Z)</MenuItem>
          <MenuItem value="name:desc">Name (Z-A)</MenuItem>
          <MenuItem value="posts:asc">Posts (Low to High)</MenuItem>
          <MenuItem value="posts:desc">Posts (High to Low)</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="filter-select-label">Filter By Role</InputLabel>
        <Select
          labelId="filter-select-label"
          value={role}
          onChange={handleFilterChange}
          displayEmpty
        >
          <MenuItem value="admin">Admins</MenuItem>
          <MenuItem value="user">Users</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterUsers;
