import { useAuth } from './contexts/AuthContext'
import NavbarLoggedIn from './NavbarLoggedIn';
import NavbarLoggedOut from './NavbarLoggedOut';

const Navbar = () => {
    const { currentUser } = useAuth()
    return (
        
        <div className="navHolder">
            { currentUser ? <NavbarLoggedIn></NavbarLoggedIn> : <NavbarLoggedOut></NavbarLoggedOut>}
        </div>
     );
}
 
export default Navbar;