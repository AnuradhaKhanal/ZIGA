import { useState, useEffect, useCallback } from "react";
import { Grid, Typography, Card, List, Fab, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import FormConnectionDialog from "../Form/FormConnectionDialog";
import API from "../../api";

const Connections = () => {
  const [connData, setConnData] = useState([
    {
      name: "No data",
      email: "",
      purpose: "",
      createdAt: "",
      id: "",
    },
  ]);
  const [msg, setMsg] = useState(message);
  const [isBusy, setIsBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const { _id } = user?.data?.userPayload;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    setIsBusy(true);
    API.delete(`/request/delete/${id}`)
      .then((response) => {
        const { data } = response;
        setMsg({ showMsg: true, success: data.success, text: data.message });
      })
      .catch((error) => {
        const { data } = error.response;
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
    setIsBusy(false);
    setConnData([
      {
        name: "No data",
        email: "",
        purpose: "",
        createdAt: "",
        id: "",
      },
    ]);
  };

  const handleRefresh = () => {
    window.location.reload(true);
  };

  const loadConnections = useCallback(() => {
    setIsBusy(true);
    const res = [];
    API.get(`/request/view/approved/${_id}`)
      .then((response) => {
        const { data } = response;
        setMsg({ showMsg: true, success: data.success, text: data.message });
        if (data.data.length !== 0) {
          data.data.forEach((conn, index) => {
            API.get(`/request/users/${conn.createdBy}`)
              .then((userRes) => {
                const { data } = userRes;
                if (data.data) {
                  res.push({
                    name: data.data.username,
                    email: data.data.email,
                    purpose: conn.purpose,
                    createdAt: conn.createdAt,
                    id: conn._id,
                  });
                }

                setConnData(res);
              })
              .catch((err) => {
                const { data } = err.response;
                setMsg({ showMsg: true, success: data.success, text: data.message });
              });
          });
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
    setIsBusy(false);
  }, [_id]);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  return (
    <>
      {connData[0].name !== "No data" && <Message data={msg} onChangeData={{ setMsg }} />}
      <LoadingScreen data={{ isBusy }} onChangeData={{ setIsBusy }} />
      {connData[0].name === "No data" && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ border: "1px solid #e1e1e1" }}
        >
          <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
            {connData[0].name}
          </Grid>
        </Grid>
      )}
      <List>
        {connData[0].name !== "No data" &&
          connData.map((conn, index) => (
            <Card
              variant="elevation"
              key={index}
              sx={{ mb: "25px", ml: "220px", mr: "220px", backgroundColor: "aliceblue" }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                    }}
                  >
                    Name
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                    }}
                  >
                    Message note
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "start" }}>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                      color: "grey",
                    }}
                  >
                    {conn.name}
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                      color: "grey",
                    }}
                  >
                    {conn.email}
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                      color: "grey",
                    }}
                  >
                    {conn.purpose}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={4} sx={{ marginRight: "20px", marginLeft: "20px", marginBottom: "20px" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ width: "10%", fontSize: "13px", textTransform: "none", borderRadius: "10px" }}
                    onClick={() => handleDelete(conn.id)}
                  >
                    Unfollow
                  </Button>
                </Grid>
              </Grid>
            </Card>
          ))}
      </List>
      <FormConnectionDialog open={open} onClose={handleClose} onRefresh={handleRefresh} />
      <Fab
        variant="extended"
        // color="success"
        onClick={handleClickOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          textTransform: "none",
          color: "white",
          background: "linear-gradient(to right bottom, #243949, #513fa4)",
        }}
      >
        <AddIcon sx={{ color: "white" }} />
        Connect
      </Fab>
    </>
  );
};

export default Connections;
