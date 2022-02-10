import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import component from "./SignIn.module.scss";

export default function SignIn() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    let errorAuth = "";
    const {
        register,
        handleSubmit,
        formState: { errors, submitCount },
    } = useForm({mode: "onBlur"});

    let dataAccounts = [];
    dataAccounts = (Object.keys(localStorage));

    let autPassword = localStorage.getItem(`${login}`);
    const history = useHistory();

    const entenLog = (login, password) => {
        if (dataAccounts) {
            for (let i = 0; i < dataAccounts.length; i++) {
                if (login === dataAccounts[i]) {
                    if (password === autPassword) {
                        history.push("/weather");
                    } else {
                        errorAuth = "Неверный логин или пароль!";
                    }
                } else {
                    errorAuth = "Неверный логин или пароль";
                }
            }
        } else {
            errorAuth = "Вы не зарегистрированы!";
        }
    }

    return (
        <div className={component["sign-in"]}>
            <Input
                type="email"
                label="E-mail"
                placeholder="login@mail.com"
                registerName="email"
                register={register}
                errors={errors}
                onChange={e => setLogin(e.target.value)}
            />
            <Input
                type="password"
                label="Пароль"
                placeholder="Введите пароль"
                registerName="password"
                register={register}
                errors={errors}
                margin="16px 0 0 0"
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                className="button--primary"
                text="enter"
                margin="28px 0 0 0"
                position="center"
                method={() => entenLog(login, password)}
            />
            {errorAuth}
        </div>
    );
};