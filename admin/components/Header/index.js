import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin", "left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    boxShadow: "none",
    left: 70
  },
  appBarShift: {
    marginLeft: drawerWidth,
    left: 0,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin", "left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  }
});

const Header = props => {
  const { classes, menuOpen } = props;

  return (
    <AppBar
      position="absolute"
      className={classNames(classes.appBar, menuOpen && classes.appBarShift)}
    >
      <Toolbar disableGutters={!menuOpen}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={props.onMenuIconClick}
          className={classNames(classes.menuButton, menuOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  menuOpen: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onMenuIconClick: PropTypes.func
};

Header.defaultProps = {
  menuOpen: true,
  onMenuIconClick: () => {}
};

export default withStyles(styles, { withTheme: true })(Header);
