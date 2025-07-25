
interface ButtonFieldProps {
    type?: 'submit' | 'reset' | 'button';
    buttonClassName: string
    value: string
    onClick?: () => void;
}

const Button: React.FC<ButtonFieldProps> = ({type, buttonClassName, value, onClick}) => {
    return (
        <>
            <button
                type={type}
                className={buttonClassName}
                onClick={onClick}
            >
                {value}
            </button>
        </>
    )
}

export default Button