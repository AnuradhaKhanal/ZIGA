import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Grid, FormControlLabel, FormControl, Radio, RadioGroup, TextField } from "@mui/material";
import { message } from "../../helpers/Message";
import Message from "../Message/Message";
import LoadingScreen from "../Loading/LoadingScreen";
import API from "../../api";

const FormProfile = ({ onTabChange, onDataChange, data }) => {
  const [msg, setMsg] = useState(message);
  const [isBusy, setIsBusy] = useState(false);
  const navigate = useNavigate();
  const handleContinue = () => {
    onTabChange(4);
  };
  return (
    <>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"left"}>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            Are you technical?
          </Typography>
          <Typography variant="body2" sx={{ opacity: "0.7" }}>
            You are a programmer, scientist or engineer who can build the product without outside assistance.
          </Typography>
          <FormControl>
            <RadioGroup name="q1-radio-group" value={true} onChange={onDataChange.handleGenderChange}>
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            Intoduce yourself
          </Typography>
          <Typography variant="body2" sx={{ opacity: "0.7" }}>
            Write a paragraph or two about yourself or what you are looking for. Cover your professional achievements or
            interests but it's ok to get a little personal here.
          </Typography>
          <FormControl>
            <TextField
              sx={{ width: "300%" }}
              multiline
              rows={4}
              placeholder="Write upto 1000 words"
              value={data.name}
              onChange={onDataChange.handleNameChange}
              helperText="This is a required field"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            How did you hear about YC Co-founder matching?
          </Typography>
          <FormControl>
            <TextField sx={{ width: "300%" }} value={data.name} onChange={onDataChange.handleNameChange} />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="body1" sx={{ opacity: "1", marginTop: "20px" }}>
            Do you already have a startup or idea that you're set on?
          </Typography>
          <FormControl>
            <RadioGroup name="q1-radio-group" value={"0"} onChange={onDataChange.handleGenderChange}>
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
            When do you want to work on a start-up full time?
          </Typography>
          <Typography variant="body2" sx={{ opacity: "0.7" }}>
            i.e. leave your job or school to be a full-time founder.
          </Typography>
          <FormControl>
            <RadioGroup name="q1-radio-group" value={"0"} onChange={onDataChange.handleGenderChange}>
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
