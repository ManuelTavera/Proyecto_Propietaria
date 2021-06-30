import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getAuthUser } from './common/store/selectors/user.selector';

function mapStateToProps(state){
    return {
        authUser: getAuthUser(state)
    }
}

class PrivateRoutes extends React.Component {
    render(){

        const { authUser, children, adminRoutes, publicRoutes, ...rest } = this.props;

        return(
            <Route
                { ...rest }
                render={({ location }) => 
                    {
                        if(authUser && authUser.user.userType === 2){
                            return (
                                <React.Fragment>
                                    { publicRoutes }
                                </React.Fragment>
                            )
                        }
                        else if (authUser && authUser.user.userType === 3){
                            return (
                                <React.Fragment>
                                    { adminRoutes }
                                </React.Fragment>
                            )
                        }
                        else if (authUser === null){
                            return (
                                <Redirect
                                    to={{
                                        pathname: "/sign-in",
                                        state: { from: location }
                                    }}
                                />
                            )
                        }
                        else {
                            return (
                                <Redirect
                                    to={{
                                        pathname: "/home",
                                        state: { from: location }
                                    }}
                                />
                            )
                        }
                    }
                }
            />
        )
    }
}

export default connect(mapStateToProps)(PrivateRoutes);