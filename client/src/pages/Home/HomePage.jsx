import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import Chat from "../../components/Home/Chat";
import Profile from "../../components/Home/Profile";
import Requests from "../../components/Home/Requests";
import Projects from "../../components/Home/Projects";

const drawerWidth = 240;

const HomePage = (props) => {
  const { window } = props;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [tab, setTab] = useState("Projects");
  const [selected, setSelected] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("profile");
    navigate("/");
    setUser(null);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenuClick = (tabName, index) => {
    setTab(tabName);
    setSelected(index);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {["Projects", "Chats", "Requests"].map((text, index) => (
          <>
            {text === "Projects" && (
              <ListItemButton selected={selected === index} onClick={() => handleMenuClick(text, index)}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItemButton>
            )}
            {text === "Chats" && (
              <ListItemButton selected={selected === index} onClick={() => handleMenuClick(text, index)}>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItemButton>
            )}
            {text === "Requests" && (
              <ListItemButton selected={selected === index} onClick={() => handleMenuClick(text, index)}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItemButton>
            )}
          </>
        ))}
      </List>
      <Divider />
      <List>
        {["Profile"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton selected={selected === 3} onClick={() => handleMenuClick(text, 3)}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          color: "orange",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Ziga - Home
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {/* <Typography paragraph>Home page for Ziga</Typography> */}
        {tab === "Projects" && <Projects />}
        {tab === "Chats" && <Chat />}
        {tab === "Profile" && <Profile />}
        {tab === "Requests" && <Requests />}
      </Box>
    </Box>
  );
};

HomePage.propTypes = {
  window: PropTypes.func,
};

export default HomePage;
