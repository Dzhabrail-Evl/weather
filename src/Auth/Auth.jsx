import auth from "./Auth.module.scss";
import SignIn from "../components/auth/SignIn/SignIn";
import { useState } from "react";
import SignUp from "../components/auth/SignUp/SignUp";

export default function Auth() {

    const [checkAuth, setCheckAuth] = useState(true);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <section className={auth.auth}>
            <div className={auth.auth__links}>
                <div 
                    onClick={() => setCheckAuth(true)}
                    className={`
                        ${auth.auth__link_inner} 
                        ${checkAuth ? 
                        auth["auth__link--active"] : ''}
                    `}
                >
                    <p>Вход</p>
                </div>
                <div 
                    onClick={() => setCheckAuth(false)}
                    className={`
                        ${auth.auth__link_inner} 
                        ${!checkAuth ? 
                        auth["auth__link--active"] : ''}
                    `}
                >
                    <p>Регистрация</p>
                </div>
            </div>
            {checkAuth ?
                <SignIn 
                    login={login} 
                    setLogin={setLogin} 
                    password={password} 
                    setPassword={setPassword} 
                />
            : !checkAuth ?
                <SignUp 
                    login={login}
                    setLogin={setLogin} 
                    password={password}
                    setPassword={setPassword}
                    setCheckAuth={setCheckAuth}
                />
            : ""}
        </section>
    );
};