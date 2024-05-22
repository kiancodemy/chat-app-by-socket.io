import {
  InputAdornment,
  Button,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { setcredential } from "../slices/userslice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Loading from "../components/Loading";
import { useLoginMutation } from "../slices/Userapi";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useForm } from "react-hook-form";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [log, { isLoading: isUpdating }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm();
  const credit = async () => {
    try {
      const response = await log({
        email: "credit@gmail.com",
        password: "123",
      }).unwrap();

      dispatch(setcredential(response));

      toast.success("Loged in Successfully !", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/chat");
    } catch (err) {
      toast.error("The mistake has happned", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await log(data).unwrap();

      dispatch(setcredential(response));

      toast.success("Loged in Successfully !", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/chat");
    } catch (err) {
      reset();
      toast.success(err?.data?.message, {
        position: "top-right",
        autoClose: 1500,
      });
    }
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
        onClick={credit}
        disabled={isSubmitting}
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
