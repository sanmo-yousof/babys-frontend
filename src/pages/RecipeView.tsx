import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

import Container from "../components/ui/Container";
import SectionHeadingText from "../components/ui/SectionHeadingText";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";

import imagePlaceholder from "../assets/images/imagePlaceholder.png";
import { cn } from "../libs/utils";
import { getApi, patchApi, postApi } from "../libs/apiHandler";
import type { Category, Recipe } from "../types/recipe";



type FormState = {
  recipeImage: File | null;
  title: string;
  category: Category | "";
  preparationTime: string;
  people: string;
  shortDescription: string;
  recipe: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function TextareaField(props: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  rows?: number;
}) {
  const { label, name, value, onChange, placeholder, error, rows = 6 } = props;

  const base =
    "w-full rounded-md border bg-[#F0EFEA] text-mid-grey px-3 py-2 text-sm leading-5 outline-none transition " +
    "focus:ring-2 focus:ring-lime-500/30";

  const state = error
    ? "border-rose-400 focus:border-rose-400 focus:ring-rose-500/20"
    : "border-mid-grey focus:border-lime-500";

  return (
    <div className="w-full">
      <label
        htmlFor={String(name)}
        className="mb-1 block text-[16px] font-semibold tracking-wide text-orange font-roboto-slab"
      >
        {label}
      </label>

      <textarea
        id={String(name)}
        name={String(name)}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(base, state, "font-roboto resize-none")}
      />

      <div className="mt-1 min-h-4.5">
        {error ? <p className="text-xs text-rose-600">{error}</p> : null}
      </div>
    </div>
  );
}

function SelectField(props: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  error?: string;
}) {
  const { label, name, value, onChange, options, error } = props;

  const base =
    "w-full rounded-md border bg-[#F0EFEA] px-3 py-2 text-sm text-slate-800 outline-none transition " +
    "focus:ring-2 focus:ring-lime-500/30";

  const state = error
    ? "border-rose-400 focus:border-rose-400 focus:ring-rose-500/20"
    : "border-mid-grey focus:border-lime-500";

  return (
    <div className="w-full">
      <label
        htmlFor={String(name)}
        className="mb-1 block text-[16px] font-semibold tracking-wide text-orange font-roboto-slab"
      >
        {label}
      </label>

      <select
        id={String(name)}
        name={String(name)}
        value={value}
        onChange={onChange}
        className={`${base} ${state} font-roboto`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="mt-1 min-h-4.5">
        {error ? <p className="text-xs text-rose-600">{error}</p> : null}
      </div>
    </div>
  );
}

export default function RecipeView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState<FormState>({
    recipeImage: null,
    title: "",
    category: "",
    preparationTime: "",
    people: "",
    shortDescription: "",
    recipe: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string>(imagePlaceholder);

  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const res = await getApi<{data: {data: Recipe}}>(`/recipe/single-recipe/${id}`);
        const recipe = res?.data?.data;
        setForm({
          recipeImage: null,
          title: recipe.title || "",
          category: recipe.category?.toLowerCase() as Category || "",
          preparationTime: String(recipe.preparationTime || ""),
          people: String(recipe.numberPersons || ""),
          shortDescription: recipe.shortDescription || "",
          recipe: recipe.longDescription || "",
        });

        setPreviewUrl(recipe.imageURL);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load recipe");
      }
    };

    fetchRecipe();
  }, [id]);

  const categoryOptions = useMemo(
    () => [
      { label: "Select category", value: "" },
      { label: "Breakfast", value: "breakfast" },
      { label: "Lunch", value: "lunch" },
      { label: "Dinner", value: "dinner" },
      { label: "Brunch", value: "brunch" },
    ],
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value as FormState[keyof FormState],
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePickImage = () => fileRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, recipeImage: file }));
    setErrors((prev) => ({ ...prev, recipeImage: "" }));

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageURL = previewUrl;
      if (form.recipeImage) {
        const formData = new FormData();
        formData.append("file", form.recipeImage);
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
        imageURL = data.secure_url;
      }

      const payload = {
        title: form.title,
        category: form.category,
        preparationTime: Number(form.preparationTime),
        numberPersons: Number(form.people),
        shortDescription: form.shortDescription,
        longDescription: form.recipe,
        imageURL,
      };

      if (id) {
        await patchApi(`/recipe/update-recipe/${id}`, payload);
        toast.success("Recipe updated successfully!");
      } else {
        await postApi("/recipe/create-recipe", payload);
        toast.success("Recipe created successfully!");
      }

      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save recipe");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="min-h-screen">
      <Container className="py-26 md:py-34 xl:pt-48.25 xl:pb-32.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <SectionHeadingText text="Edit Recipes" />
          </div>

          <button
            type="button"
            onClick={handleBack}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange/40"
            aria-label="Back"
            title="Back"
          >
            <FiArrowLeft className="text-[22px]" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-[260px_1fr_1fr] xl:gap-12">
          {/* Left: Recipe Image */}
          <div className="w-full">
            <p className="mb-3 text-[16px] font-bold text-orange font-roboto-slab">
              Recipe Image
            </p>

            <div className="w-full overflow-hidden rounded-md border border-mid-grey bg-[#F0EFEA]">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Recipe preview"
                  className="h-37.5 w-full object-cover md:h-40"
                />
              ) : (
                <div className="flex h-37.5 w-full items-center justify-center text-sm text-mid-grey">
                  No image
                </div>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={handlePickImage}
              className="mt-3 w-full rounded-md border border-mid-grey bg-transparent px-4 py-2 text-[14px] font-semibold uppercase tracking-wide text-mid-grey transition hover:bg-black/5 cursor-pointer"
            >
              Upload Image
            </button>

            <div className="mt-1 min-h-4.5">
              {errors.recipeImage ? (
                <p className="text-xs text-rose-600">{errors.recipeImage}</p>
              ) : null}
            </div>
          </div>

          {/* Middle: Form fields */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full">
              <div>
                {/* Title */}
                <InputField
                  label="Recipe Title"
                  name="title"
                  type="text"
                  placeholder="Homemade Pizza"
                  autoComplete="off"
                  value={form.title}
                  onChange={handleInputChange}
                  error={errors.title}
                />

                {/* Row: category + time + people */}
                <div className="grid grid-cols-1 gap-x-8.25 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
                  <SelectField
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleSelectChange}
                    options={categoryOptions}
                    error={errors.category}
                  />

                  <InputField
                    label="Preparation Time"
                    name="preparationTime"
                    type="number"
                    placeholder="45"
                    autoComplete="off"
                    value={form.preparationTime}
                    onChange={handleInputChange}
                    error={errors.preparationTime}
                  />

                  <InputField
                    label="No. People"
                    name="people"
                    type="number"
                    placeholder="4"
                    autoComplete="off"
                    value={form.people}
                    onChange={handleInputChange}
                    error={errors.people}
                  />
                </div>

                {/* Short Description */}
                <TextareaField
                  label="Short Description"
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleTextareaChange}
                  placeholder="Write short description..."
                  error={errors.shortDescription}
                  rows={4}
                />

                
                <div>
                  <Button
                    text={loading ? "Saving..." : "save"}
                    disabled={loading}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="w-full md:col-span-2 xl:col-span-1">
            <TextareaField
              label="Recipe"
              name="recipe"
              value={form.recipe}
              onChange={handleTextareaChange}
              placeholder="Write full recipe..."
              error={errors.recipe}
              rows={12}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
