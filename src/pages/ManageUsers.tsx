import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  SelectChangeEvent,
  Pagination,
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

const ManageUsers = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? `${defaultPage}`);
  const limit = parseInt(searchParams.get("limit") ?? `${defaultLimitUser}`);
  const [rowsPerPage, setRowsPerPage] = useState<number>(limit);
  const { users, isLoading, error, fetchUsers, total, nextPage } =
    useFetchUsers(page, limit);
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
    // Define the type for newParams
    const newParams: Record<string, string> = {
      page: value.toString(),
      limit: rowsPerPage.toString(),
    };

    setSearchParams(newParams);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newLimit = event.target.value as string;
    setRowsPerPage(Number(newLimit)); // Ensure rowsPerPage is a number

    // Define the type for newParams
    const newParams: Record<string, string> = {
      page: "1", // Set page to 1 when changing rows per page
      limit: newLimit,
    };

    setSearchParams(newParams);
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        marginTop: "80px", // Adjusted margin for centering
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centers the content horizontally
        justifyContent: "center", // Centers the content vertically
      }}
    >
      <Box sx={{ my: 3, textAlign: "center", width: "100%" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold", // Make the title bold for emphasis
            color: "primary.main", // Use theme's primary color for the title
          }}
        >
          User Management
        </Typography>
        <Paper
          sx={{
            p: 4, // More padding for a cleaner layout
            width: "100%", // Full width for the table to fit the container
            maxWidth: "800px", // Set a max width for the content
            boxShadow: 3, // Add some shadow for depth
            borderRadius: 2, // Rounded corners for a modern look
            position: "relative", // Set relative positioning for the Paper
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
          <Box
            sx={{
              position: "absolute",
              right: 0, // Aligns the button to the right
              mt: 5,
              mr: 2, // Margin right for spacing
            }}
          >
            <BackToDashboardButton />
          </Box>
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
      </Box>
    </Container>
  );
};

export default ManageUsers;
