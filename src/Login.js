const LoginPage = () => {
    return ( 
        <div className='login'>
            <div className="loginWindow center">
                <h1>Sign In</h1>
                <h2>Username</h2> 
                <input type="text" />
                <h2>Password</h2>
                <input type="text" />
                <div className="buttonHolder center-flex">
                    <button id='login'>Start Chatting!</button>
                </div>
                <div className="buttonHolder center-flex">
                    <button id='forgot-password'>Forgot Password</button>
                    <button id='create-account'>Create Account</button>
                </div>
                
            </div>
        </div>
     );
}
 
export default LoginPage;