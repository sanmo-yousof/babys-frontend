import { useMemo, useState } from 'react';
import Container from '../../../components/ui/Container';
import SectionHeadingText from '../../../components/ui/SectionHeadingText';
import InputField from '../../../components/ui/InputField';
import Button from '../../../components/ui/Button';

type AdminLoginFormState = {
    adminId: string;
    email: string;
    password: string;
};

type AdminLoginFormErrors = Partial<Record<keyof AdminLoginFormState, string>>;

export default function AdminLogin() {
    const [form, setForm] = useState<AdminLoginFormState>({
        adminId: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<AdminLoginFormErrors>({});

    const fields = useMemo(
        () => [
            {
                label: 'Admin ID',
                name: 'adminId' as const,
                type: 'text' as const,
                placeholder: 'Enter your admin ID',
                autoComplete: 'username',
            },
            {
                label: 'Email',
                name: 'email' as const,
                type: 'email' as const,
                placeholder: 'admin@domain.com',
                autoComplete: 'email',
            },
            {
                label: 'Password',
                name: 'password' as const,
                type: 'password' as const,
                placeholder: '******',
                autoComplete: 'current-password',
            },
        ],
        [],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = (data: AdminLoginFormState) => {
        const nextErrors: AdminLoginFormErrors = {};

        if (!data.adminId.trim()) {
            nextErrors.adminId = 'Admin ID required';
        }

        if (!data.email.trim()) {
            nextErrors.email = 'Email required';
        } else {
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
            if (!emailOk) nextErrors.email = 'This is not valid';
        }

        if (!data.password) nextErrors.password = 'Password required';

        return nextErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nextErrors = validate(form);
        setErrors(nextErrors);

        const hasError = Object.values(nextErrors).some(Boolean);
        if (hasError) return;

        console.log('Admin Login Data:', form);
        alert('Admin login ready! (Check console for data)');
    };

    return (
        <section className="w-full min-h-[90vh]">
            <Container className="py-26 md:py-34 xl:pt-48.25 xl:pb-32.5">
                {/* Top title with line */}
                <SectionHeadingText text="Admin Log In" />

                {/* Main layout */}
                <div className="mt-5 md:mt-10 lg:mt-14 xl:mt-25 flex flex-col md:flex-row md:items-start gap-8 sm:gap-12 md:gap-12 xl:gap-25.5">
                    {/* Left content */}
                    <div className="flex-1 md:max-w-100 lg:max-w-172 font-roboto-slab lg:space-y-7.5">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-15">
                            <span className="text-orange">Admin </span>
                            <span className="text-darkgrey">Portal</span>
                        </h2>

                        <p className="font-normal text-xs md:text-base lg:text-[20px] leading-5 md:leading-6 lg:leading-6.5 text-mid-grey">
                            This portal is restricted to authorized administrators only.
                            Unauthorized access attempts are monitored and logged. Please use your
                            assigned Admin ID and credentials to proceed. If you have lost access,
                            contact the system administrator immediately.
                        </p>
                    </div>

                    {/* Right form */}
                    <div className="flex-1 w-full md:max-w-sm xl:max-w-90 md:justify-self-end">
                        <form onSubmit={handleSubmit} className="w-full sm:p-6">
                            <div className="flex w-full flex-col mb-6">
                                {fields.map((f) => (
                                    <InputField
                                        key={f.name}
                                        label={f.label}
                                        name={f.name}
                                        type={f.type}
                                        placeholder={f.placeholder}
                                        autoComplete={f.autoComplete}
                                        value={form[f.name]}
                                        onChange={handleChange}
                                        error={errors[f.name]}
                                    />
                                ))}
                            </div>

                            <Button text="log in" classname="md:px-12" />
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
}
