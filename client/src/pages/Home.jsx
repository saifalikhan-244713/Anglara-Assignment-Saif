import { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles.module.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [matchPosts, setMatchPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); 
  const navigate = useNavigate();

  const pages = [
    { title: "Add Post", route: "/add-post" },
    { title: "My Post", route: "/my-post" },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts")
      .then((response) => {
        setPosts(response.data);
        setMatchPosts(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // Handles search for blog posts
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchKeyword(query);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setMatchPosts(filtered);
  };

  // dont allow more than 20 wordds for the post content
  const truncateContent = (content) => {
    const words = content.split(" ");
    return words.length > 20 ? `${words.slice(0, 20).join(" ")}...` : content;
  };

  const handleReadMoreClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div id={styles.mainParent}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Lobster",
                fontWeight: 700,
                fontSize: "3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blogs
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.title}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(page.route);
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
                {/* Add Logout button to the hamburger menu */}
                <MenuItem onClick={logout}>
                  <Typography sx={{ textAlign: "center", color: "red" }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.title}
                  onClick={() => navigate(page.route)}
                  sx={{
                    my: 2,
                    "&:hover": { backgroundColor: "darkred" },
                    color: "white",
                    display: "block",
                  }}
                >
                  {page.title}
                </Button>
              ))}
              <Button
                onClick={logout}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": { backgroundColor: "darkred" },
                }}
              >
                Logout
              </Button>
            </Box>

            {/* Search-bar for searching blog on the basis of category  */}
            <Box sx={{ flexGrow: 0 }}>
              <TextField
                placeholder="Search by title..."
                value={searchKeyword}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "white",
                  borderRadius: 1,
                  maxWidth: "200px",
                  margin: "auto",
                }}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {matchPosts.map((post) => (
            <Card
              key={post._id}
              sx={{
                "&:hover": { backgroundColor: "lightgray" },
                width: "80vw",
                marginBottom: "20px",
                cursor: "pointer",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", fontFamily: "roboto" }}
                  component="div"
                >
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truncateContent(post.content)}
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
                  color="text.secondary"
                  display="block"
                >
                  Created At: {new Date(post.createdAt).toLocaleDateString()}
                </Typography>

                {/* Read more Button to route to the /post/:id for the details of the post */}
                <Button
                  variant="text"
                  color="primary"
                  sx={{
                    alignSelf: "flex-start",
                    paddingLeft: 0,
                    color: "blue",
                    marginTop: 1,
                    textTransform: "none",
                  }}
                  onClick={() => handleReadMoreClick(post._id)}
                >
                  Read More 
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Home;
