import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Container,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../styles/styles.module.css";

const Mypost = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = () => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${backendUrl}/api/my-posts`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    } else {
      navigate("/login");
    }
  };

  useEffect(fetchPosts, []);

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div id={styles.myPostParent}>
      <Container sx={{ marginTop: 4 }}>
        <Typography
          variant="h4"
          className="text-center"
          sx={{ fontFamily: "roboto" }}
          gutterBottom
        >
          My Posts
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {posts.map((post) => (
            <Card
              key={post._id}
              sx={{
                "&:hover": { backgroundColor: "lightgray" },
                width: "80vw",
                marginBottom: "30px",
                margin: "auto",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content.length > 100
                    ? `${post.content.slice(0, 100)}...`
                    : post.content}
                </Typography>
              </CardContent>

              <CardActions>
                <Tooltip title="Edit Post">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(post._id)}
                  >
                    <EditIcon />
                    <Typography
                      variant=""
                      sx={{ color: "blue", fontSize: "1.2rem" }}
                    >
                      Edit
                    </Typography>
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Mypost;
