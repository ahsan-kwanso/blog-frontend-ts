import React from "react";
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
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
import ConfirmAlert from "../Alerts/ConfirmAlert";
import SuccessAlert from "../Alerts/SuccessAlert";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", posts: 5 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", posts: 3 },
  // Add more mock data as needed
];

const UserTable = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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
      await SuccessAlert("Action Completed", `${action} was successful!`);
    }
  };

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
            {mockUsers.map((user) => (
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
                    <MenuItem onClick={() => handleAction("Make Admin")}>
                      Make Admin
                    </MenuItem>
                    <MenuItem onClick={() => handleAction("Dismiss as Admin")}>
                      Dismiss as Admin
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
