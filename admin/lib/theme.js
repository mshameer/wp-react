import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#48a999",
      main: "#00796b",
      dark: "#004c40",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ffff6b",
      main: "#fdd835",
      dark: "#c6a700",
      contrastText: "#000"
    }
  }
});

export default theme;
