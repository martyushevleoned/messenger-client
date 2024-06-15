import React, {useState} from 'react';
import Login from './login/Login.jsx';
import Main from './main/Main.jsx';

export default function App() {

    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const updateJwt = () => setJwt(localStorage.getItem("jwt"));

    if (jwt === null)
        return (<Login updateJwt={updateJwt}/>);
    else
        return (<Main updateJwt={updateJwt}/>);
}
