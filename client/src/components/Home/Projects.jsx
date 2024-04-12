import { useState, useEffect, useCallback } from "react";
import { Grid, Typography, Card, List, Fab, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import FormProjectDialog from "../Form/FormProjectDialog";
import FormProjectToRequest from "../Form/FormProjectToRequest";
import API from "../../api";

const Projects = () => {
  const [projectData, setProjectData] = useState([
    {
      email: "",
      designation: "",
      summary: "No data",
      reason: "",
      price: "",
    },
  ]);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [msg, setMsg] = useState(message);
  const [emailFor, setEmailFor] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const { _id, email } = user?.data?.userPayload;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenRequest = (val) => {
    setOpenRequest(true);
    setEmailFor(val);
  };

  const handleCloseRequest = () => {
    setOpenRequest(false);
    setEmailFor("");
  };

  const handleRefresh = () => {
    window.location.reload(true);
  };

  const handleDelete = (emailFor) => {
    setIsBusy(true);
    API.delete(`/request/delete/${emailFor}/${email}`)
      .then((response) => {
        const { data } = response;
        setMsg({ showMsg: true, success: data.success, text: data.message });
      })
      .catch((error) => {
        const { data } = error.response;
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
    setIsBusy(false);
    loadProjects();
  };

  const loadProjects = useCallback(() => {
    setIsBusy(true);
    API.get(`/project/view/${_id}`)
      .then((response) => {
        const { data } = response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
        if (data.data.length !== 0) {
          setProjectData(data.data);
          setApproved(data.usersStatus[1]);
          setPending(data.usersStatus[0]);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
  }, [_id]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <>
      {projectData[0].summary !== "No data" && <Message data={msg} onChangeData={{ setMsg }} />}
      <LoadingScreen data={{ isBusy }} onChangeData={{ setIsBusy }} />
      {projectData[0].summary === "No data" && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ border: "1px solid #e1e1e1" }}
        >
          <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
            {projectData[0].summary}
          </Grid>
        </Grid>
      )}
      <List sx={{ backgroundColor: "#dedaf1" }}>
        {projectData[0].summary !== "No data" &&
          projectData.map((project, index) => (
            <Card
              variant="elevation"
              key={index}
              sx={{ mb: "25px", ml: "220px", mr: "220px", backgroundColor: "aliceblue" }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ background: "linear-gradient(to right bottom, #243949, #513fa4)" }}
              >
                <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center", color: "azure" }}>
                  {project.summary}
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                    }}
                  >
                    Owner
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                    }}
                  >
                    Description
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                    }}
                  >
                    Contact
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                    }}
                  >
                    Budget
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
                    {`${project.username} (${project.designation})`}
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                      color: "grey",
                    }}
                  >
                    {project.reason}
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                      color: "grey",
                    }}
                  >
                    {project.email}
                  </Typography>
                  <Typography
                    style={{
                      padding: "1rem",
                      borderTop: "1px solid #e1e1e1",
                      color: "grey",
                    }}
                  >
                    {`${project.price} USD`}
                  </Typography>
                </Grid>
                {email !== project.email && (
                  <Grid
                    item
                    xs={12}
                    md={8}
                    lg={4}
                    sx={{ marginRight: "20px", marginLeft: "20px", marginBottom: "20px" }}
                  >
                    {pending.includes(project.email) && (
                      <Button
                        variant="contained"
                        color="info"
                        disabled={true}
                        sx={{ width: "10%", fontSize: "13px", textTransform: "none", borderRadius: "10px" }}
                      >
                        Sent
                      </Button>
                    )}
                    {approved.includes(project.email) && (
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ width: "10%", fontSize: "13px", textTransform: "none", borderRadius: "10px" }}
                        onClick={() => handleDelete(project.email)}
                      >
                        Unfollow
                      </Button>
                    )}
                    {!pending.includes(project.email) && !approved.includes(project.email) && (
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ width: "10%", fontSize: "13px", textTransform: "none", borderRadius: "10px" }}
                        onClick={() => handleClickOpenRequest(project.email)}
                      >
                        Follow
                      </Button>
                    )}
                  </Grid>
                )}
              </Grid>
            </Card>
          ))}
      </List>
      <FormProjectDialog open={open} onClose={handleClose} onRefresh={handleRefresh} />
      <FormProjectToRequest open={openRequest} onClose={handleCloseRequest} onRefresh={handleRefresh} data={emailFor} />
      <Fab
        variant="extended"
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
        Create
      </Fab>
    </>
  );
};

export default Projects;
