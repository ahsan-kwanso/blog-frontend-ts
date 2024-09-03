// src/components/SearchBar.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {debounce} from "lodash";
import { defaultPage, defaultLimit } from "../utils/pagination";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[200], 0.7) // Grayish background for light theme
      : alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.grey[300], 0.75)
        : alpha(theme.palette.common.white, 0.05),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchField = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      // Create a new instance of URLSearchParams based on the current params
      const newSearchParams = new URLSearchParams(searchParams);

      // Update the search query
      if (query) {
        newSearchParams.set("search", query);
      } else {
        newSearchParams.delete("search");
      }

      // Keep the other parameters like filter, page, and limit
      newSearchParams.set("page", defaultPage.toString());
      newSearchParams.set("limit", defaultLimit.toString());

      // Construct the new URL with updated search parameters
      const url = `${location.pathname}?${newSearchParams.toString()}`;
      // console.log(url);
      navigate(url);
    }, 500),
    [location.pathname, searchParams]
  );

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </Search>
  );
};

export default SearchField;
