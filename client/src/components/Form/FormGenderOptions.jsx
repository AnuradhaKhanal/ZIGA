import { Typography, Button, Grid, FormControlLabel, FormControl, Radio, RadioGroup } from "@mui/material";

const FormGenderOptions = ({ onTabChange, onDataChange, data }) => {
  const handleBackButton = () => {
    onTabChange(2);
  };
  const handleContinue = () => {
    onTabChange(4);
  };
  return (
    <>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="h6" sx={{ opacity: "0.8", marginTop: "30px" }}>
            And how do you identify?
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <FormControl>
            <RadioGroup
              aria-labelledby="gender-group"
              name="gender-radio-group"
              value={data.gender}
              onChange={onDataChange.handleGenderChange}
            >
              <FormControlLabel value="Female" control={<Radio />} label="Woman" />
              <FormControlLabel value="Male" control={<Radio />} label="Man" />
              <FormControlLabel value="Non-Binary" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
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

export default FormGenderOptions;
