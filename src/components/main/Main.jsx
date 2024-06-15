import style from './Main.module.css'
import ChatPreview from './chatPreview/ChatPreview';
import Chat from './chat/Chat.jsx';
import React, {useEffect, useState} from 'react';

export default function Main({updateJwt}) {

    // выход из аккаунта
    const logout = () => {
        localStorage.removeItem("jwt")
        updateJwt();
    }

    // состояние открытого чата
    const [activeChat, setActiveChat] = useState(null);

    // состояние списка чатов
    const [chatList, setChatList] = useState([]);
    useEffect(() => {
        updateChatList();
    })
    const updateChatList = () => {
        fetch("http://localhost:8080/getChats", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => setChatList(json))
                } else {
                    response.text().then(text => alert(text));
                    logout();
                }
            })
    }
    const createChat = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/createChat", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body: event.target.chatName.value
        })
            .then(response => {
                if (response.ok) {
                    response.text().then(text => alert(text));
                    updateChatList()
                } else {
                    response.text().then(text => alert(text));
                    logout();
                }
            })
    }
    const deleteChat = (id) => {
        fetch("http://localhost:8080/deleteChat", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            body: id
        })
            .then(response => {
                if (response.ok) {
                    response.text().then(text => alert(text));
                    updateChatList()
                } else {
                    response.text().then(text => alert(text));
                }
            })
        setActiveChat(null);
        updateChatList();
    }

    // состояние информации о пользователе
    const [user, setUser] = useState({
        "username": null,
        "email": null
    });
    useEffect(() => {
        if (user.email === null && user.username === null) {
            fetch("http://localhost:8080/userInfo", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => setUser(json));
                    } else {
                        alert("Ошибка аутентефикации");
                        logout();
                    }
                });
        }
    });

    return (
        <div className={style.body}>
            <div className={style.container + " " + style.chatList}>
                <div className={style.userInfo}>
                    <div><span>User Info</span></div>
                    <div><span>{user.username}</span></div>
                    <div><span>{user.email}</span></div>
                </div>
                <div className={style.scrollContainer}>
                    {chatList.map(chat => <ChatPreview key={chat.id} chatName={chat.chatName}
                                                       openChat={() => setActiveChat(chat.id)}/>)}
                    <div className={style.addChat}>
                        <form onSubmit={createChat}>
                            <div>
                                <input required type="text" name="chatName" placeholder="Chat name"/>
                            </div>
                            <div>
                                <button type='submit'>создать чат</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={style.logout}>
                    <button onClick={logout}>logout</button>
                </div>
            </div>
            <Chat id={activeChat} closeChat={() => setActiveChat(null)} deleteChat={() => {
                deleteChat(activeChat)
            }}/>
        </div>
    );
}