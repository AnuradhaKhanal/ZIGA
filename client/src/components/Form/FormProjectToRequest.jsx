import { useState } from "react";
import { DialogTitle, Dialog, Grid, Typography, FormControl, Button, TextField } from "@mui/material";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import API from "../../api";

const FormProjectToRequest = (props) => {
  const { onClose, open, onRefresh, data } = props;
  const user = JSON.parse(localStorage.getItem("profile"));
  const [msg, setMsg] = useState(message);
  const [isBusy, setIsBusy] = useState(false);
  const [formData, setformData] = useState({
    purpose: "",
    emailBy: "",
    emailFor: "",
    phoneBy: "",
  });

  const handleClose = () => {
    onClose();
  };

  const handleContinue = () => {
    setIsBusy(true);
    const { email, phone } = user?.data?.userPayload;

    API.post("/request/send", { ...formData, emailBy: email, phoneBy: phone, emailFor: data })
      .then((success) => {
        const { data } = success;
        setMsg({ showMsg: true, success: data.success, text: data.message });
        handleClose();
        setformData({ purpose: "", emailBy: "", emailFor: "", phoneBy: "" });
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
      <DialogTitle>Send connection request</DialogTitle>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"left"}>
        <Message data={msg} onChangeData={{ setMsg }} />
        <LoadingScreen data={{ isBusy }} onChangeData={{ setIsBusy }} />

        <Grid item xs={12} md={8} lg={4} sx={{ marginRight: "20px", marginLeft: "20px", marginBottom: "20px" }}>
          <Typography variant="body1" sx={{ opacity: "1" }}>
            Note message
          </Typography>
          <FormControl sx={{ marginTop: "10px" }}>
            <TextField
              sx={{ width: "200%" }}
              value={formData.purpose}
              placeholder="Provide a short note about the purpose of request"
              onChange={(e) => handleFormChange("purpose", e)}
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
            Send
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

export default FormProjectToRequest;
