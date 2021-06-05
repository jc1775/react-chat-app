import { useEffect } from "react";
import ContactTag from "./ContactTag";
import firebase from "./firebase"
import 'firesql/rx'; // <-- Important! Don't forget
import 'firebase/firestore';
import { useAuth } from './contexts/AuthContext'

const NewChat = (props) => {
    let chatMembers = props.chatGroup
    let setMinimizeEverything = props.setMinimizeEverything

    const chatsRef = firebase.firestore().collection("chats")
    const usersRef = firebase.firestore().collection("users")

    const { currentUser } = useAuth()

    function handleStartChat() {
        //console.log("Starting Chat")
        console.log(chatMembers.length)
        if (chatMembers.length === 0) {
            //console.log("No one selected")
        } else {
            //console.log("Creating new chat")
            var newChatRef = chatsRef.doc();
            newChatRef.set({
                chatImage: 'logo192.png',
                chatName: 'New Group Chat',
                recentText: 'Place holder text',
                timeUpdated: '5/20/21',
                id: newChatRef.id
            })
            var chatMembersEmails = [currentUser.email]
            chatMembers.forEach((member) => {
                chatMembersEmails.push(member.getAttribute("contact-email"))
            })
            console.log(chatMembersEmails)
            usersRef.where("email", "in", chatMembersEmails).get().then((members) =>{
                members.forEach((member) => {
                    var memberRef = firebase.firestore().doc("users/"+member.data().uid)
                    console.log(member.data())
                    memberRef.update({
                    activeChats: firebase.firestore.FieldValue.arrayUnion(newChatRef.id) 
                    })
                })
            })
            setMinimizeEverything(true)
            //setReloadChats(true)
        }
    }
    
    useEffect(() => {
        console.log(chatMembers)
    },[chatMembers])

    return ( 
        
        <div className="newChat">
            
            <div className="contactSearch">
                <input type="text" placeholder="Find a contact..." className="search" />
                <button className="startSearch">o</button>
            </div>
            <div className="chatFormation">
                
            </div>
            <div className="chatContext">
                <h2>Start talking to:</h2>
                <div className="tagHolder">
                    {chatMembers.map((member) => (
                        <ContactTag email={member.getAttribute("contact-email")} key={member.getAttribute("contact-email")} display_name={member.getAttribute('contact-display-name')}></ContactTag>
                    ))}
                </div>
                <button className="startChatting" onClick={handleStartChat}>Start Chatting! >>></button>
            </div>
            
        </div>
     );
}
 
export default NewChat;