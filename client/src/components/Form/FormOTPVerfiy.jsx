import { Grid, Typography, Box, Button, TextField } from "@mui/material";
import API from "../../api";

const FormOTPVerfiy = ({ onTabChange, onDataChange, data }) => {
  const handleBackButton = () => {
    onTabChange(0);
  };

  const handleSendOTP = (e) => {
    API.post("/auth/otp/get", { email: data.email, phone: data.phone })
      .then((success) => {
        const { data, status } = success;
        if (status === 200) {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    onDataChange.clearOtp();
  };

  const handleContinue = (e) => {
    API.post("/auth/otp/verify", { email: data.email, phone: data.phone, otp: data.otp })
      .then((success) => {
        const { data, status } = success;
        if (status === 200) {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    onDataChange.clearOtp();
    onTabChange(2);
  };

  return (
    <>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="h6" sx={{ opacity: "0.8", marginTop: "30px" }}>
            Get your account verified before starting in
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={data.email}
                onChange={onDataChange.handleEmailChange}
              />
            </div>
            <div>
              <TextField
                required
                label="Phone"
                placeholder="Enter your phone number"
                value={data.phone}
                onChange={onDataChange.handlePhoneChange}
              />
            </div>
            <Button
              variant="text"
              color="primary"
              sx={{ width: "100%", fontSize: "13px", textTransform: "none", marginTop: "10px" }}
              onClick={handleSendOTP}
            >
              Send OTP
            </Button>
            <div>
              <TextField
                required
                label="OTP"
                placeholder="Enter OTP"
                value={data.otp}
                onChange={onDataChange.handleOtpChange}
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Button
            variant="contained"
            color="warning"
            sx={{
              width: "100%",
              fontSize: "13px",
              textTransform: "none",
              marginTop: "30px",
              borderRadius: "10px",
            }}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Button
            variant="text"
            color="primary"
            sx={{ width: "100%", fontSize: "13px", textTransform: "none", marginTop: "50px" }}
            onClick={handleBackButton}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FormOTPVerfiy;
