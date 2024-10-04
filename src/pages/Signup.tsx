import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useError } from "../hooks/useError";
import { useForm } from "react-hook-form";
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
import { signupSchema } from "../validations/schemaValidations";
import useCustomNavigation from "../routes/useCustomNavigation";
import { PAGE_URL } from "../utils/settings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SignUpFormData } from "../types/Forms.interfaces";
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

const LoginLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Signup = (): JSX.Element => {
  const { signup, loading } = useContext(AuthContext);
  const [error, setError] = useError();
  const { showSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signup(data.name, data.email, data.password);
      showSnackbar("A verification Email is sent to your account");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
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
          Sign Up
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label={
              <span>
                Name <span style={{ color: "red" }}>*</span>
              </span>
            }
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
            {loading ? "Processing..." : "SIGN UP"}
          </SubmitButton>
          <LoginLink href={PAGE_URL.login} variant="body2">
            Already have an account? Sign In
          </LoginLink>
        </Form>
      </StyledPaper>
    </Container>
  );
};

export default Signup;
