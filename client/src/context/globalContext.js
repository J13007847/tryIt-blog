import { createContext, useState } from "react";
import { colord } from "colord";
import { loginOut } from "@/api/user";
const themes = "#059178";

export const GlobalContext = createContext();
export const GlobalContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo")) || {}
  );
  const [postType, setPostType] = useState([]);
  // 设置主题色
  const setTheme = (color) => {
    setCurrentTheme(color);
    setCurrentBg({
      "--base-color": coverColor(color),
      "--base-txt": color,
    });
  };
  // 更新用户数据
  const setUserData = (data) => {
    sessionStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);
  };
  const coverColor = (color) => {
    let newColor = colord(color).lighten(0.5).toHex();
    return newColor;
  };
  const [currentBg, setCurrentBg] = useState({
    "--base-color": coverColor(themes),
    "--base-txt": themes,
  });
  // 退出登录
  const loginOutHandle = () => {
    loginOut().then(() => {
      sessionStorage.clear();
      localStorage.clear();
      window.location.replace(window.location.origin + "/#/login");
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        currentTheme,
        userInfo,
        currentBg,
        setTheme,
        setUserData,
        postType,
        setPostType,
        loginOutHandle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
