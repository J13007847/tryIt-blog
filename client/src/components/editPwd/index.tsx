import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { changePwd } from "@/api/user";
import EditPwdForm from "./editPwdForm";
import { GlobalContext } from "@/context/globalContext.js";

export default function EditPwd({
  dialogShow = false,
  dialogHandle,
}: {
  dialogShow: React.SetStateAction<boolean>;
  dialogHandle: Function;
}) {
  const { userInfo, loginOutHandle } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  const [reqMsg, setReqMsg] = useState("");
  const formRef = useRef<any>(null);
  const handleClose = () => {
    dialogHandle(false);
  };

  const submit = () => {
    const { submit } = formRef.current;
    let formData = submit();
    if (!formData) return;
    changePwd({
      ...formData,
      uid: userInfo.uid,
    })
      .then((res) => {
        setReqMsg("修改成功，即将跳转登录页");
        setTimeout(() => {
          loginOutHandle();
        }, 1000);
      })
      .catch((err) => {
        setReqMsg(err);
      });
  };
  useEffect(() => {
    setOpen(dialogShow);
  }, [dialogShow]);
  return (
    <div>
      {reqMsg && (
        <Snackbar
          open={Boolean(reqMsg)}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setReqMsg("")}
        >
          <Alert
            severity={reqMsg.indexOf("修改成功") > -1 ? "success" : "error"}
          >
            {reqMsg}
          </Alert>
        </Snackbar>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">修改密码</DialogTitle>
        <DialogContent>
          <EditPwdForm onRef={formRef}></EditPwdForm>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={submit}>确定</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
