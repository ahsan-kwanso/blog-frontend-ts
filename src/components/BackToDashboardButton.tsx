import { Button } from "@mui/material";
import useCustomNavigation from "../routes/useCustomNavigation";

const BackToDashboardButton = () => {
  const { postsPage } = useCustomNavigation();

  const handleBackToDashboard = () => {
    postsPage();
  };
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleBackToDashboard}
      sx={{
        marginBottom: "10px",
      }}
    >
      Back to Dashboard
    </Button>
  );
};

export default BackToDashboardButton;
