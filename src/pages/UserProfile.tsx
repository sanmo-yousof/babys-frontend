import React, { useMemo, useRef, useState, useEffect } from "react";
import InputField from "../components/ui/InputField";
import Container from "../components/ui/Container";
import SectionHeadingText from "../components/ui/SectionHeadingText";
import Button from "../components/ui/Button";
import userProfile from "../assets/images/user-profile.png";
import { useAuth } from "../hooks/useAuth";
import { patchApi } from "../libs/apiHandler";
import toast from "react-hot-toast";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type Field = {
  label: string;
  name: keyof FormState;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  max?: string;
};

export default function UserProfile() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const { user, fetchCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        birthday: user.birthday ? user.birthday.slice(0, 10) : "",
      }));
      if (user.imageURL) {
        setPreviewImage(user.imageURL);
      }
    }
  }, [user]);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const fields = useMemo<Field[]>(
    () => [
      {
        label: "First Name",
        name: "firstName",
        type: "text",
        placeholder: "John",
        autoComplete: "given-name",
      },
      {
        label: "Last Name",
        name: "lastName",
        type: "text",
        placeholder: "Smith",
        autoComplete: "family-name",
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "john@smith.com",
        autoComplete: "email",
      },
      {
        label: "Birthday",
        name: "birthday",
        type: "date",
        autoComplete: "bday",
        max: todayISO,
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "******",
        autoComplete: "new-password",
      },
      {
        label: "Repeat Password",
        name: "confirmPassword",
        type: "password",
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

    if (!data.email.trim()) {
      nextErrors.email = "Email required";
    } else {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
      if (!emailOk) nextErrors.email = "Please Input Valid email";
    }

    if (!data.birthday.trim()) nextErrors.birthday = "Birthday required";

    const hasAnyPassword = Boolean(data.password || data.confirmPassword);
    if (hasAnyPassword) {
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
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) return;

    setLoading(true);
    try {
      let imageURL = user?.imageURL || "";

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        );
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();
        if (data.secure_url) {
          imageURL = data.secure_url;
        } else {
          console.error("Cloudinary error:", data);
        }
      }

      const payload: any = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        birthday: form.birthday,
        imageURL,
      };

      if (form.password) {
        payload.password = form.password;
        payload.confirmPassword = form.confirmPassword;
      }

      const response = await patchApi("/auth/update-user", payload);
      if (response?.data) {
        toast.success("Profile updated successfully!");
        setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
        if (fetchCurrentUser) await fetchCurrentUser(false);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePickAvatar = () => fileRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <section>
      <Container className="py-26 md:py-34 xl:pt-48.25 xl:pb-32.5">
        <SectionHeadingText text="My Profile" />

        <div className="mt-5 md:mt-10 lg:mt-14 xl:mt-25 flex flex-col gap-10 md:flex-row md:items-start xl:gap-25">
          {/* Left: user profile */}
          <div className="w-full md:w-65">
            <div className="flex flex-col items-center justify-center">
              <div className="h-35 w-35 overflow-hidden rounded-full bg-[#E7E5DC] shadow-sm">
                <img
                  src={previewImage || userProfile}
                  alt="profile"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = userProfile;
                  }}
                />
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={handlePickAvatar}
                className="mt-6 w-full max-w-45 rounded-md border border-mid-grey bg-transparent px-4 py-2 text-xs font-normal text-[14px] uppercase tracking-wide text-mid-grey transition hover:bg-black/5 cursor-pointer"
              >
                Change Avatar
              </button>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full max-w-155">
            <form onSubmit={handleSubmit} className="w-full sm:p-6">
              <div className="grid grid-cols-1 gap-x-8.25 md:grid-cols-2">
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
                    max={f.max}
                  />
                ))}
              </div>

              <div className="mt-6">
                <Button
                  text={loading ? "Saving..." : "save"}
                  classname="md:px-10.75"
                  disabled={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
