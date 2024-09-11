import React, { useState, useEffect, useContext } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Home } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Person } from "@mui/icons-material";
import SignOutButton from "./SignOutButton";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import ManageButton from "./ManageButton";
import useCustomNavigation from "../routes/useCustomNavigation";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getToken } from "../utils/authUtils";

const Sidebar = (): JSX.Element => {
  const isSmallScreen = useMediaQuery("(max-width:800px)");
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const isUserLoggedIn = getToken();
  const { postsPage, myPostsPage } = useCustomNavigation();
  const [selectedTab, setSelectedTab] = useState<null | 0 | 1>(null); // Initialize as null to handle loading state
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const filter = searchParams.get("filter");
    setSelectedTab(filter === "my-posts" ? 1 : 0);
  }, [searchParams]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0 || newValue === 1) {
      setSelectedTab(newValue);
      if (newValue === 0) {
        postsPage();
      } else if (newValue === 1) {
        myPostsPage();
      }
    }
  };

  // Render nothing until the selectedTab is properly set
  if (selectedTab === null) {
    return <></>;
  }

  return (
    <Box
      sx={{
        width: isSmallScreen ? 80 : 170,
        height: "100vh",
        position: { xs: "fixed", sm: "fixed" },
        top: 0,
        left: 0,
        backgroundColor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        boxShadow: 2,
      }}
    >
      <Tabs
        orientation="vertical"
        aria-label="Sidebar tabs"
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          flexGrow: 1,
          mt: 7,
          "& .MuiTab-root": {
            // Adjust padding and margin for small screens
            px: isSmallScreen ? 1 : 2,
            py: isSmallScreen ? 1 : 2,
            "& svg": {
              // Adjust margin for icons
              mr: isSmallScreen ? 5 : 1,
            },
            "&:hover": {
              "& .MuiTypography-root": {
                color: (theme) => theme.palette.primary.main,
              },
              "& svg": {
                color: (theme) => theme.palette.primary.main,
              },
            },
          },
        }}
      >
        <Tab label={isSmallScreen ? <Home /> : "All Posts"} />
        <Tab label={isSmallScreen ? <Person /> : "My Posts"} />
      </Tabs>
      <Box sx={{ marginTop: "auto", mb: 7, ml: isSmallScreen ? 0 : 2 }}>
        {user && isUserLoggedIn ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mr: 1 }}>
            {isAdmin && <ManageButton isSmallScreen={isSmallScreen} />}
            <SignOutButton isSmallScreen={isSmallScreen} />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mr: 2 }}>
            <LoginButton isSmallScreen={isSmallScreen} />
            <SignUpButton isSmallScreen={isSmallScreen} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
