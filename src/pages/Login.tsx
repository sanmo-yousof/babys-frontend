import React, { useMemo, useState } from "react";
import InputField from "../components/ui/InputField";
import Container from "../components/ui/Container";
import SectionHeadingText from "../components/ui/SectionHeadingText";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { postApi } from "../libs/apiHandler";
import { useNavigate } from "react-router-dom";

type LoginFormState = {
  email: string;
  password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormState, string>>;

export default function Login() {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const fields = useMemo(
    () => [
      {
        label: "Email",
        name: "email" as const,
        type: "email" as const,
        placeholder: "user@domain.com",
        autoComplete: "email",
      },
      {
        label: "Password",
        name: "password" as const,
        type: "password" as const,
        placeholder: "******",
        autoComplete: "current-password",
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

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (data: LoginFormState) => {
    const nextErrors: LoginFormErrors = {};

    if (!data.email.trim()) {
      nextErrors.email = "Email required";
    } else {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
      if (!emailOk) nextErrors.email = "Valid email দিন";
    }

    if (!data.password) nextErrors.password = "Password required";

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) return;

    try {
      const res = await postApi("/auth/login-user", form);
      if (res?.status === 200) {
        setUser(res?.data?.data);
        setForm({
          email: "",
          password: "",
        });
        setErrors({});
        toast.success("Account login successfully!");
        navigate("/user-profile");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };

  return (
    <section className="w-full min-h-[90vh]">
      <Container className="py-26 md:py-34 xl:pt-48.25 xl:pb-32.5">
        {/* Top title with line */}
        <SectionHeadingText text="Log In" />

        {/* Main layout */}
        <div className="mt-5 md:mt-10 lg:mt-14 xl:mt-25 flex flex-col md:flex-row md:items-start gap-8 sm:gap-12 md:gap-12 xl:gap-25.5">
          {/* Left content */}
          <div className="flex-1 md:max-w-100 lg:max-w-172 font-roboto-slab lg:space-y-7.5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-15 ">
              <span className="text-orange">Welcome to </span>
              <span className="text-darkgrey">Baby&apos;s</span>
            </h2>

            <p className="font-normal text-xs md:text-base lg:text-[20px] leading-5 md:leading-6 lg:leading-6.5 text-mid-grey">
              All the Lorem Ipsum generators on the Internet tend to repeat
              predefined chunks as necessary, making this the first true
              generator on the Internet. It uses a dictionary of over 200 Latin
              words, combined with a handful of model sentence structures, to
              generate Lorem Ipsum which looks reasonable. The generated Lorem
              Ipsum is therefore always free from repetition, injected humour,
              or non-characteristic words etc.
            </p>
          </div>

          {/* right form */}
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
