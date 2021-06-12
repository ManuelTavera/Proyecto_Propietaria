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

        const { authUser, children, ...rest } = this.props;

        return(
            <Route
                {...rest}
                render={({ location }) => 
                    authUser !== null 
                    ? (
                        children
                    )
                    : (
                        <Redirect
                            to={{
                                pathname: "/sign-in",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        )
    }
}

export default connect(mapStateToProps)(PrivateRoutes);