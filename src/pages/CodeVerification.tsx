import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Alert,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { useError } from "../hooks/useError";
import { PAGE_URL } from "../utils/settings";
import { AuthContext } from "../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailSchema } from "../validations/schemaValidations";
import { verifyFormData } from "../types/Forms.interfaces";
import useCustomNavigation from "../routes/useCustomNavigation";
import { useSnackbar } from "../contexts/SnackbarContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(8),
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const SignUpLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const CodeVerification = (): JSX.Element => {
  const { verifyEmail, loading } = useContext(AuthContext);
  const [error, setError] = useError();
  const { showSnackbar } = useSnackbar();
  const { loginPage } = useCustomNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const onSubmit = async (data: verifyFormData) => {
    setIsSubmitting(true); // Disable the button when form is submitted
    try {
      const response = await verifyEmail(data.email, data.code);
      if (response.data.message === "Email successfully verified!") {
        showSnackbar("Verified!");
        loginPage();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showSnackbar(error.message);
      } else {
        setError("Failed to verify email, An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false); // Re-enable the button after the API call is complete
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "100px" }}>
      <StyledPaper>
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
          Verify Your Email
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={
              <span>
                Email <span style={{ color: "red" }}>*</span>
              </span>
            }
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label={
              <span>
                Verification Code <span style={{ color: "red" }}>*</span>
              </span>
            }
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("code", { required: "Code is required" })}
            error={!!errors.code}
            helperText={errors.code?.message}
          />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting || loading} // Disable if submitting or loading
          >
            {isSubmitting || loading ? "Verifying..." : "Verify"}
          </SubmitButton>
          <SignUpLink href={PAGE_URL.signup} variant="body2">
            Didn't receive code? Sign Up
          </SignUpLink>
          <SignUpLink href={PAGE_URL.login} variant="body2" sx={{ ml: "50px" }}>
            Verified? Login
          </SignUpLink>
        </Form>
      </StyledPaper>
    </Container>
  );
};

export default CodeVerification;
