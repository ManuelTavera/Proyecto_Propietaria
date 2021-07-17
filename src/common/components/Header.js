import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";

import { logOutUser } from "../store/actions/SignIn/user.actions";

function mapDispatchToProps(dispatch) {
  return {
    logOutUser: () => {
      dispatch(logOutUser());
    },
  };
}

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleMenu(event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget),
    });
  }

  logOut() {
    this.props.logOutUser();
  }

  handleClose() {
    this.setState({ open: false, anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { open, anchorEl } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item xs />
              <Grid item>
                <Tooltip title="Alerts • No alerts">
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <IconButton
                  color="inherit"
                  onClick={this.handleMenu}
                  className={classes.iconButtonAvatar}
                >
                  <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.logOut}>Sign out</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(Header);
