import { Typography, Button, Grid, Avatar } from "@mui/material";
import locImage from "../../assets/images/location_avatar.jpg";

const FormLocation = ({ onTabChange, onDataChange, data }) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const handleBackButton = () => {
    onTabChange(3);
  };

  const success = (pos) => {
    let crd = pos.coords;
    onDataChange.handleLocationChange({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
    console.log("Your current position is:");
    console.log(`Latitude : ${data.location.latitude}`);
    console.log(`Longitude: ${data.location.longitude}`);
  };

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  const handleContinue = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
        }
        result.onchange = () => {
          console.log(result.state);
        };
      });
    } else {
      alert("Location may not be enabled on your device!");
    }
    onTabChange(5);
  };

  return (
    <>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12} md={8} lg={4}>
          <Avatar
            alt="location avatar"
            src={locImage}
            variant="circular"
            sx={{ width: 160, height: 160, marginTop: "30px", border: "0.2px solid orange" }}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="h6" sx={{ opacity: "0.8", marginTop: "30px" }}>
            We need your location to show who's nearby
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="subtitle2" sx={{ opacity: "0.6", marginTop: "10px" }}>
            You will need to grant Ziga access to your location so that you can connect with awesome business partners.
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
            Allow location access
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
