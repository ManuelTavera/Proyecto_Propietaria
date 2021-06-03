import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/login/Login';
import SignIn from './pages/login/sign-in/SignIn';
import SignUp from './pages/login/sign-up/SignUp';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
        </Switch>
      </Router>
    );
  }

}

export default App;