import React from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { replySchema } from "../validations/schemaValidations";
import useCreateComment from "../hooks/useCreateComment";
import { useError } from "../hooks/useError";

const ReplyForm = ({ postId, parentId, onClose }) => {
  const { createComment, error } = useCreateComment();
  const [formError, setFormError] = useError();

  // Initialize react-hook-form with Zod schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(replySchema),
    defaultValues: {
      reply: "",
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      await createComment({
        PostId: postId,
        content: data.reply,
        ParentId: parentId || null,
      });
      reset(); // Clear the input field
      onClose(); // Close the form after submission
    } catch (error) {
      setFormError("Failed to submit reply. Please try again.");
      console.error("Failed to submit reply", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ mt: 2 }}
    >
      {(error || formError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || formError}
        </Alert>
      )}
      <TextField
        {...register("reply")}
        fullWidth
        label="Write a reply..."
        multiline
        rows={4}
        variant="outlined"
        error={!!errors.reply}
        helperText={errors.reply?.message}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="submit" variant="contained" color="primary">
          Reply
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default ReplyForm;
