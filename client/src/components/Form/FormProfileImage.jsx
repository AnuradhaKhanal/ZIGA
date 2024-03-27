import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Typography, Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import API from "../../api";

const FormProfileImage = ({ onTabChange, onDataChange, data }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [msg, setMsg] = useState(message);
  const [isBusy, setIsBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleBackButton = () => {
    onTabChange(4);
  };

  const logout = () => {
    localStorage.removeItem("profile");
    navigate("/");
    setUser(null);
  };

  const handleContinue = () => {
    setIsBusy(true);
    API.post("/auth/signup", { email: data.email, phone: data.phone, gender: data.gender, username: data.name })
      .then((response) => {
        const { data, status } = response;
        if (status === 201) {
          console.log(data);
          localStorage.setItem("profile", JSON.stringify(data));
          setIsBusy(false);
          setMsg({ showMsg: true, success: data.success, text: data.message });
          onTabChange(6);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
  };

  useEffect(() => {
    const token = user?.token;
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
