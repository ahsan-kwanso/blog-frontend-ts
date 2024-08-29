// validation messages for zod
export const VALIDATION_MESSAGES = {
  email: {
    required: "Email is required",
    invalid: "Invalid email address",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 6 characters long",
  },
  name: {
    required: "Name is required",
  },
  title: {
    required: "Title must be at least 5 characters long",
    maxLength: "Title must be at most 100 characters long",
  },
  content: {
    minLength: "Content must be at least 10 characters long",
    maxLength: "Content must be at most 500 characters long",
  },
  reply: {
    empty: "Reply cannot be empty",
    onlySpaces: "Reply cannot be only spaces",
  },
};
