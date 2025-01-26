import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import styles from "../styles/styles.module.css";

const Addpost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:3000/api/posts",
        {
          title: post.title,
          content: post.content,
          tags: post.tags.split(",").map((tag) => tag.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        setPost({ title: "", content: "", tags: "" }); 
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  return (
    <div id={styles.addParent}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: 4, margin: "auto 0", maxWidth: "400px", width: "90%" }}
        >
          <Typography variant="h4" gutterBottom className="text-center" sx={{fontFamily:"roboto", fontWeight:"bold"}}>
            Add a New Post
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Title"
              name="title"
              value={post.title}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              label="Content"
              name="content"
              value={post.content}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={5}
              required
              fullWidth
            />
            <TextField
              label="please add the tags"
              name="tags"
              value={post.tags}
              onChange={handleChange}
              variant="outlined"
              placeholder="e.g., tech, coding, blog"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ alignSelf: "center" }}
            >
              Submit Post
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Addpost;
