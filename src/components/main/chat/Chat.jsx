import style from './Chat.module.css'

export default function Chat({id, closeChat, deleteChat}) {

    if (id === null)
        return (
            <div className={style.container + " " + style.chat}>
                выберите чат
            </div>
        );

    return (
        <div className={style.container + " " + style.chat}>
            <div className={style.messages}>
                messages
            </div>
            <div className={style.chatInfo}>
                <div>chat id: {id}</div>
                <div>
                    <div><button onClick={closeChat}>close chat</button></div>
                    <div><button onClick={deleteChat}>delete chat</button></div>
                </div>
            </div>
        </div>
    );
}
