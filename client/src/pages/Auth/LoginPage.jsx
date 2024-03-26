import { useState } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import FormLoginOptions from "../../components/Form/FormLoginOptions";
import FormOTPVerfiy from "../../components/Form/FormOTPVerfiy";
import FormName from "../../components/Form/FormName";
import FormGenderOptions from "../../components/Form/FormGenderOptions";
import FormLocation from "../../components/Form/FormLocation";
import FormProfileImage from "../../components/Form/FormProfileImage";
import FormProfile from "../../components/Form/FormProfile";
// import logo from "../../assets/images/logoNB.png";

const LoginPage = () => {
  const [tab, setTab] = useState(0);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Female");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [file, setFile] = useState(undefined);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleLocationChange = (val) => {
    setLocation(val);
  };

  const clearOtp = () => {
    setOtp("");
  };

  const handleTabChange = (val) => {
    setTab(val);
  };

  const handleFileChange = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    setFile(URL.createObjectURL(fileObj));
    e.target.value = null;
  };

  return (
    <div style={{ padding: 30 }}>
      <Paper elevation={0} sx={{ marginTop: "100px" }}>
        <Grid container spacing={3} direction={"column"} justifyContent={"center"} alignItems={"center"}>
          {/* <Grid item xs={12} md={8} lg={4}>
            <img src={logo} alt="Ziga Logo" style={{ width: "5%", height: "5%" }} />
          </Grid> */}
          <Grid item xs={12} md={8} lg={4}>
            <Typography variant="h4" fontWeight={500}>
              ZIGA
            </Typography>
          </Grid>
        </Grid>

        {tab === 0 && <FormLoginOptions onTabChange={handleTabChange} />}
        {tab === 1 && (
          <FormOTPVerfiy
            onTabChange={handleTabChange}
            onDataChange={{ handlePhoneChange, handleOtpChange, handleEmailChange, clearOtp }}
            data={{ phone, email, otp }}
          />
        )}
        {tab === 2 && <FormName onTabChange={handleTabChange} onDataChange={{ handleNameChange }} data={{ name }} />}
        {tab === 3 && (
          <FormGenderOptions onTabChange={handleTabChange} onDataChange={{ handleGenderChange }} data={{ gender }} />
        )}
        {tab === 4 && (
          <FormLocation onTabChange={handleTabChange} onDataChange={{ handleLocationChange }} data={{ location }} />
        )}
        {tab === 5 && (
          <FormProfileImage
            onTabChange={handleTabChange}
            onDataChange={{ handleFileChange }}
            data={{ email, name, gender, phone, file }}
          />
        )}
        {tab === 6 && (
          <FormProfile
            onTabChange={handleTabChange}
            onDataChange={{ handleFileChange }}
            data={{ email, name, gender, phone, file }}
          />
        )}
      </Paper>
    </div>
  );
};

export default LoginPage;
