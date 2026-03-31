import React, { useMemo, useState } from "react";
import InputField from "../components/ui/InputField";
import Container from "../components/ui/Container";
import SectionHeadingText from "../components/ui/SectionHeadingText";
import Button from "../components/ui/Button";
import { postApi } from "../libs/apiHandler";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function CreateAccountPage() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const fields = useMemo(
    () => [
      {
        label: "First Name",
        name: "firstName" as const,
        type: "text" as const,
        placeholder: "John",
        autoComplete: "given-name",
      },
      {
        label: "Last Name",
        name: "lastName" as const,
        type: "text" as const,
        placeholder: "Smith",
        autoComplete: "family-name",
      },
      {
        label: "Email",
        name: "email" as const,
        type: "email" as const,
        placeholder: "john@smith.com",
        autoComplete: "email",
      },
      {
        label: "Birthday",
        name: "birthday" as const,
        type: "date" as const,
        autoComplete: "bday",
        max: todayISO,
      },
      {
        label: "Password",
        name: "password" as const,
        type: "password" as const,
        placeholder: "******",
        autoComplete: "new-password",
      },
      {
        label: "Repeat Password",
        name: "confirmPassword" as const,
        type: "password" as const,
        placeholder: "******",
        autoComplete: "new-password",
      },
    ],
    [todayISO],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (data: FormState) => {
    const nextErrors: FormErrors = {};

    if (!data.firstName.trim()) nextErrors.firstName = "First name required";
    if (!data.lastName.trim()) nextErrors.lastName = "Last name required";
    if (!data.email.trim()) nextErrors.email = "Email required";
    if (!data.birthday.trim()) nextErrors.birthday = "Birthday required";
    if (!data.password) nextErrors.password = "Password required";
    if (!data.confirmPassword)
      nextErrors.confirmPassword = "Repeat password required";
    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      nextErrors.confirmPassword = "Password not match";
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) return;

    try {
      const res = await postApi("/auth/create-user", form);
      if (res?.status === 201) {
        setUser(res?.data?.data)
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          birthday: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        toast.success("Account Created successfully!");
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
        <SectionHeadingText text="Create Account" />

        {/* Main layout */}
        <div className="mt-5 md:mt-10 lg:mt-14 xl:mt-25 flex flex-col md:flex-row md:items-start gap-8 md:gap-10 xl:gap-25.5">
          {/* Left content */}
          <div className="flex-1 md:max-w-100 lg:max-w-172 font-roboto-slab md:space-y-6 lg:space-y-7.5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-10 lg:leading-15 ">
              <span className="text-orange">Create your </span>
              {window.screen.width > 640 && <br />}
              <span className="text-darkgrey">account</span>
            </h2>

            <p className="font-normal w-full max-w-125 text-xs md:text-base lg:text-[20px] leading-5 md:leading-6 lg:leading-6.5 text-mid-grey">
              All the Lorem Ipsum generators on the Internet tend to repeat
              predefined chunks as necessary, making this the first true
              generator on the Internet. It uses a dictionary of over 200 Latin
              words, combined with a handful of model sentence structures, to
              generate Lorem Ipsum which looks reasonable.
            </p>
          </div>

          {/* Right form */}
          <div className="flex-1 w-full max-w-155">
            <form onSubmit={handleSubmit} className="w-full sm:p-6">
              {/* Responsive input grid */}
              <div className="grid grid-cols-1 gap-x-8.25 md:grid-cols-2 mb-6">
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
              <Button text="create account" />
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
