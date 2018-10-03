import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    height: "auto",
    minHeight: "100%"
  },
  wrapper: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  footer: {
    display: "flex",
    padding: "15px 20px",
    backgroundColor: "#ececec"
  }
});

class Cms extends React.Component {
  state = {
    open: true
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header
          menuOpen={this.state.open}
          onMenuIconClick={this.handleDrawerOpen}
        />
        <Sidebar
          menuOpen={this.state.open}
          onDrawerClose={this.handleDrawerClose}
        />
        <div className={classes.wrapper}>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography noWrap>
              {"You think water moves fast? You should see ice."}
            </Typography>
          </main>
          <footer className={classes.footer}>
            <Typography noWrap>
              Copyright © 2018 My CMS rights reserved
            </Typography>
          </footer>
        </div>
      </div>
    );
  }
}

Cms.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Cms);
