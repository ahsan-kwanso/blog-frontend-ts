import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { AuthContext } from "../contexts/AuthContext";
import { useError } from "../hooks/useError";
import useCustomNavigation from "../routes/useCustomNavigation";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useLocation } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(8),
}));

const CodeVerification = (): JSX.Element => {
  const { verifyEmail, loading } = useContext(AuthContext);
  const [error, setError] = useError();
  const { showSnackbar } = useSnackbar();
  const { loginPage } = useCustomNavigation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const location = useLocation();

  // Extract token from URL and trigger email verification
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      const verifyUserEmail = async () => {
        try {
          setIsVerifying(true);
          const response = await verifyEmail(token); // Only the token is needed now
          if (response.data.message === "Email successfully verified!") {
            showSnackbar("Email Verified!");
            setVerificationSuccess(true);
            loginPage(); // Redirect to login after a short delay or immediately
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Failed to verify email, an unknown error occurred.");
          }
        } finally {
          setIsVerifying(false);
        }
      };

      verifyUserEmail();
    } else {
      setError("Invalid or missing verification token.");
      setIsVerifying(false);
    }
  }, [location.search, verifyEmail, setError, showSnackbar, loginPage]);

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "100px" }}>
      <StyledPaper>
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
          {verificationSuccess ? "Email Verified" : "Verify Your Email"}
        </Typography>

        {isVerifying ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        ) : (
          <Typography sx={{ mt: 2 }}>
            Your email has been successfully verified!
          </Typography>
        )}
      </StyledPaper>
    </Container>
  );
};

export default CodeVerification;
