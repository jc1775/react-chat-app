import Navbar from './Navbar';
import Home from './Home';
import LoginPage from './Login';
import Dashboard from './Dashboard'
import NavbarLoggedIn from './NavbarLoggedIn';



function App() {
  return (
    <div className="App">
      <NavbarLoggedIn></NavbarLoggedIn>
      <Dashboard></Dashboard>
      <div className="dragOverlay">

            </div>
    </div>
  );
}

export default App;
