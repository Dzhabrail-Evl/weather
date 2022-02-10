import { useState } from "react";
import Icon from "../Icon/Icon";
import ui from "./Input.module.scss";

const Input = (
    {className,
    label,
    onChange,
    type,
    placeholder,
    width,
    margin,
    padding,
    name,
    register,
    required,
    pattern,
    registerName,
    errors}
) => {
    
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div 
            className={`${ui.input} ${className && className} ${errors[`${registerName}`] && ui["input--error"]}`}
            style={{
                width: width,
                margin: margin
            }}
        >
            <label className={label ? ui.input__label : ""}>{label}</label>
            <input
                autoComplete={type === "password" ? "on" : "off"}
                pattern={pattern && pattern}
                type={type === "password" && showPassword ? "text" : type}
                placeholder={placeholder}
                {...register(registerName, {
                    required: true,
                    minLength: 5
                })}
                onChange={onChange}
                style={{
                    padding: padding
                }}
            />
            {errors[`${registerName}`] !== undefined && console.log(errors[`${registerName}`])}
            {errors[`${registerName}`] && 
                <p className={ui["input-error_message"]}>
                    {errors[`${registerName}`] !== undefined && errors[`${registerName}`].type === "minLength" && "min length is 5"}
                    {errors[`${registerName}`] !== undefined && errors[`${registerName}`].type === "required" && `Please enter your ${registerName}`}
                </p>}
            {type === "password" ? 
                <Icon
                    name={showPassword ? "eye_closed" : "eye_open"}
                    onClick={() => setShowPassword(!showPassword)}
                    className={ui.input__eye}
                    alt="EYE" 
                />
            : "" }
        </div>
    );
}
export default Input;