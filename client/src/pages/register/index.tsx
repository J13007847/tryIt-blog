import { useState } from "react";
import { TextField, Box, Button, Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { req_login } from "@/api/user";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  } as any);
  const [errData, setErrData] = useState({ userName: "", password: "" });
  const [reqMsg, setReqMsg] = useState("");
  const inputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const validInput = () => {
    const erMss: any = {
      userName: "请输入用户名",
      password: "请输入密码",
    };
    let errObj: any = {};
    Object.keys(formData).forEach((key: string) => {
      errObj[key] = !formData[key] ? erMss[key] : "";
    });
    setErrData(errObj);
    return errObj.userName || errObj.password;
  };
  const submit = (event: any) => {
    event.preventDefault();
    if (!validInput()) {
      req_login(formData)
        .then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          setReqMsg("注册成功！即将跳转登录页");
        })
        .catch((err) => {
          setReqMsg(err);
        });
    }
  };

  return (
    <div className="register infoInput">
      {reqMsg && (
        <Snackbar
          open={Boolean(reqMsg)}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setReqMsg("")}
        >
          <Alert
            severity={reqMsg.indexOf("注册成功") > -1 ? "success" : "error"}
          >
            {reqMsg}
          </Alert>
        </Snackbar>
      )}

      <Box
        className="formBox"
        component="form"
        autoComplete="off"
        onSubmit={submit}
      >
        <h3>新用户注册</h3>
        <TextField
          className="inputTxt"
          error={Boolean(errData.userName)}
          required
          type="search"
          label="用户名"
          name="userName"
          value={formData.userName}
          helperText={errData.userName}
          onChange={inputChange}
        />
        <TextField
          className="inputTxt"
          error={Boolean(errData.password)}
          required
          label="密码"
          type="password"
          name="password"
          value={formData.password}
          helperText={errData.password}
          onChange={inputChange}
        />
        <span className="noCount">
          已有账户{" "}
          <Link className="link" to="/login">
            去登录
          </Link>
        </span>
        <Button className="submitBtn" variant="contained" onClick={submit}>
          提交
        </Button>
      </Box>
    </div>
  );
}
