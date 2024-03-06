import { Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormLocation = ({ onTabChange, onDataChange, data }) => {
  const navigate = useNavigate();
  const handleBackButton = () => {
    onTabChange(4);
  };

  const handleContinue = () => {
    navigate("/home");
  };

  return (
    <>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="h6" sx={{ opacity: "0.8", marginTop: "30px" }}>
            Now it's time to upload some photos
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="subtitle2" sx={{ opacity: "0.6", marginTop: "10px" }}>
            Adding photos is a great way to show off more about yourself.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={4}></Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Button
            variant="contained"
            color="warning"
            sx={{ width: "100%", fontSize: "13px", textTransform: "none", marginTop: "30px", borderRadius: "10px" }}
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

export default FormLocation;
