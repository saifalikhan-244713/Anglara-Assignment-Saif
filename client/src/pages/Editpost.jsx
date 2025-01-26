import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "", tags: [] });
  const navigate = useNavigate();

  // Fetch the post details when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:3000/api/posts/${id}`,
        { ...post },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => navigate("/my-post"))
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        
        <Typography variant="h4" gutterBottom className="text-center">
          Edit Post
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
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Content"
            name="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            variant="outlined"
            multiline
            rows={5}
            required
            fullWidth
          />
          <TextField
            label="Tags (comma-separated)"
            name="tags"
            value={post.tags.join(", ")}
            onChange={(e) =>
              setPost({ ...post, tags: e.target.value.split(",").map((tag) => tag.trim()) })
            }
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
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditPost;
