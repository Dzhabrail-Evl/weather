import icons from './icons.json'

export default function Icon({onClick, name, className}) {
    return (
        <div
            className={className ? className : ""}
            onClick={onClick}
            dangerouslySetInnerHTML={{__html: icons[name]}}
        >
        </div>
    );
};