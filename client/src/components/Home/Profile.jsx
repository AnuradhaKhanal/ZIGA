// import { PhotoCamera as PhotoCameraIcon } from "@mui/icons-material";
import { Badge, Avatar, Grid, Typography, Card } from "@mui/material";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { phone, email, username, gender } = user?.data?.userPayload;

  return (
    <Card variant="outlined" sx={{ ml: "230px", mr: "230px" }}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            // badgeContent={
            //   <PhotoCameraIcon
            //     sx={{
            //       border: "5px solid white",
            //       backgroundColor: "#ff558f",
            //       borderRadius: "50%",
            //       padding: ".2rem",
            //       width: 35,
            //       height: 35,
            //     }}
            //   ></PhotoCameraIcon>
            // }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5, backgroundColor: "#2596be" }}
              alt="profile_pic"
              // src="https://material-ui.com/static/images/avatar/1.jpg"
            >
              {username?.charAt(0).toUpperCase()}
            </Avatar>
          </Badge>

          <Typography variant="h6">{username}</Typography>
          <Typography color="text.secondary">Ziga User</Typography>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
              }}
            >
              Name
            </Typography>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
              }}
            >
              Gender
            </Typography>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
              }}
            >
              Contact number
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
          <Grid item xs={6} sx={{ textAlign: "start" }}>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
                color: "grey",
              }}
            >
              {username ? username : "Not Specified"}
            </Typography>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
                color: "grey",
              }}
            >
              {gender ? gender : "Not Specified"}
            </Typography>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
                color: "grey",
              }}
            >
              {phone ? phone : "Not Specified"}
            </Typography>
            <Typography
              style={{
                padding: "1rem",
                borderTop: "1px solid #e1e1e1",
                color: "grey",
              }}
            >
              {email}
            </Typography>
          </Grid>
        </Grid>

        {/* <Grid
          item
          style={{
            padding: "1rem",
            borderTop: "1px solid #e1e1e1",
          }}
          sx={{ width: "100%" }}
        >
          <Button variant="contained" color="secondary" sx={{ width: "99%", p: 1, my: 2 }}>
            Edit Profile
          </Button>
        </Grid> */}
      </Grid>
    </Card>
  );
};

export default Profile;
