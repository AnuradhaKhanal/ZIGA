import { useState, useEffect, useCallback } from "react";
import { Grid, Typography, Card, List, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import FormProjectDialog from "../Form/FormProjectDialog";
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
  const [msg, setMsg] = useState(message);
  const [isBusy, setIsBusy] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    window.location.reload(true);
  };

  const loadProjects = useCallback(() => {
    setIsBusy(true);
    API.get("/project/view")
      .then((response) => {
        const { data } = response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
        if (data.data.length !== 0) {
          setProjectData(data.data);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
  }, []);

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
              </Grid>
            </Card>
          ))}
      </List>
      <FormProjectDialog open={open} onClose={handleClose} onRefresh={handleRefresh} />
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
        Create
      </Fab>
    </>
  );
};

export default Projects;
