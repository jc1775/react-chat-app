import Navbar from './Navbar';
import LoginPage from './Login';
import Dashboard from './Dashboard'
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import Profile from './Profile';
import Signup from './Signup'
import { AuthProvider } from './contexts/AuthContext';



function App() {
  return (
    
    <Router>
      <AuthProvider>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/signin">
            <LoginPage ></LoginPage>
          </Route>
          <Route exact path="/signup">
            <Signup ></Signup>
          </Route>
          <Route exact path="/forgot-password">
            <LoginPage></LoginPage>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/profile">
            <Profile></Profile>
          </Route>
        </Switch>
        <div className="dragOverlay"></div>
      </div>
      </AuthProvider>
    </Router>

  );
}

export default App;
