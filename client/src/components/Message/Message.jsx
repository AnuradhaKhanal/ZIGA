import { Alert, Button, Snackbar } from "@mui/material";

const Message = ({ data, onChangeData }) => {
  const handleClose = () => {
    onChangeData.setMsg({
      ...data,
      showMsg: false,
    });
  };
  return (
    <Snackbar
      open={data.showMsg}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={data.success === true ? "success" : "error"}
        action={
          <Button color="inherit" size="small" onClick={handleClose}>
            Dismiss
          </Button>
        }
      >
        {data.text}
      </Alert>
    </Snackbar>
  );
};

export default Message;
