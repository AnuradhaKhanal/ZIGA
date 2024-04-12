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
  Button,
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
  ShoppingBag as ShoppingBagIcon,
  AccountCircle as AccountCircleIcon,
  HourglassBottom as HourglassBottomIcon,
  ExitToAppOutlined as ExitToAppOutlinedIcon,
} from "@mui/icons-material";

import Chat from "../../components/Home/Chat";
import Profile from "../../components/Home/Profile";
import Subscription from "../../components/Home/Subscription";
import Projects from "../../components/Home/Projects";
import Connections from "../../components/Home/Connections";
import PendingRequests from "../../components/Home/PendingRequests";

const drawerWidth = 240;

const HomePage = (props) => {
  const { window } = props;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [tab, setTab] = useState("Home");
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
    const token = user?.data?.token;
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
        {["Home", "Chats", "Requests", "Connections", "Premium"].map((text, index) => (
          <>
            {text === "Home" && (
              <ListItemButton key={index} selected={selected === index} onClick={() => handleMenuClick(text, index)}>
                <ListItemIcon>
                  <HomeIcon sx={{ color: "aliceblue" }} />
                </ListItemIcon>

                <ListItemText primary={text} sx={{ color: "silver" }} />
              </ListItemButton>
            )}
            {text === "Chats" && (
              <ListItemButton key={index} selected={selected === index} onClick={() => handleMenuClick(text, index)}>
                <ListItemIcon>
                  <ChatIcon sx={{ color: "aliceblue" }} />
                </ListItemIcon>

                <ListItemText primary={text} sx={{ color: "silver" }} />
              </ListItemButton>
            )}
            {text === "Premium" && (
              <ListItemButton key={index} selected={selected === index} onClick={() => handleMenuClick(text, index)}>
                <ListItemIcon>
                  <ShoppingBagIcon sx={{ color: "aliceblue" }} />
                </ListItemIcon>

                <ListItemText primary={text} sx={{ color: "silver" }} />
              </ListItemButton>
            )}
            {text === "Connections" && (
              <ListItemButton key={index} selected={selected === index} onClick={() => handleMenuClick(text, index)}>
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "aliceblue" }} />
                </ListItemIcon>

                <ListItemText primary={text} sx={{ color: "silver" }} />
              </ListItemButton>
            )}
            {text === "Requests" && (
              <ListItemButton key={index} selected={selected === index} onClick={() => handleMenuClick(text, index)}>
                <ListItemIcon>
                  <HourglassBottomIcon sx={{ color: "aliceblue" }} />
                </ListItemIcon>

                <ListItemText primary={text} sx={{ color: "silver" }} />
              </ListItemButton>
            )}
          </>
        ))}
      </List>
      <Divider />
      <List>
        {["Profile"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton selected={selected === 5} onClick={() => handleMenuClick(text, 5)}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "aliceblue" }} />
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: "silver" }} />
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
        color="default"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          color: "#243949",
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
            {`${tab}`}
          </Typography>
          <Button
            variant="text"
            color="secondary"
            sx={{ width: "10%", fontSize: "13px", textTransform: "none", marginLeft: "65rem" }}
            onClick={logout}
          >
            Logout
            <ExitToAppOutlinedIcon sx={{ padding: "3px" }} />
          </Button>
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
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "linear-gradient(to left top, #243949, #513fa4)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "linear-gradient(to bottom, #243949, #513fa4)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ backgroundColor: "#dedaf1", flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {tab === "Home" && <Projects />}
        {tab === "Chats" && <Chat />}
        {tab === "Profile" && <Profile />}
        {tab === "Premium" && <Subscription />}
        {tab === "Connections" && <Connections />}
        {tab === "Requests" && <PendingRequests />}
      </Box>
    </Box>
  );
};

HomePage.propTypes = {
  window: PropTypes.func,
};

export default HomePage;
