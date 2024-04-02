import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Grid, Typography, Box, Button, TextField } from "@mui/material";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import API from "../../api";

const FormOTPVerfiy = ({ onTabChange, onDataChange, data }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [msg, setMsg] = useState(message);
  const [isBusy, setIsBusy] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleBackButton = () => {
    onTabChange(0);
  };

  const logout = () => {
    localStorage.removeItem("profile");
    navigate("/");
    setUser(null);
  };

  const handleSendOTP = (e) => {
    setIsBusy(true);
    API.post("/auth/otp/get", { email: data.email, phone: data.phone })
      .then((response) => {
        const { data } = response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
        console.log(data);
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
    onDataChange.clearOtp();
  };

  const handleLogin = () => {
    setIsBusy(true);
    API.post("/auth/signin", { email: data.email, phone: data.phone })
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          localStorage.setItem("profile", JSON.stringify(data));
          setIsBusy(false);
          setMsg({ showMsg: true, success: data.success, text: data.message });
          navigate("/home");
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
  };

  const handleContinue = (e) => {
    setIsBusy(true);
    let isLogin = location.pathname === "/login";

    API.post("/auth/otp/verify", { email: data.email, phone: data.phone, otp: data.otp, isLogin })
      .then((success) => {
        const { data } = success;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });

        // In case of login operation
        if (isLogin) {
          handleLogin();
        } else {
          onTabChange(2);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });

    onDataChange.clearOtp();
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

  return (
    <>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Message data={msg} onChangeData={{ setMsg }} />
        <LoadingScreen data={{ isBusy }} onChangeData={{ setIsBusy }} />
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
