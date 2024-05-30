/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

import { login } from "../../api"; // Import login function from api
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, _] = useState(false);
  const navigation = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const loginResponse = await login({ email, password }); // Call login function
    console.log(loginResponse?.status);
    if (loginResponse?.status === 200) {
      localStorage.setItem(
        "accessToken",
        loginResponse?.data?.data?.accessToken
      );
      navigation("/readings");
    } else {
      toast("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "200px" }}>
      <ToastContainer />
      <Typography variant="h4" align="center" gutterBottom>
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={alertOpen}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
