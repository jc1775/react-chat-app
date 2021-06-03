import Message from "./Message"
import { useEffect } from 'react';
import firebase from "./firebase"

const ChatView = (props) => {
    let messageList = props.messageList
    const newMessageList = Object.keys(messageList).map((key)=> [Number(key), messageList[key]])
    let newSentMessage = props.newSentMessage
    let chatID = props.chatID
    useEffect(() => {
        var messageArea = document.querySelector("div.sendMessage");
        var messageTextElement = document.querySelector("textarea.messageInput");
        messageTextElement.addEventListener("focus",moveTextArea, false);
        messageTextElement.addEventListener("blur",moveTextAreaBack, false);
        function moveTextArea(){
            messageArea.style.paddingBottom = "50px"
        }
        function moveTextAreaBack(){
            messageArea.style.paddingBottom = "10px"
        }
    },[])

    function getText(){
        var textInput =  document.querySelector("textarea.messageInput")
        var text = textInput.value
        textInput.value = ''
        return text
    }

    return ( 
        <div className="chatView">
            <div className="messages">
                {newMessageList.map((message) => (
                    <Message 
                    key={message[1].messageID} 
                    type={ message[1].author === 'Joseph Calarco' ? 'sent': 'received' } 
                    author={message[1].author} 
                    messageContent={message[1].content} 
                    time={message[1].timestamp.toDate().toLocaleTimeString().slice(0,-6) + " " +  message[1].timestamp.toDate().toLocaleTimeString().slice(-2)
                    }></Message>
                ))}
            </div>
            <div className="sendMessage">
                <textarea wrap="hard" placeholder='Type a message' type="text" className="messageInput" />
                <button className="sendMessageButton" onClick={() => newSentMessage([{chatID},{author: 'Joseph Calarco', time: '1:25 PM', content:getText()}])}> 
                    <img src="message.svg" alt="" />
                </button>
            </div>
        </div>
     );
}
 
export default ChatView;