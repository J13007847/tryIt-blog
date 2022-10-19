import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Grid, Box, Tab, Tabs, Avatar, Button } from "@mui/material";
import UserMenu from "./userMenu";
import Logo from "../../static/image/logo.png";
import "./header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext.js";

export default function Header() {
  const { userInfo, postType, setPostType, loginOutHandle } =
    useContext(GlobalContext);
  const { state } = useLocation();
  const [tabVal, setTabVal] = useState<number>(state?.type || 1);
  const navigator = useNavigate();
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabVal(Number(newValue));
  };
  const changeType = (type: string) => {
    return () => {
      navigator("/", { state: { type } });
    };
  };
  const publicHandle = () => {
    navigator("/publicPage");
  };
  useEffect(() => {
    if (state?.type) setTabVal(state.type);
    axios.get("/api/post/getPostType").then((res) => {
      const { status, data } = res.data;
      if (status === 200) {
        setPostType(data);
      }
    });
  }, [state?.type]);
  return (
    <div className="HeaderBox">
      <Grid
        className="w1122"
        container
        spacing={2}
        justifyContent="space-between"
      >
        <Grid item xs={2} alignItems="center">
          <img className="logoSite" src={Logo} alt="" />
        </Grid>
        <Grid item xs={8} justifyContent="flex-end" alignItems="flex-end">
          <Box>
            <Tabs value={tabVal} onChange={handleChange}>
              {postType.map((item: any) => (
                <Tab
                  label={item.name}
                  value={item.id}
                  key={item.id}
                  onClick={changeType(item.id)}
                />
              ))}
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={2} justifyContent="flex-end">
          <UserMenu loginOutHandle={loginOutHandle} uid={userInfo.uid}>
            <Avatar
              alt={userInfo.nickname || userInfo.userName}
              title={userInfo.nickname || userInfo.userName}
              src={
                userInfo.photo && require("/public/avatar/" + userInfo.photo)
              }
            />
          </UserMenu>
          {userInfo.uid !== 1 && (
            <Button variant="text" onClick={publicHandle}>
              新发布
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
