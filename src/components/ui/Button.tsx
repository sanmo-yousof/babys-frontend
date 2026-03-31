import { cn } from '../../libs/utils';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    classname?: string;
}

export default function Button({ text, classname, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'uppercase bg-green text-white font-bold text-sm md:text-base leading-5 py-2 md:py-3 px-4 md:px-7 rounded cursor-pointer hover:bg-transparent hover:text-mid-grey border-2 border-green hover:border-mid-grey duration-300 transition-colors',
                classname,
            )}
            {...props}
        >
            {text}
        </button>
    );
}
