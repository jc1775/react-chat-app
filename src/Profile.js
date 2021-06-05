
import { useAuth } from './contexts/AuthContext'
import firebase from "./firebase"
import 'firesql/rx'; // <-- Important! Don't forget
import 'firebase/firestore';
import {useEffect, useState, useRef} from 'react';


const Profile = (props) => {
    let userData= props.currentUserInfo
    //const [userData, setUserData] = useState({})
    //const { currentUser } = useAuth()

    const displayNameRef = useRef()
    const birthdayRef = useRef()
    const statusRef = useRef()

    return ( 
        <div className="profilePage">
            <h1>{userData.display_name}'s Profile</h1>
            <div className="profilePhoto">
                <img src={userData.contact_picture} alt="" />
                <button className="changeProfilePicture">Change picture</button>
            </div>
            <form className="changeProfileInfo">
                <h2>Display Name</h2>
                <input type="text" placeholder={userData.display_name} ref={displayNameRef}/>
                <h2>Birthday</h2>
                <input type="text" placeholder="" ref={birthdayRef}/>
                <h2>Status</h2>
                <input type="text" placeholder="" ref={statusRef}/>
                <input type="submit" value="Update profile" />
            </form>
        </div>
     );
}
 
export default Profile;