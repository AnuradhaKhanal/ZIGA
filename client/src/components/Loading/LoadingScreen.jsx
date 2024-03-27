import { Backdrop, CircularProgress } from "@mui/material";

const LoadingScreen = ({ data, onChangeData }) => {
  const handleClose = () => {
    onChangeData.setIsBusy({
      ...data,
      showMsg: false,
    });
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={data.isBusy}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingScreen;
