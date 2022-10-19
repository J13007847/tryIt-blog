import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import routers from "./router/index";
import "./style/globalCss.scss";
import { GlobalContext } from "./context/globalContext";

function App() {
  const { currentTheme, currentBg } = useContext(GlobalContext);
  const theme = createTheme({
    palette: {
      primary: {
        main: currentTheme,
      },
    },
  });

  return (
    <div className="App" style={currentBg}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routers} />
      </ThemeProvider>
    </div>
  );
}

export default App;
