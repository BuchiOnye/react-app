import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar';
import Welcome from './components/welcome';
import Footer from './components/Footer'

import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import CreateArticle from './components/CreateArticle';
import Login from './components/Login';
import SingleArticle from './components/SingleArticle';
import SignUp from './components/SignUp';
import AuthService from './service/auth'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      authUser: null
    };
  }

  componentDidMount(){
    const user = localStorage.getItem('user');
    if(user){
      this.setState({
        authUser: JSON.parse(user)
      })
    }
  }

  setAuthUser = (authUser) => {
    this.setState({
      authUser: authUser
    })

  }


  render() {
    const {location} = this.props;
    return (
      <div>
      {location.pathname !== '/login' && location.pathname !== '/register' &&
    <Navbar authUser = {this.state.authUser} />
  }
      <Route exact path="/" component={Welcome}/>
      <Route path="/createarticle" component={CreateArticle} />
      <Route path="/login" component={Login} />
      <Route path="/article/:slug" component={SingleArticle} />
      <Route path="/register" render={(props) => <SignUp 
      {...props} 
      registerUser= {this.props.authService.registerUser} 
      setAuthUser = {this.setAuthUser} /> 
      } />

      {location.pathname !== '/login'  && location.pathname !== '/register' &&
    <Footer/>
  }
  </div>

    )
  }

}


const Main = withRouter((props) => {
  return (
   <App authService = {new AuthService()} {...props}/>
  );

})


ReactDOM.render(
  <BrowserRouter>
 <Main/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
