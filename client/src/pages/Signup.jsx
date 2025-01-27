import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Link,
} from "@mui/material";
import styles from "../styles/styles.module.css";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(`${backendUrl}/signup`, formData)
      .then((response) => {
        console.log("Response: " + response.data.message);
        Navigate("/login");
      })
      .catch((error) => console.log("Error creating user: " + error.message));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id={styles.signupParent}>
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSignup}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </form>

          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" sx={{ color: "blue" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
