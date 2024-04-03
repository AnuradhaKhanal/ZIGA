import { useState } from "react";
import { DialogTitle, Dialog, Grid, Typography, FormControl, Button, TextField } from "@mui/material";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import API from "../../api";

const FormProjectDialog = (props) => {
  const { onClose, open, onRefresh } = props;

  const [msg, setMsg] = useState(message);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isBusy, setIsBusy] = useState(false);
  const [formData, setformData] = useState({
    designation: "",
    summary: "",
    reason: "",
    price: "",
  });

  const handleClose = () => {
    onClose();
  };

  const handleContinue = () => {
    setIsBusy(true);
    const { email, phone } = user?.data?.userPayload;

    API.post("/project/add", { ...formData, email, phone })
      .then((success) => {
        const { data } = success;
        setMsg({ showMsg: true, success: data.success, text: data.message });
        handleClose();
        setformData({ designation: "", summary: "", reason: "", price: "" });
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
    onRefresh();
    setIsBusy(false);
  };

  const handleFormChange = (key, e) => {
    let update = { [key]: e.target.value };
    setformData((prev) => ({
      ...prev,
      ...update,
    }));
  };
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Create New Project</DialogTitle>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"left"}>
        <Message data={msg} onChangeData={{ setMsg }} />
        <LoadingScreen data={{ isBusy }} onChangeData={{ setIsBusy }} />

        <Grid item xs={12} md={8} lg={4} sx={{ marginRight: "20px", marginLeft: "20px", marginBottom: "20px" }}>
          <Typography variant="body1" sx={{ opacity: "1" }}>
            Title&nbsp;<span style={{ color: "red" }}>*</span>
          </Typography>
          <FormControl sx={{ marginTop: "10px" }}>
            <TextField
              sx={{ width: "200%" }}
              value={formData.summary}
              placeholder="Enter a title for your project"
              onChange={(e) => handleFormChange("summary", e)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4} sx={{ marginRight: "20px", marginLeft: "20px", marginBottom: "20px" }}>
          <Typography variant="body1" sx={{ opacity: "1" }}>
            Description&nbsp;<span style={{ color: "red" }}>*</span>
          </Typography>
          <FormControl sx={{ marginTop: "10px" }}>
            <TextField
              sx={{ width: "200%" }}
              value={formData.reason}
              multiline
              rows={3}
              placeholder="Enter a description for your project"
              helperText="Write upto 300 words"
              onChange={(e) => handleFormChange("reason", e)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4} sx={{ marginRight: "20px", marginLeft: "20px", marginBottom: "20px" }}>
          <Typography variant="body1" sx={{ opacity: "1" }}>
            Designation&nbsp;<span style={{ color: "red" }}>*</span>
          </Typography>
          <FormControl sx={{ marginTop: "10px" }}>
            <TextField
              sx={{ width: "200%" }}
              placeholder="Enter your designation"
              value={formData.designation}
              onChange={(e) => handleFormChange("designation", e)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4} sx={{ marginRight: "20px", marginLeft: "20px", marginBottom: "20px" }}>
          <Typography variant="body1" sx={{ opacity: "1" }}>
            Price&nbsp;<span style={{ color: "red" }}>*</span>
          </Typography>
          <FormControl sx={{ marginTop: "10px" }}>
            <TextField
              sx={{ width: "200%" }}
              value={formData.price}
              placeholder="Quote a fair price"
              helperText="Currency is USD by default"
              onChange={(e) => handleFormChange("price", e)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4} sx={{ marginRight: "20px", marginLeft: "20px", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="warning"
            sx={{ width: "10%", fontSize: "13px", textTransform: "none", borderRadius: "10px", marginRight: "20px" }}
            onClick={handleContinue}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: "10%", fontSize: "13px", textTransform: "none", borderRadius: "10px" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default FormProjectDialog;
