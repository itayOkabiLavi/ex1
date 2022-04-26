import ChatItem from "../components/ChatComponents/ChatItem";
import ChatDisplay from "../components/ChatComponents/ChatItemDisplay";
import Message from "../components/ChatComponents/Message";

export default function parseUserChats( user, newContactInfo, chatCompSetState ) {
    let chats = []
    function parseMessages(msgsArray) {
        let msgsObjArray = []
        msgsArray.forEach(msg => {msgsObjArray.push(
                <Message
                    fromMe={"msg.fromMe"}
                    type={"msg.type"}
                    mmContent={"msg.content.mm"}
                    txtContent={"msg.content.txt"}
                    date={ {time: "00", date: "00"}}
                />
            )
        })
        return msgsObjArray
    };
    user.chats.forEach(chat => {
        chats.push(<ChatItem
                    key={chat.addressee}
                    name={chat.addressee}
                    is_mail={true}
                    contact_info={newContactInfo}
                    img={chat.img}
                    lastMessage={chat.messages[chat.messages.length - 1]}
                    messages={parseMessages(chat.messages)}
                    callBack={(childsDisplay, id) => {
                        chatCompSetState(childsDisplay);}}
                />
        )
    });
    return chats
}