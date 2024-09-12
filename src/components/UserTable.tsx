import React, { useContext } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
import ConfirmAlert from "../Alerts/ConfirmAlert";
import SuccessAlert from "../Alerts/SuccessAlert";
import useFetchUsers from "../hooks/useFetchUsers";
import useEditUserRole from "../hooks/useEditUserRole";
import { AuthContext } from "../contexts/AuthContext";

const UserTable = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { users, isLoading, error, fetchUsers } = useFetchUsers();
  const {
    editUserRole,
    isLoading: isEditing,
    error: editError,
  } = useEditUserRole();
  const { user } = useContext(AuthContext);
  const loggedInUserId = user?.id;

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleAction = async (action: string) => {
    handleClose();
    const confirmed = await ConfirmAlert(
      "Confirm Action",
      `Are you sure you want to ${action} ${selectedUser?.name}?`
    );

    if (confirmed) {
      const role = action === "Make Admin" ? "admin" : "user";
      await editUserRole(selectedUser.id, role);
      if (!editError) {
        await fetchUsers(); //as it will help updating UI to update roles
        await SuccessAlert("Action Completed", `${action} was successful!`);
      }
    }
  };

  if (isLoading) return <Box>Loading...</Box>; // Show a loading state

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer>
        <Table sx={{ tableLayout: "relative" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Posts</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.posts}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleClick(e, user)}>
                    <AdminPanelSettingsIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedUser?.id === user.id}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => handleAction("Make Admin")}
                      disabled={
                        user.role === "admin" ||
                        user.id === Number(loggedInUserId)
                      }
                    >
                      Make Admin
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleAction("Dismiss as Admin")}
                      disabled={
                        user.role === "user" ||
                        user.id === Number(loggedInUserId)
                      }
                    >
                      Dismiss as Admin
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editError && (
        <Snackbar open={Boolean(editError)} autoHideDuration={6000}>
          <Alert severity="error">{editError}</Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default UserTable;
