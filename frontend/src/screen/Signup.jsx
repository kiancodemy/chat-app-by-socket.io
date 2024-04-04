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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useForm } from "react-hook-form";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswords = () => setShowPasswords((show) => !show);

  const {
    register,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => console.log(data);
  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ paddingY: "10px" }}
      direction="column"
      gap={1}
    >
      <TextField
        error={errors?.name ? true : false}
        helperText={errors.name ? errors.name.message : " "}
        {...register("name", {
          required: { value: true, message: "Name Is Required" },
        })}
        sx={{
          "& .MuiInputLabel-root.Mui-focused": {
            color: !errors?.name && "#000",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: !errors?.name && "#000",
            },
        }}
        id="name"
        label="Name"
        variant="outlined"
      />
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPasswords}>
                {showPasswords ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        type={showPasswords ? "text" : "password"}
        error={errors?.confirmpassword ? true : false}
        helperText={
          errors.confirmpassword ? errors.confirmpassword.message : " "
        }
        {...register("confirmpassword", {
          required: { value: true, message: "Confirm Password Is Required" },
        })}
        sx={{
          "& .MuiInputLabel-root.Mui-focused": {
            color: !errors?.confirmpassword && "#000",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: !errors?.confirmpassword && "#000",
            },
        }}
        id="pass"
        label="Confirm Password"
        variant="outlined"
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
    </Stack>
  );
}

export default Signup;
