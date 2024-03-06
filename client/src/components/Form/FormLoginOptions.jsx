import { Typography, Divider, Button, Grid } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const FormLoginOptions = ({ onTabChange }) => {
  const navigate = useNavigate();

  const navigateToOtp = () => {
    onTabChange(1);
  };

  return (
    <>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"center"}>
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
                // console.log(credentialResponse);
                navigate("/home");
              }}
              onError={() => {
                console.log("Login Failed");
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
