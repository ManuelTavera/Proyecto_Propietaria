import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Login from './pages/login/Login';
import SignIn from './pages/login/sign-in/SignIn';
import SignUp from './pages/login/sign-up/SignUp';
import PrivateRoute from './PrivateRoutes';
import history from './common/store/History';
import Home from './pages/home/Home';
import CreateComplaint from './pages/complaint/create/CreateComplaint';
import EditComplaint from './pages/complaint/edit/EditComplaint';
import CreateClaim from './pages/claim/create/CreateClaim';
import EditClaim from './pages/claim/edit/EditClaim';
import AdminHome from './pages/admin/home/AdminHome';
import ViewDepartment from './pages/admin/department/ViewDepartment';
import Drawer from './common/components/Drawer';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
          <PrivateRoute
            adminRoutes={
              <Drawer>
                <Route path="/admin/home" component={AdminHome} />
                <Route path="/admin/department" component={ViewDepartment} />
              </Drawer>
            }
            publicRoutes={
              <Drawer>
                <Route path="/home" component={Home} />
                <Route path="/create/complaint" component={CreateComplaint} />
                <Route path="/edit/complaint/:complaintId" component={EditComplaint}/>
                <Route path="/create/claim" component={CreateClaim}/>
                <Route path="/edit/claim/:claimId" component={EditClaim}/>
              </Drawer>
            }
          />
        </Switch>
      </Router>
    );
  }

}

export default App;