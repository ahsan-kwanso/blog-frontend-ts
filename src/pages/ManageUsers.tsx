import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  SelectChangeEvent,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import UserTable from "../components/UserTable";
import BackToDashboardButton from "../components/BackToDashboardButton";
import { useSearchParams } from "react-router-dom";
import RowsPerPageSelect from "../components/RowsPerPageSelect";
import { defaultLimitUser, defaultPage } from "../utils/pagination";
import useFetchUsers from "../hooks/useFetchUsers";
import useEditUserRole from "../hooks/useEditUserRole";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import FilterUsers from "../components/FilterUsers";

const ManageUsers = (): JSX.Element => {
  const isSmallScreen = useMediaQuery("(max-width:650px)");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? `${defaultPage}`);
  const limit = parseInt(searchParams.get("limit") ?? `${defaultLimitUser}`);
  const [rowsPerPage, setRowsPerPage] = useState<number>(limit);
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") ?? ""
  );
  const [order, setOrder] = useState<"asc" | "desc">(
    (searchParams.get("sortOrder") as "asc" | "desc") ?? ""
  );
  const [roleFilter, setRoleFilter] = useState<string>(
    searchParams.get("role") ?? ""
  );

  const { users, isLoading, error, fetchUsers, total, nextPage } =
    useFetchUsers(page, limit, sortBy, order, roleFilter);
  const {
    editUserRole,
    isLoading: isEditing,
    error: editError,
  } = useEditUserRole();
  const { user } = useContext(AuthContext);
  const loggedInUserId = user?.id as string;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const newParams: Record<string, string> = {
      page: value.toString(),
      limit: rowsPerPage.toString(),
    };
    if (sortBy) newParams.sortBy = sortBy;
    if (order) newParams.sortOrder = order;
    if (roleFilter) newParams.role = roleFilter;

    setSearchParams(newParams);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newLimit = event.target.value as string;
    setRowsPerPage(Number(newLimit)); // Ensure rowsPerPage is a number

    const newParams: Record<string, string> = {
      page: "1", // Set page to 1 when changing rows per page
      limit: newLimit,
    };
    if (sortBy) newParams.sortBy = sortBy;
    if (order) newParams.sortOrder = order;
    if (roleFilter) newParams.role = roleFilter;
    setSearchParams(newParams);
  };

  const handleSortChange = (sortBy: string, order: "asc" | "desc") => {
    setSortBy(sortBy);
    setOrder(order);

    const newParams: Record<string, string> = {
      page: "1",
      limit: rowsPerPage.toString(),
    };

    if (sortBy) newParams.sortBy = sortBy;
    if (order) newParams.sortOrder = order; // Add only if there's an order
    if (roleFilter) newParams.role = roleFilter; // Only include role if it's set

    setSearchParams(newParams);
  };

  const handleFilterChange = (role: string) => {
    setRoleFilter(role);

    const newParams: Record<string, string> = {
      page: "1",
      limit: rowsPerPage.toString(),
    };

    if (sortBy) newParams.sortBy = sortBy;
    if (order) newParams.sortOrder = order;
    if (role) newParams.role = role; // Only include role if it's set

    setSearchParams(newParams);
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        marginTop: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ my: 3, width: "100%" }}>
        <Typography
          variant="h4"
          component="h1"
          ml={3}
          mr={3}
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Admin Panel
          <FilterUsers
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          />
        </Typography>
        <Paper
          sx={{
            p: 4,
            width: "100%",
            maxWidth: "100%", // Ensure it uses the full width available
            boxShadow: 3,
            borderRadius: 2,
            position: "relative",
            overflowX: "auto", // Ensure overflow is handled
          }}
        >
          <UserTable
            users={users}
            isLoading={isLoading}
            fetchUsers={fetchUsers}
            editUserRole={editUserRole}
            loggedInUserId={loggedInUserId}
            editError={editError}
          />
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          mb: 8,
        }}
      >
        <Pagination
          count={Math.ceil(total / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
        <RowsPerPageSelect
          rowsPerPage={rowsPerPage}
          onChange={handleRowsPerPageChange}
          lowLimits={true}
        />
        <Box sx={{ ml: 4 }}>
          <BackToDashboardButton showIcon={isSmallScreen} />
        </Box>
      </Box>
    </Container>
  );
};

export default ManageUsers;
