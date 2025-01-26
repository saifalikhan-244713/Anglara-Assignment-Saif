import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Link,
} from "@mui/material";
import styles from "../styles/styles.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      console.log("Login successful");
      navigate("/post");
    } catch (error) {
      console.log("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={styles.loginParent}>
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </form>

          {/* Don't have an account? Sign up link */}
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/signup" sx={{ color: "blue", textDecoration: "none" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
