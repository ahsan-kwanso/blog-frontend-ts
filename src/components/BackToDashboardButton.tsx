import { Button, IconButton, Tooltip } from "@mui/material";
import useCustomNavigation from "../routes/useCustomNavigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Home } from "@mui/icons-material";

interface DashButtonProps {
  showIcon?: boolean;
}
const BackToDashboardButton = ({
  showIcon = false,
}: DashButtonProps): React.JSX.Element => {
  const { postsPage } = useCustomNavigation();

  const handleBackToDashboard = () => {
    postsPage();
  };
  if (showIcon) {
    return (
      <Tooltip title="Back to Dashboard">
        <IconButton
          color="secondary"
          onClick={handleBackToDashboard}
          sx={{
            marginBottom: "10px",
          }}
        >
          <Home />
        </IconButton>
      </Tooltip>
    );
  }

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
