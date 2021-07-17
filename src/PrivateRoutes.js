import React from "react";
import { connect } from "react-redux";
import { Router } from "react-router-dom";
import { getAuthUser } from "./common/store/selectors/user.selector";

function mapStateToProps(state) {
  return {
    authUser: getAuthUser(state),
  };
}

class PrivateRoutes extends React.Component {
  render() {
    const {
      authUser,
      children,
      adminRoutes,
      clientRoutes,
      guessRoutes,
      history,
      ...rest
    } = this.props;

    return (
      <Router history={history}>
        {authUser && authUser.user.userType === 2 && clientRoutes}
        {authUser && authUser.user.userType === 3 && adminRoutes}
        {authUser === null && guessRoutes}
      </Router>
    );
  }
}

export default connect(mapStateToProps)(PrivateRoutes);
