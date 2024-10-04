import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";
import { useError } from "../hooks/useError";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Link,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/schemaValidations";
import useCustomNavigation from "../routes/useCustomNavigation";
import { PAGE_URL } from "../utils/settings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoginFormData } from "../types/Forms.interfaces";
import { useSnackbar } from "../contexts/SnackbarContext";

// Define styled components
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

const SignupLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Login = (): JSX.Element => {
  const { signin, loading } = useContext(AuthContext);
  const { postsPage } = useCustomNavigation();
  const [error, setError] = useError();
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signin(data.email, data.password);
      postsPage();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (
          error.message ===
          "Email not verified. A verification link has been sent to your email."
        ) {
          showSnackbar(
            "Email not verified. A verification link has been sent to your email."
          );
        } else {
          setError(error.message);
        }
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "100px" }}>
      <StyledPaper>
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
          Sign In
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
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label={
              <span>
                Password <span style={{ color: "red" }}>*</span>
              </span>
            }
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
          >
            {loading ? "Processing..." : "SIGN IN"}
          </SubmitButton>
          <SignupLink href={PAGE_URL.signup} variant="body2">
            Don't have an account? Sign Up
          </SignupLink>
        </Form>
      </StyledPaper>
    </Container>
  );
};

export default Login;
