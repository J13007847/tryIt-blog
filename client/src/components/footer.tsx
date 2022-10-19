import { Grid } from "@mui/material";
import Logo from "../static/image/logo.jpg";

export default function Footer() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <img className="logoSite" src={Logo} alt="" />
      <span>
        使用 <b>nodeJs</b> 和 <b>React.js</b> 制作
      </span>
    </Grid>
  );
}
