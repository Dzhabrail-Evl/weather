import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import component from "./SignUp.module.scss";

export default function SignUp({login, setLogin, password, setPassword, setCheckAuth}) {

    const [dataForm, setDataForm] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const debouncedLogin = useDebounce(login, 500);
    const onSubmit = data => setDataForm(data);
    let dataAccounts = [];
    dataAccounts = (Object.keys(localStorage));

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
            mode: "onBlur"
        });

    function saveAccount() {
        if (dataForm) {
            if (password === repeatPassword) {
                if (dataAccounts.length > 0) {
                    for (let i = 0; i < dataAccounts.length; i++) {
                        if (login === dataAccounts[i]) {
                            break;
                        } else {
                            setCheckAuth(true);
                            localStorage.setItem(dataForm.Email, dataForm.RepeatPasword);
                        }
                    }
                } else {
                    setCheckAuth(true);
                    localStorage.setItem(dataForm.Email, dataForm.RepeatPasword);
                }
            }
        }
    }

    const inputs = [
        {
            id: 1,
            type: "text",
            label: "Фамилия",
            placeholder: "Фамилия",
            margin: "0 0 0 0",
            registerName: "Surname",
        },
        {
            id: 2,
            type: "text",
            label: "Имя",
            placeholder: "Имя",
            margin: "16px 0 0 0",
            registerName: "Name",
        },
        {
            id: 3,
            type: "email",
            label: "E-mail",
            placeholder: "login@mail.com",
            margin: "16px 0 0 0",
            registerName: "Email",
            onChange: e => setLogin(e.target.value),
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        },
        {
            id: 4,
            type: "password",
            label: "Пароль",
            placeholder: "Введите пароль",
            margin: "16px 0 0 0",
            registerName: "Password",
            onChange: e => setPassword(e.target.value)
        },
        {
            id: 5,
            type: "password",
            label: "Повторите пароль",
            placeholder: "Введите пароль",
            margin: "16px 0 0 0",
            registerName: "RepeatPasword",
            onChange: e => setRepeatPassword(e.target.value)
        },
    ];

    return (
        <div className={component["sign-up"]}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {inputs.map(({id, type, label, placeholder, margin, registerName, onChange}) => 
                    <div key={id}>
                        <Input
                            type={type}
                            label={label}
                            placeholder={placeholder}
                            margin={margin}
                            registerName={registerName}
                            register={register}
                            errors={errors}
                            onChange={onChange}
                        />
                    </div>
                )}
                <Button
                    className="button--primary"
                    text="registration"
                    margin="28px 0 0 0"
                    position="center"
                    type="submit"
                    method={saveAccount()}
                />
            </form>
        </div>
    );
};