import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";

const Profile = () => {
  return (
    <Card variant="outlined">
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <PhotoCameraIcon
                sx={{
                  border: "5px solid white",
                  backgroundColor: "#ff558f",
                  borderRadius: "50%",
                  padding: ".2rem",
                  width: 35,
                  height: 35,
                }}
              ></PhotoCameraIcon>
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src="https://material-ui.com/static/images/avatar/1.jpg"
            ></Avatar>
          </Badge>

          <Typography variant="h6">John Henderson</Typography>
          <Typography color="text.secondary">UI developer</Typography>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
              }}
            >
              Age
            </Typography>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
              }}
            >
              Experience
            </Typography>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
              }}
            >
              Email
            </Typography>
          </Grid>
          {/* VALUES */}
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
              }}
            >
              32
            </Typography>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
              }}
            >
              7 years
            </Typography>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
              }}
            >
              john.ui123@gmail.com
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          style={{
            padding: "1rem",
            borderTop: "1px solid #e1e1e1",
          }}
          sx={{ width: "100%" }}
        >
          <Button variant="contained" color="secondary" sx={{ width: "99%", p: 1, my: 2 }}>
            View Public Profile
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Profile;
