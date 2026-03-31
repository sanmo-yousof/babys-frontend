import { cn } from '../../libs/utils';

export default function Container({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('w-full max-w-360 mx-auto px-5 sm:px-6 md:px-7 lg:px-8', className)}>
            {children}
        </div>
    );
}
