import ChatItem from './ChatItem'

const ChatList = (props) => {
    let chats = props.chats
    let goToChat = props.goToChat

    return ( 
        <div className="chatList">
            {chats.map((chat) => (
                <ChatItem goToChat={goToChat} key={chat.id} chatID={chat.id} chatImage={chat.chatImage} chatName={chat.chatName} recentText={chat.recentText} timeUpdated={chat.timeUpdated}></ChatItem>
            ))}
        </div>
     );
}
 
export default ChatList;