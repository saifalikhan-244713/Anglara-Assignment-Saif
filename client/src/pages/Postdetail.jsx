import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Card, CardContent } from "@mui/material";
import styles from "../styles/styles.module.css";

const Postdetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Post not found!
        </Typography>
      </Container>
    );
  }

  return (
    <div id={styles.postParent}>
      <Container sx={{ marginTop: 4 }}>
        {/* card to display the details of the post */}
        <Card sx={{ backgroundColor: "white", padding: 3 }}>
          <CardContent>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", fontFamily: "roboto" }}
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {post.content}
            </Typography>
            <Typography
              variant="caption"
              color="black"
              display="block"
              sx={{ marginTop: 3, fontWeight: "bold" }}
            >
              Tags: {post.tags.join(", ")}
            </Typography>
            <Typography
              variant="caption"
              color="black"
              display="block"
            >
              Created At: {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Postdetail;
