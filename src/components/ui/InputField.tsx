type FormInputProps = {
    label: string;
    name: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

    error?: string;
    autoComplete?: string;
    disabled?: boolean;
    max?: string;
};

export default function InputField({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    autoComplete,
    disabled,
    max,
}: FormInputProps) {
    const base =
        'w-full rounded-md border bg-[#F0EFEA] px-3 py-2 text-sm text-slate-800 outline-none transition ' +
        'focus:ring-2 focus:ring-lime-500/30 disabled:cursor-not-allowed disabled:opacity-60';

    const state = error
        ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-500/20'
        : 'border-mid-grey focus:border-lime-500';

    return (
        <div className="w-full">
            <label
                htmlFor={name}
                className="mb-1 md:mb-2.5 block text-[16px] font-semibold tracking-wide text-orange font-roboto-slab"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                disabled={disabled}
                max={max}
                className={`${base} ${state} font-roboto`}
            />

            <div className="mt-1 min-h-4.5">
                {error ? <p className="text-xs text-rose-600">{error}</p> : null}
            </div>
        </div>
    );
}
