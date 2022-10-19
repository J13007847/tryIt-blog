import { useState, useContext } from "react";
import { TextField, Box, Button, Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext.js";
import { req_login } from "@/api/user";
export default function Login() {
  const navigate = useNavigate();
  const { setUserData } = useContext(GlobalContext);
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
      loginHandle();
    }
  };
  const loginHandle = (type?: string) => {
    const params =
      type === "visitor" ? { userName: "visitors", password: 1 } : formData;
    req_login(params)
      .then((res) => {
        setUserData(res);
        setReqMsg("登录成功！即将跳转首页");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  return (
    <div className="Login infoInput">
      {reqMsg && (
        <Snackbar
          open={Boolean(reqMsg)}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setReqMsg("")}
        >
          <Alert
            severity={reqMsg.indexOf("登录成功") > -1 ? "success" : "error"}
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
        <h3>个人登录</h3>
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
          还没有账户{" "}
          <Link className="link" to="/register">
            点我注册
          </Link>
        </span>
        <Button className="submitBtn" variant="contained" onClick={submit}>
          提交
        </Button>

        <Button
          className="submitBtn"
          variant="text"
          onClick={() => loginHandle("visitor")}
        >
          游客登录
        </Button>
      </Box>
    </div>
  );
}
