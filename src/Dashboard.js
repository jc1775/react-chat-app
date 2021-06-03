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

const Dashboard = () => {


    let swipeEl;
    let mainChatView;
    const [colourClass0, setColour0] = useState('selected');
    const [colourClass1, setColour1] = useState('');
    const [colourClass2, setColour2] = useState('');
    const [viewMessages, setMessages] = useState([]);
    const [updateMessageView, forceUpdateMessages] = useState(0)
    const [chatID, setChatID] = useState('');
    const CHATSref = firebase.firestore().collection("chats")
    const MESSAGESref = firebase.firestore().collection("messages")
    const fireSQL = new FireSQL(firebase.firestore())
    const [chats ,setChats] = useState([]);
    let chatsVar = [];
    
    

    useEffect(() =>{
        getChats()
    },[])


    function getChats(){
        CHATSref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {           
                items.push(doc.data())
                
            });
            setChats(items)
            chatsVar = [...items]
            var id = document.querySelector("#chat-messages").getAttribute("chatid")
            console.log("Chat ID is: ", id)
            refreshChat(id)
            
        });
    }

    function refreshChat(id){
        if (id !== ''){
            var chatID = parseInt(id)
            var chatObj = chatsVar.filter(obj => {
                return obj.id === chatID
            })
            var chatMessages = chatObj[0].messages
            setMessages(chatMessages)
            setChatID(chatID)
            console.log("Chat loaded")
            chatScrollToBottom()
        }
    }

/*
    const [chats, setChats] = useState([
        {chatImage: 'logo192.png', chatName: 'Joseph Calarco', recentText: 'lorem impsum...', timeUpdated: '5/20/21', id: 1, messages: [
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 1},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 2},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 3},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 4},
            {author: 'Joseph Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 5},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 6},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 7},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 8},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 9},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 10},

        ]},
        {chatImage: 'logo192.png', chatName: 'Joseph Calarco', recentText: 'lorem impsum...', timeUpdated: '5/20/21', id: 2, messages: [
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 1},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 2},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 3},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 4},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 5},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 6},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 7},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 8},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 9},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 10},

        ]},
        {chatImage: 'logo192.png', chatName: 'Joseph Calarco', recentText: 'lorem impsum...', timeUpdated: '5/20/21', id: 3, messages: [
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 1},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 2},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 3},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 4},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 5},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 6},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 7},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 8},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 9},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 10},

        ]},
        {chatImage: 'logo192.png', chatName: 'Joseph Calarco', recentText: 'lorem impsum...', timeUpdated: '5/20/21', id: 4, messages: [
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 1},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 2},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 3},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 4},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 5},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 6},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 7},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 8},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 9},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 10},

        ]},
        {chatImage: 'logo192.png', chatName: 'Joseph Calarco', recentText: 'lorem impsum...', timeUpdated: '5/20/21', id: 5, messages: [
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 1},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 2},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 3},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 4},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 5},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 6},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 7},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 8},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 9},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 10},

        ]},
        {chatImage: 'logo192.png', chatName: 'Joseph Calarco', recentText: 'lorem impsum...', timeUpdated: '5/20/21', id: 6, messages: [
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 1},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 2},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 3},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 4},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 5},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 6},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 7},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 8},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 9},
            {author: 'Antonino Calarco', time: '1:25 PM', content:'Hello Joseph this is a test message' ,id: 10},

        ]},
        
    ]);

    */

    const goToChat = (id) => {     
        swipeEl.slide(1,500)
        var chatID = id.chatID
        var chatMessages
        /*
        const messagesPromise = fireSQL.query(`
            SELECT *
            FROM messages
            WHERE chatID =` + chatID +`
            ORDER BY timestamp`
        ); */
        const messages$ = fireSQL.rxQuery(`
            SELECT *
            FROM messages
            WHERE chatID =` + chatID +`
            ORDER BY timestamp`
        );
        messages$.subscribe(results => {
        console.log(results)
        chatMessages = results
        setMessages(chatMessages)
        setChatID(chatID)
        console.log("Chat loaded")
        chatScrollToBottom()
        });
    }
    
    function newSentMessage([id, messageContent], callback = refreshMessageList) {
        if (messageContent.content.replace(/ /g,'') === '' ) {
            console.log("blank")
        } else {
            var chatID = id.chatID
            var chatMessages
            const messagesPromiseInit = fireSQL.query(`
                SELECT *
                FROM messages
                WHERE chatID =` + chatID
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
                    WHERE chatID =` + chatID +`
                    ORDER BY timestamp`
                );

                messagesPromiseEnd.then(messages => {
                    console.log(messages)
                    chatMessages = messages
                    callback(chatMessages)
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
            
            <ContactsBar></ContactsBar>
            <NewChat></NewChat>
            <div>
            <nav className="dashButtons">
                <button className={colourClass0} id='chats' onClick={() => swipeEl.slide(0,500)}>CHATS</button>
                <button className={colourClass1} id='chat-messages' onClick={goToChatBasic} chatid={chatID}>CHAT_NAME</button>
                <button className={colourClass2} id='chat-tools' onClick={() => swipeEl.slide(2,500)}>CHAT_TOOLS</button>
            </nav>
            
            <Swipe ref={o => swipeEl = o} callback={changeButtonColour} startSlide={0} auto={0} >
                <SwipeItem><ChatList  goToChat={goToChat} chats={chats}></ChatList></SwipeItem>
                <SwipeItem><ChatView newSentMessage={newSentMessage} messageList={viewMessages} chatID={chatID}></ChatView></SwipeItem>
                <SwipeItem></SwipeItem>
            </Swipe>            
            </div>
        </div>
     );
}


export default Dashboard;