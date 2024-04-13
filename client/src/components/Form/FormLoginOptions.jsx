import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Typography, Divider, Button, Grid } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import API from "../../api";

const FormLoginOptions = ({ onTabChange }) => {
  const [token, setToken] = useState(null);
  const [msg, setMsg] = useState(message);
  const navigate = useNavigate();

  const navigateToOtp = () => {
    onTabChange(1);
  };

  const handleGoogleLogin = () => {
    if (token) {
      const decodedToken = jwtDecode(token.credential);
      API.post("/auth/signin/google", { email: decodedToken.email, username: decodedToken.name })
        .then((response) => {
          const { data } = response;
          setMsg({ showMsg: true, success: data.success, text: data.message });
          localStorage.setItem("profile", JSON.stringify(data));
          navigate("/home");
        })
        .catch((error) => {
          const { data } = error.response;
          setMsg({ showMsg: true, success: data.success, text: data.message });
        });
    }
  };

  return (
    <>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Message data={msg} onChangeData={{ setMsg }} />
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="h6" sx={{ opacity: "0.8", marginTop: "30px" }}>
            Welcome! How do you want to get started?
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={4} sx={{ marginTop: "20px" }}>
          <GoogleOAuthProvider clientId="412394209123-ejdgnlpt97tipob0unri97hdu6e9mqqk.apps.googleusercontent.com">
            <GoogleLogin
              text="Continue with Google"
              shape="pill"
              onSuccess={(credentialResponse) => {
                setToken(credentialResponse);
                handleGoogleLogin();
              }}
              onError={() => {
                setMsg({ showMsg: true, success: false, text: "Google signin failed" });
              }}
            />
          </GoogleOAuthProvider>
        </Grid>
        <Divider variant="fullwidth" style={{ opacity: "0.6", width: "20%", marginTop: "30px" }}>
          or
        </Divider>
        <Grid item xs={12} md={8} lg={4}>
          <Button
            variant="text"
            color="warning"
            sx={{ width: "100%", fontSize: "13px", textTransform: "none" }}
            onClick={navigateToOtp}
          >
            Use phone number and email
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FormLoginOptions;
