import ui from "./Button.module.scss";

export default function Button({width, margin, position, className, method = () => {}, text, type}) {
    return (
        <div 
            className={ui.button}
            style={{
                width: width,
                margin: margin,
                justifyContent: position
            }}
        >
            <button
                className={`${className ? ui[`${className}`] : ""}`}
                onClick={method}
                type={type}
            >
                {text}
            </button>
        </div>
    );
};