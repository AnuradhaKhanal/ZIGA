import { useState, useEffect, useCallback } from "react";
import { Send as SendIcon } from "@mui/icons-material";
import {
  Divider,
  Paper,
  Grid,
  TextField,
  Fab,
  Avatar,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import API from "../../api";

const Chat = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { _id, username } = user?.data?.userPayload;
  const [users, setUsers] = useState([
    {
      _id,
      username,
    },
  ]);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [msg, setMsg] = useState(message);
  const [isBusy, setIsBusy] = useState(false);
  const [receiverUser, setReceiverUser] = useState("");
  const [chatInput, setchatInput] = useState("");

  const formatDate = (val) => {
    let time = new Date(val).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return time;
  };

  const handleMessageChange = (e) => {
    setchatInput(e.target.value);
  };

  const handleSendMsg = () => {
    setIsBusy(true);
    API.post("/chat/add", { sender: _id, receiver: receiverUser, body: chatInput })
      .then((response) => {
        const { data } = response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
        handleChatClick(receiverUser);
        setchatInput("");
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
  };

  const handleChatClick = (user_id) => {
    setReceiverUser(user_id);
    setIsBusy(true);
    API.post("/chat/messages", { sender: _id, receiver: user_id })
      .then((response) => {
        const { data } = response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
        if (data.data.length !== 0) {
          setChatMsgs(data.data);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
  };

  const loadUsers = useCallback(() => {
    setIsBusy(true);
    API.get(`/chat/connections/${_id}`)
      .then((response) => {
        const { data } = response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
        if (data.data.length !== 0) {
          setUsers(data.data);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
  }, [_id]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div>
      <Message data={msg} onChangeData={{ setMsg }} />
      <LoadingScreen data={{ isBusy }} onChangeData={{ setIsBusy }} />
      <Grid
        container
        component={Paper}
        sx={{
          width: "100%",
          height: "80vh",
        }}
      >
        <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
          <List>
            <ListItem key="You">
              <ListItemIcon>
                <Avatar alt="You" src="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText primary="You"></ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
          </Grid>
          <Divider />
          <List>
            {users.map((user, index) => (
              <ListItem key={index} onClick={() => handleChatClick(user._id)}>
                <ListItemIcon>
                  <Avatar alt={user.username} sx={{ backgroundColor: "#513fa4" }}>
                    {user.username?.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={user.username}>{user.username}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List
            sx={{
              height: "70vh",
              overflowY: "auto",
            }}
          >
            {chatMsgs.map((msg, index) => (
              <ListItem key={index} sx={{ backgroundColor: "aliceblue" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align={msg.sender === _id ? "right" : "left"}
                      primary={msg.body}
                      sx={
                        msg.sender === _id
                          ? {
                              backgroundColor: "#2e245c",
                              color: "white",
                              width: "fit-content",
                              padding: "5px",
                              borderRadius: "8px",
                              marginLeft: "auto",
                            }
                          : {
                              backgroundColor: "#4a3993",
                              color: "white",
                              width: "fit-content",
                              padding: "5px",
                              borderRadius: "8px",
                              marginRight: "auto",
                            }
                      }
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <span
                      style={{
                        backgroundColor: "linear-gradient(to right bottom, #243949, #513fa4)",
                        borderRadius: "2px",
                      }}
                    >
                      <ListItemText
                        align={msg.sender === _id ? "right" : "left"}
                        secondary={formatDate(msg.createdAt)}
                      ></ListItemText>
                    </span>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: "10px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-msg"
                label="Type Something"
                fullWidth
                value={chatInput}
                onChange={handleMessageChange}
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab
                disabled={receiverUser === ""}
                onClick={handleSendMsg}
                sx={{ background: "linear-gradient(to right bottom, #243949, #513fa4)" }}
              >
                <SendIcon sx={{ color: "white" }} />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
