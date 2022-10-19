import React, { useImperativeHandle, useState } from "react";
import { TextField } from "@mui/material";
import "./editPwd.scss";
export default function EditPwdForm(props: any) {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  } as any);
  const [errData, setErrData] = useState({ oldPassword: "", newPassword: "" });

  useImperativeHandle(props.onRef, () => {
    return {
      submit,
    };
  });
  const inputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const validInput = () => {
    const erMss: any = {
      oldPassword: "请输入旧密码",
      newPassword: "请输入新密码",
    };
    let errObj: any = {};
    Object.keys(formData).forEach((key: string) => {
      errObj[key] = !formData[key] ? erMss[key] : "";
    });
    setErrData(errObj);
    return errObj.oldPassword || errObj.newPassword;
  };
  const submit = () => {
    if (validInput()) return;
    return formData;
  };
  return (
    <div>
      <TextField
        className="inputTxt"
        error={Boolean(errData.oldPassword)}
        required
        type="search"
        label="旧密码"
        name="oldPassword"
        value={formData.oldPassword}
        helperText={errData.oldPassword}
        onChange={inputChange}
      />
      <br />
      <TextField
        className="inputTxt"
        error={Boolean(errData.newPassword)}
        required
        type="search"
        label="新密码"
        name="newPassword"
        value={formData.newPassword}
        helperText={errData.newPassword}
        onChange={inputChange}
      />
    </div>
  );
}
