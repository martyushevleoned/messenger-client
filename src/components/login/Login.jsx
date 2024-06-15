import React, {useState} from 'react';
import style from './Login.module.css'

export default function Login({updateJwt}) {

    const [signIn, setSignIn] = useState('');
    const setAuth = () => setSignIn('')
    const setRegister = () => setSignIn(style.active)

    const handleRegister = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/signUp", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": event.target.username.value,
                "password": event.target.password.value,
                "email": event.target.email.value
            })
        })
            .then(response => {
                if (response.ok) {
                    response.text().then(text => alert(text));
                    setAuth();
                } else {
                    response.text().then(text => alert(text));
                }
            })
    }

    const handleAuth = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/signIn", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": event.target.username.value,
                "password": event.target.password.value
            })
        })
            .then(response => {
                if (response.ok) {
                    response.text().then(text => {
                        localStorage.setItem("jwt", text);
                        updateJwt()
                    });
                } else {
                    response.text().then(text => alert(text));
                }
            })
    }

    return (
        <div className={style.body}>
            <div className={style.container + " " + signIn}>
                <div className={style.formContainer + " " + style.signUp}>
                    <form className={style.form} onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <input className={style.input} required type="text" name="username" placeholder="Username"/>
                        <input className={style.input} required type="email" name="email" placeholder="Email"/>
                        <input className={style.input} required type="password" name="password" placeholder="Password"/>
                        <button className={style.button}>Sign Up</button>
                    </form>
                </div>
                <div className={style.formContainer + " " + style.signIn}>
                    <form className={style.form} onSubmit={handleAuth}>
                        <h1>Sign In</h1>
                        <input className={style.input} required type="text" name="username" placeholder="Username"/>
                        <input className={style.input} required type="password" name="password" placeholder="Password"/>
                        <button className={style.button}>Sign In</button>
                    </form>
                </div>
                <div className={style.toggleContainer}>
                    <div className={style.toggle}>
                        <div className={style.togglePanel + " " + style.toggleLeft}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className={style.hidden + " " + style.button} onClick={setAuth}>Sign In</button>
                        </div>
                        <div className={style.togglePanel + " " + style.toggleRight}>
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className={style.hidden + " " + style.button} onClick={setRegister}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
