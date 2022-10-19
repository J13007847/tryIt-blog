import React, { useContext, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { GlobalContext } from "@/context/globalContext";
import { req_upload } from "@/api/common";
import { setAvatar, setBaseInfo, req_getOtherUser } from "@/api/user";
import {
  TextField,
  Avatar,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@mui/material";
import "./index.scss";
export default function UserCenterHeader() {
  const { userInfo, setUserData } = useContext(GlobalContext);
  const { state } = useLocation();
  const isNotSelf = state?.uid && state?.uid !== userInfo.uid;

  const [userCenterInfo, setUserCenterInfo] = useState({} as any);
  const [editing, setEditing] = useState(false);
  const [infoData, setInfoData] = useState({
    nickname: userCenterInfo.nickname || userCenterInfo.userName,
    sex: userCenterInfo.sex,
  });
  // 上传头像和封面
  const fileChange = (event: any) => {
    const { files, name } = event.target;
    const fileData = new FormData();
    fileData.append("file", files[0]);
    req_upload(fileData, "avatar").then((filePath) => {
      setAvatar({
        photo: filePath,
        uid: userInfo.uid,
      }).then(() => {
        setTimeout(() => {
          setUserData({ ...userInfo, [name]: filePath });
        }, 500);
      });
    });
  };
  // 修改昵称和性别
  const editChange = () => {
    if (editing) {
      setBaseInfo({
        nickname: infoData.nickname,
        sex: infoData.sex,
        uid: userInfo.uid,
      }).then((res) => {
        setUserData({ ...userInfo, ...infoData });
        setEditing(!editing);
      });
    } else {
      setEditing(!editing);
    }
  };
  // 输入框change事件
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "nickname" && value.length > 22) return;
    setInfoData((pre: any) => ({ ...pre, [name]: value }));
  };
  // 获取当前预览人的信息
  const getOthersUserInfo = () => {
    if (!isNotSelf) {
      setUserCenterInfo(userInfo);
    } else {
      req_getOtherUser(state?.uid || userInfo.uid).then((res) => {
        setUserCenterInfo(res);
        setInfoData({ nickname: res.nickname || res.userName, sex: res.sex });
      });
    }
  };
  useEffect(() => {
    getOthersUserInfo();
  }, [isNotSelf]);
  return (
    <div className="UserCenterHeader w1122">
      <div className="headerBox">
        <div
          className="centerBg"
          style={{
            backgroundImage: userCenterInfo.centerBg
              ? `url(/avatar/${userCenterInfo.centerBg})`
              : "",
          }}
        >
          {!isNotSelf && (
            <label className="userPhoto editBg">
              修改封面图
              <input
                hidden
                accept="image/*"
                name="centerBg"
                type="file"
                onChange={fileChange}
              />
            </label>
          )}
        </div>

        <div className="userInfo">
          <div className="userName">
            <label className={`userPhoto ${isNotSelf ? "" : "self"}`}>
              <Avatar
                src={
                  userCenterInfo.photo &&
                  require("/public/avatar/" + userCenterInfo.photo)
                }
                sx={{ width: 120, height: 120 }}
              ></Avatar>
              {!isNotSelf && (
                <input
                  hidden
                  accept="image/*"
                  name="photo"
                  type="file"
                  onChange={fileChange}
                />
              )}
            </label>
            {!editing ? (
              <>
                <span className="textBox">
                  {userCenterInfo.nickname || userCenterInfo.userName}
                </span>
                {userCenterInfo.sex && (
                  <Avatar
                    src={require("../../static/image/icon/" +
                      (Number(userCenterInfo.sex) === 1 ? "nan" : "nv") +
                      ".png")}
                    className="smallIcon"
                    sx={{
                      width: 18,
                      height: 18,
                      bgcolor:
                        Number(userCenterInfo.sex) === 1
                          ? "#1296db"
                          : "rgba(255,62,135,0.95)",
                    }}
                  ></Avatar>
                )}
              </>
            ) : (
              <div className="editBox pt20">
                <TextField
                  label=""
                  variant="standard"
                  name="nickname"
                  placeholder="昵称最多22个字"
                  value={infoData.nickname}
                  onChange={inputChange}
                  size="small"
                />
                <RadioGroup
                  aria-labelledby="sex"
                  row
                  name="sex"
                  value={infoData.sex}
                  onChange={inputChange}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio size="small" />}
                    label="男"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio size="small" />}
                    label="女"
                  />
                </RadioGroup>
              </div>
            )}
          </div>

          {!isNotSelf && (
            <Button
              variant="text"
              className="editBtn"
              style={{ marginTop: 20 }}
              onClick={editChange}
            >
              {editing ? "修改" : "编辑"}
            </Button>
          )}
          {editing && (
            <Button
              variant="text"
              className="editBtn"
              style={{ marginTop: 20 }}
              onClick={() => setEditing(false)}
            >
              取消
            </Button>
          )}
          {/* {location.pathname.indexOf("/userCenter/editInfo") < 0 && (
            
          )} */}
        </div>
      </div>

      <div className="contentBox">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
