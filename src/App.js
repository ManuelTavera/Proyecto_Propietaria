import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Login from './pages/login/Login';
import SignIn from './pages/login/sign-in/SignIn';
import SignUp from './pages/login/sign-up/SignUp';
import PrivateRoute from './PrivateRoutes';
import history from './common/store/History';
import Home from './pages/home/Home';

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
          <PrivateRoute>
            <Route path="/home" component={Home} />
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }

}

export default App;