import style from './ChatPreview.module.css'

export default function ChatPreview({chatName, openChat}) {

    return (
        <div className={style.chat}>
            <div>{chatName}</div>
            <div>
                <button onClick={openChat}>openChat</button>
            </div>
        </div>
    );
}
