import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Typography,
  Button,
  Grid,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  TextField,
  OutlinedInput,
  Checkbox,
  MenuItem,
  ListItemText,
  Select,
  InputLabel,
} from "@mui/material";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import { ProfileForm } from "../../helpers/ProfileForm";
import API from "../../api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const variants = [
  {
    id: 0,
    name: "Product",
  },
  {
    id: 1,
    name: "Engineering",
  },
  {
    id: 2,
    name: "Design",
  },
  {
    id: 3,
    name: "Sales and Marketing",
  },
  {
    id: 4,
    name: "Operations",
  },
];

const FormProfile = () => {
  const [msg, setMsg] = useState(message);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isBusy, setIsBusy] = useState(false);
  const [formData, setformData] = useState(ProfileForm);
  const [variantName, setVariantName] = useState([
    {
      id: -1,
      name: "Select one or more",
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("profile");
    navigate("/");
    setUser(null);
  };

  const handleContinue = () => {
    setIsBusy(true);
    const { email, phone } = user?.data?.userPayload;

    API.post("/profile/add", { ...formData, email, phone })
      .then((success) => {
        const { data } = success;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
        setformData(ProfileForm);
        navigate("/home");
      })
      .catch((error) => {
        const { data } = error.response;
        setIsBusy(false);
        setMsg({ showMsg: true, success: data.success, text: data.message });
      });
  };

  const handleFormChange = (key, e) => {
    let update = { [key]: e.target.value };
    setformData((prev) => ({
      ...prev,
      ...update,
    }));
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const preventDuplicate = value.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
    setVariantName(typeof preventDuplicate === "string" ? preventDuplicate.split(",") : preventDuplicate);
    handleFormChange("workArea", event);
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
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"left"}>
        <Message data={msg} onChangeData={{ setMsg }} />
        <LoadingScreen data={{ isBusy }} onChangeData={{ setIsBusy }} />
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            Are you technical?&nbsp;<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography variant="body2" sx={{ opacity: "0.7" }}>
            You are a programmer, scientist or engineer who can build the product without outside assistance.
          </Typography>
          <FormControl>
            <RadioGroup
              name="q1-radio-group"
              value={formData.isTechnical}
              onChange={(e) => handleFormChange("isTechnical", e)}
            >
              <FormControlLabel value={"0"} control={<Radio />} label="Yes" />
              <FormControlLabel value={"1"} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            Introduce yourself&nbsp;<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography variant="body2" sx={{ opacity: "0.7" }}>
            Write a paragraph or two about yourself or what you are looking for. Cover your professional achievements or
            interests but it's ok to get a little personal here.
          </Typography>
          <FormControl sx={{ marginTop: "10px" }}>
            <TextField
              sx={{ width: "300%" }}
              multiline
              rows={4}
              placeholder="Write upto 1000 words"
              value={formData.introBody}
              onChange={(e) => handleFormChange("introBody", e)}
              helperText="This is a required field"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            How did you hear about YC Co-founder matching?
          </Typography>
          <FormControl sx={{ marginTop: "10px" }}>
            <TextField
              sx={{ width: "300%" }}
              value={formData.reference}
              onChange={(e) => handleFormChange("reference", e)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            Do you already have a startup or idea that you're set on?&nbsp;<span style={{ color: "red" }}>*</span>
          </Typography>
          <FormControl>
            <RadioGroup
              name="q1-radio-group"
              value={formData.ideaType}
              onChange={(e) => handleFormChange("ideaType", e)}
            >
              <FormControlLabel
                value={"0"}
                control={<Radio />}
                label="Yes, I'm committed to an idea and I need a co-founder who can help me build it"
              />
              <FormControlLabel
                value={"1"}
                control={<Radio />}
                label="I have ideas, but I'm open to exploring other ideas"
              />
              <FormControlLabel
                value={"2"}
                control={<Radio />}
                label="No, I could help a co-founder with their existing idea or explore new ideas together"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            When do you want to work on a start-up full time?&nbsp;<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography variant="body2" sx={{ opacity: "0.7" }}>
            i.e. leave your job or school to be a full-time founder.
          </Typography>
          <FormControl>
            <RadioGroup
              name="q1-radio-group"
              value={formData.startingType}
              onChange={(e) => handleFormChange("startingType", e)}
            >
              <FormControlLabel value={"0"} control={<Radio />} label="I'm already full-time on my start-up" />
              <FormControlLabel
                value={"1"}
                control={<Radio />}
                label="I'm ready ready to go full-time as soon as I meet the right co-founder"
              />
              <FormControlLabel value={"2"} control={<Radio />} label="I'm planning to go full-time next year" />
              <FormControlLabel value={"3"} control={<Radio />} label="I don't have any specific plans yet" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            Which areas of startup are you willing to take responsibility for?&nbsp;
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <FormControl sx={{ marginTop: "10px" }}>
            <InputLabel id="work_area-label">Area</InputLabel>
            <Select
              labelId="work_area-label"
              id="work_area"
              multiple
              value={variantName}
              onChange={handleChange}
              input={<OutlinedInput label="Area" />}
              renderValue={(selected) => selected.map((x) => x.name).join(", ")}
              MenuProps={MenuProps}
            >
              {variants.map((variant) => (
                <MenuItem key={variant.id} value={variant}>
                  <Checkbox checked={variantName.findIndex((item) => item.id === variant.id) >= 0} />
                  <ListItemText primary={variant.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Button
            variant="contained"
            color="warning"
            sx={{ width: "10%", fontSize: "13px", textTransform: "none", marginTop: "30px", borderRadius: "10px" }}
            onClick={handleContinue}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FormProfile;
