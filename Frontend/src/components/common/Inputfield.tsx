interface InputFieldProps {
    label: string;
    type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
    name: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    labelClassName?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputFileldClassName?: string;
    error?: string;
    autoComplete?: string;
}

const Inputfield: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    labelClassName,
    inputFileldClassName = '',
    autoComplete,
}) => {
    return (
        <div>
            <label
                htmlFor="email"
                className={labelClassName}
            >
                {label}
            </label>
            <input
                className={inputFileldClassName}
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                autoComplete={autoComplete}
            />
        </div>
    )
}

export default Inputfield