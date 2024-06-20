import {
  InputAdornment,
  Button,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import { useRegisterMutation } from "../slices/Userapi";
import { setcredential } from "../slices/userslice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswords = () => setShowPasswords((show) => !show);
  const [Adduser] = useRegisterMutation();

  //react hook form //
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  //image uploader
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //function for submiting form //

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmpassword) {
        toast.error("Passwotd and Confirm password shoud be same", {
          position: "top-right",
          autoClose: 2000,
        });
        return true;
      }
      const response = await Adduser(data).unwrap();
      dispatch(setcredential(response));

      toast.success("Signup Successfully", {
        position: "top-right",
        autoClose: 1500,
      });
      navigate("/chat");
    } catch (err) {
      toast.error(err?.data?.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
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
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
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
        id="password"
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
        id="confiremd"
        label="Confirm Password"
        variant="outlined"
      />
      {/*<TextField
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
      />*/}
      <Button
        type="submit"
        sx={{
          textTransform: "capitalize",
          color: "white",
          backgroundColor: "#0071ae",
          "&:hover": { backgroundColor: "#008DDA", color: "white" },
        }}
      >
        sign up
      </Button>
    </Stack>
  );
}

export default Signup;
