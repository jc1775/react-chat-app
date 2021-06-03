
const ChatItem = (props) => {
    let goToChat = props.goToChat
    let chatImage = props.chatImage
    let chatName = props.chatName
    let timeUpdated = props.timeUpdated
    let recentText = props.recentText
    let chatID = props.chatID

    return ( 
        <div className="chatItem">
            <img src={chatImage} alt="" />
            <button onClick={() => goToChat({chatID})} className="chatInfo">
                <p className="previewText">{recentText}</p>
                <div className="nameAndDate">
                    <p className="name">{chatName}</p>
                    <p className="date">{timeUpdated}</p>
                </div>
            </button>
        </div>
     );
}
 
export default ChatItem;