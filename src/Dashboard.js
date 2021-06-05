import ContactsBar from './ContactsBar'
import ChatList from './ChatList'
import ChatView from './ChatView'
import Swipe, { SwipeItem } from 'swipejs/react';
import {useEffect, useState} from 'react';
import NewChat from './NewChat';
import firebase from "./firebase"
import { FireSQL } from 'firesql';
import 'firesql/rx'; // <-- Important! Don't forget
import 'firebase/firestore';
import { useAuth } from './contexts/AuthContext'

const Dashboard = () => {


    let swipeEl;

    const [colourClass0, setColour0] = useState('selected');
    const [colourClass1, setColour1] = useState('');
    const [colourClass2, setColour2] = useState('');
    const [viewMessages, setMessages] = useState([]);
    const [chatID, setChatID] = useState('');
    const [chats ,setChats] = useState([]);
    const [allUsers ,setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [chatMembers, setChatMembers] = useState([])
    const [reloadContacts, setReloadContacts] = useState(false)
    //const [reloadChats, setReloadChats] = useState(false)
    const [minimizeEverything, setMinimizeEverything] = useState(false)

    const MESSAGESref = firebase.firestore().collection("messages")
    const fireSQL = new FireSQL(firebase.firestore())
    const { currentUser } = useAuth()

    var usersRef
    var usersActiveChats = []

    useEffect(()=>{
        if (reloadContacts) {
            console.log("Reloading Contacts..........")
            setReloadContacts(false)
            usersRef = firebase.firestore().collection("users")
            populateContactsList()
        }
    },[reloadContacts])

    useEffect(() =>{
        usersRef = firebase.firestore().collection("users")
        populateActiveChats()
        populateContactsList()
    },[])

    async function populateContactsList(){
        await usersRef.get().then((usersDoc) => {
            var foundUsers = []
            usersDoc.forEach((doc) => {
                if (doc.data().email !== currentUser.email) {
                    foundUsers.push(doc.data())
                }
            })
            setAllUsers(foundUsers)
        })
    }

    function populateActiveChats() {
        console.log("Trying to get active chat list")
        var currentUserIDCLEANED = "'" + currentUser.uid + "'"
        const usersChats$ = fireSQL.rxQuery(`
            SELECT activeChats
            FROM users
            WHERE uid = (`+ currentUserIDCLEANED +`)`
        );
        usersChats$.subscribe(results =>{
            //console.log(results[0].activeChats)
            usersActiveChats = results[0].activeChats
            if (usersActiveChats.toString() !== '[object Object]') {
                getChats()        
            } else{
                setIsLoading(false)
            }
        })
    }

    const getChats = () =>{
        console.log("Trying to get chats")
        console.log(usersActiveChats.toString())
        var usersActiveChatsCLEANED = "'" + usersActiveChats.join("','") + "'";
        const chats$ = fireSQL.rxQuery(`
            SELECT *
            FROM chats
            WHERE id IN (`+ usersActiveChatsCLEANED +`)`
        );
        chats$.subscribe(results => {
            console.log("Subscribing to chats")
            var newResults = [...results]
            setChats(newResults)
            setIsLoading(false)
        });
    }

    const goToChat = (id) => {     
        swipeEl.slide(1,500)
        var chatID = id.chatID
        var chatMessages
        console.log("Trying to get messages for: ", chatID)
        var chatIDCLEANED = "'"+ chatID + "'"
        setIsLoading(true)
        const messages$ = fireSQL.rxQuery(`
            SELECT *
            FROM messages
            WHERE chatID =` + chatIDCLEANED +`
            ORDER BY timestamp`
        );
        messages$.subscribe(results => {
        console.log(results)
        chatMessages = results
        setMessages(chatMessages)
        setChatID(chatID)
        setIsLoading(false)
        chatScrollToBottom()
        });
    }
    
    function newSentMessage([id, messageContent], callback = refreshMessageList) {
        if (messageContent.content.replace(/ /g,'') === '' ) {
            console.log("blank")
        } else {
            var chatID = id.chatID
            var chatMessages
            var chatIDCLEANED = "'"+ chatID + "'"
            const messagesPromiseInit = fireSQL.query(`
                SELECT *
                FROM messages
                WHERE chatID =` + chatIDCLEANED
            );
            messagesPromiseInit.then(messages => {
                console.log(messages)
                chatMessages = messages
                var current = new Date();
                messageContent.time = current.toLocaleTimeString().slice(0,-6) + " " +  current.toLocaleTimeString().slice(-2)
                messageContent.messageID = chatMessages.length + 1
                messageContent.chatID = chatID
                messageContent.timestamp = firebase.firestore.Timestamp.fromDate(new Date())
                MESSAGESref.add(messageContent)
                const messagesPromiseEnd = fireSQL.query(`
                    SELECT *
                    FROM messages
                    WHERE chatID =` + chatIDCLEANED +`
                    ORDER BY timestamp`
                );

                messagesPromiseEnd.then(messages => {
                    console.log(messages)
                    chatMessages = messages
                    //callback(chatMessages)
                });
            });

            

           
        } 
    }

    function refreshMessageList(chatMessages){
        let chatMessagesNew = [...chatMessages]
        setMessages(chatMessagesNew)
        console.log("Messages refreshed")
        chatScrollToBottom()
    }

    function chatScrollToBottom(){
        setTimeout(function(){
            var objDiv = document.querySelector("div.messages")
            objDiv.scrollTop = objDiv.scrollHeight;
            console.log("Chat Scrolled")
        },100)
        
    }

    const goToChatBasic = () => {
        swipeEl.slide(1,500)
    }
    
    const changeButtonColour = (index) => {
        var slideIndex = index
        var messageTextElement = document.querySelector("textarea.messageInput");
        if (slideIndex === 0) {
            setColour0('selected')
            setColour1('')
            setColour2('')
            messageTextElement.blur()
        } else if (slideIndex === 1) {
            setColour1('selected')
            setColour0('')
            setColour2('')
        }else if (slideIndex === 2) {
            setColour2('selected')
            setColour1('')
            setColour0('')
            messageTextElement.blur()
        }
    }      

    return ( 
        <div className="dashboardWindow">
            
            <ContactsBar setMinimizeEverything={setMinimizeEverything} minimizeEverything={minimizeEverything} setReloadContacts={setReloadContacts} setChatMembers={setChatMembers} allUsers={allUsers}></ContactsBar>
            <NewChat setMinimizeEverything={setMinimizeEverything} chatGroup={chatMembers}></NewChat>
            <div>
            <nav className="dashButtons">
                <button className={colourClass0} id='chats' onClick={() => swipeEl.slide(0,500)}>CHATS</button>
                <button className={colourClass1} id='chat-messages' onClick={goToChatBasic} chatid={chatID}>CHAT_NAME</button>
                <button className={colourClass2} id='chat-tools' onClick={() => swipeEl.slide(2,500)}>CHAT_TOOLS</button>
            </nav>
            { isLoading && <div className="loading" ><img src="loader.svg" alt="" /></div>}
            <Swipe ref={o => swipeEl = o} callback={changeButtonColour} startSlide={0} auto={0} >
                <SwipeItem>
                    <ChatList  goToChat={goToChat} chats={chats}></ChatList>
                </SwipeItem>
                <SwipeItem>
                    <ChatView newSentMessage={newSentMessage} messageList={viewMessages} chatID={chatID}></ChatView>
                </SwipeItem>
                <SwipeItem></SwipeItem>
            </Swipe>            
            </div>
        </div>
     );
}


export default Dashboard;