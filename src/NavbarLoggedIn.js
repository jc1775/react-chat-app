const NavbarLoggedIn = () => {
    return ( 
        <nav className="navbar navbarLoggedIn">
            <h1>Test Chat App</h1>
            <div className="links">
                <a className="profile_btn" href="/profile">
                    <img src="logo192.png" alt="" className="profilePicture" />
                </a>
                <a className="options_btn" href="options">
                    <img src="settings.png" alt="" className="settingsPicture" />
                </a>
            </div>
        </nav>
     );
}
 
export default NavbarLoggedIn;