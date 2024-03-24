import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import API from "../../api";

const FormProfileImage = ({ onTabChange, onDataChange, data }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleBackButton = () => {
    onTabChange(4);
  };

  const handleContinue = () => {
    console.log({ email: data.email, phone: data.phone, gender: data.gender, username: data.name });
    API.post("/auth/signup", { email: data.email, phone: data.phone, gender: data.gender, username: data.name })
      .then((success) => {
        const { data, status } = success;
        if (status === 201) {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        <Grid item xs={12} md={8} lg={4}>
          {data.file && (
            <img alt="upload img" src={data.file} style={{ width: "300px", height: "400px", borderRadius: "30px" }} />
          )}
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <input style={{ display: "none" }} ref={inputRef} type="file" onChange={onDataChange.handleFileChange} />
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Button
            variant="text"
            color="primary"
            sx={{ width: "100%", fontSize: "13px", textTransform: "none", marginTop: "30px" }}
            onClick={handleUploadClick}
            startIcon={<CloudUploadIcon />}
          >
            Click here to upload
          </Button>
        </Grid>
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

export default FormProfileImage;
