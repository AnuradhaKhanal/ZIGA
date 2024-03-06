import { Typography, Button, Grid, Box, TextField } from "@mui/material";

const FormName = ({ onTabChange, onDataChange, data }) => {
  const handleBackButton = () => {
    onTabChange(1);
  };
  const handleContinue = () => {
    onTabChange(3);
  };

  return (
    <>
      <Grid container spacing={2} direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="h6" sx={{ opacity: "0.8", marginTop: "30px" }}>
            Nice one! So what do you like to be called?
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                placeholder="Your name"
                value={data.name}
                onChange={onDataChange.handleNameChange}
                helperText="This is how you'll appear on Ziga"
              />
            </div>
          </Box>
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

export default FormName;
