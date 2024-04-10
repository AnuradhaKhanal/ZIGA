import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@mui/material";
import pgimage from "../../assets/images/landingpg.png";
import logo from "../../assets/images/logoNB.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToRegister = () => {
    navigate("/join");
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        minHeight: "600px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "ButtonShadow",
      }}
    >
      <Grid container spacing={6} sx={{ display: "flex", alignItems: "center", maxWidth: "1300px", padding: "50px" }}>
        <Grid item xs={12} md={7}>
          <Grid container direction="row">
            <img src={logo} alt="Ziga Logo" style={{ width: "5%", height: "5%", marginRight: "8px" }} />
            <Typography variant="h4" fontWeight={700} sx={{ paddingBottom: "15px" }}>
              ZIGA
            </Typography>
          </Grid>

          <Typography variant="h6" sx={{ opacity: "0.4", paddingBottom: "30px" }}>
            Find your business partner. Ziga is the social network for entrepreneurs searching for business partners or
            co-founders. Build your network, connect with investors and explain the business to others to see how they
            can help out.
          </Typography>

          <Typography variant="h5" sx={{ opacity: "0.7" }}>
            Make the first move
          </Typography>
          <Typography variant="caption" sx={{ opacity: "0.4" }}>
            Start meeting entrepreneurs and founders in your area.
          </Typography>
          <Grid container direction="row">
            <Button
              variant="contained"
              color="warning"
              sx={{
                width: "150px",
                fontSize: "16px",
                borderRadius: "8px",
                padding: "5px",
                textTransform: "none",
                marginRight: "10px",
                marginTop: "20px",
              }}
              onClick={navigateToRegister}
            >
              Join
            </Button>

            <Button
              variant="outlined"
              color="primary"
              sx={{
                width: "150px",
                fontSize: "16px",
                borderRadius: "8px",
                padding: "5px",
                textTransform: "none",
                marginTop: "20px",
              }}
              onClick={navigateToLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={pgimage} alt="Ziga" style={{ width: "110%" }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
