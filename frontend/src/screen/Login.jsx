import {
  Container,
  Box,
  InputAdornment,
  Typography,
  Button,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useForm } from "react-hook-form";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isValid, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.image[0]);

    toast.success("Success Notification !", {
      position: "top-right",
      autoClose: 1500,
    });
  };
  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ paddingY: "10px" }}
      direction="column"
      gap={2}
    >
      <TextField
        error={errors?.email ? true : false}
        helperText={errors.email ? errors.email.message : " "}
        {...register("email", {
          required: { value: true, message: "Email Is Required" },
        })}
        sx={{
          "& .MuiInputLabel-root.Mui-focused": {
            color: !errors?.email && "#000",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: !errors?.email && "#000",
            },
        }}
        id="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        type={showPassword ? "text" : "password"}
        error={errors?.password ? true : false}
        helperText={errors.password ? errors.password.message : " "}
        {...register("password", {
          required: { value: true, message: "Password Is Required" },
        })}
        sx={{
          "& .MuiInputLabel-root.Mui-focused": {
            color: !errors?.password && "#000",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: !errors?.password && "#000",
            },
        }}
        id="pass"
        label="Password"
        variant="outlined"
      />
      <TextField
        error={errors?.image ? true : false}
        helperText={errors.image ? errors.image.message : " "}
        sx={{
          "& .MuiInputLabel-root.Mui-focused": {
            color: !errors?.image && "#000",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: !errors?.image && "#000",
            },
        }}
        label="Upload Image"
        {...register("image", {
          required: { value: true, message: "Image Is Required+" },
        })}
        type="file"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: {
            accept: "image/*",
          },
        }}
      />
      <Button
        type="submit"
        sx={{
          textTransform: "capitalize",
          color: "white",
          backgroundColor: "#0071ae",
          "&:hover": { backgroundColor: "#008DDA", color: "white" },
        }}
      >
        login
      </Button>
      <Button
        sx={{
          textTransform: "capitalize",
          color: "white",
          backgroundColor: "#b92121",
          "&:hover": { backgroundColor: "#E72929", color: "white" },
        }}
      >
        get guest user credential
      </Button>
    </Stack>
  );
}

export default Login;
