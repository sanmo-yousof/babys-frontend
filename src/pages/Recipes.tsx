import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import Container from "../components/ui/Container";
import SectionHeadingText from "../components/ui/SectionHeadingText";
import { useFetch } from "../hooks/useFetch";
import { deleteApi } from "../libs/apiHandler";
import toast from "react-hot-toast";
import type { TResponse } from "../types/response";

type Recipe = {
  _id: string;
  title: string;
  category: "BRUNCH" | "LUNCH" | "DINNER" | "BREAKFAST";
  createdAt: string;
  status: string;
};

export default function Recipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  const { data, isLoading } = useFetch<TResponse<Recipe[]>>("/recipe/my-recipe");

  useEffect(() => {
    if (data) {
      setRecipes(data?.data?.data);
    }
  }, [data]);

  const columns = useMemo(
    () =>
      [
        { key: "name", label: "Recipe Name" },
        { key: "category", label: "Category" },
        { key: "createdOn", label: "Created On" },
        { key: "action", label: "Action" },
      ] as const,
    [],
  );

  const handleAdd = () => {
    navigate("/recipes/create");
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      setIsDeleting(true);
      await deleteApi(`/recipe/delete-recipe/${selectedId}`);
      setRecipes((prev) => prev.filter((r) => r._id !== selectedId));
      toast.success("Recipe deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);

      toast.error("Failed to delete recipe ");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  const CategoryBadge = ({ text }: { text: Recipe["category"] }) => {
    return (
      <span className="items-center rounded-md bg-green grid place-items-center text-center w-20 h-5.5 text-[12px] font-bold tracking-wide text-white">
        {text}
      </span>
    );
  };

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  return (
    <section>
      <Container className="py-8 sm:py-10 xl:py-48">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <SectionHeadingText text="My Recipes" />
          </div>
           
          <button
            type="button"
            onClick={handleAdd}
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange/40"
            aria-label="Add new recipe"
            title="Add recipe"
          >
            <FiPlus className="text-[22px]" />
          </button>
        </div>

        <div className="mt-13">
          <div className="hidden md:block">
            <div className="grid grid-cols-[0.3fr_0.3fr_1fr_70px] items-center px-6 py-4">
              <p className="text-[16px] font-bold text-orange font-roboto">
                {columns[0].label}
              </p>
              <p className="text-[16px] font-bold text-orange font-roboto">
                {columns[1].label}
              </p>
              <p className="text-[16px] font-bold text-orange font-roboto">
                {columns[2].label}
              </p>
              <p className="text-right text-[16px] font-bold text-orange font-roboto">
                {columns[3].label}
              </p>
            </div>

            {/* Rows */}
            <div className="space-y-3">
              {recipes?.map((r) => (
                <div
                  key={r._id}
                  onClick={() => navigate(`/my-recipes/recipe/${r._id}`)}
                  className="grid grid-cols-[0.3fr_0.3fr_1fr_70px] items-center rounded-md bg-white px-6 py-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                >
                  <p className="text-[16px] font-bold text-mid-grey">
                    {r.title}
                  </p>

                  <div>
                    <CategoryBadge text={r.category} />
                  </div>

                  <p className="text-[16px] font-bold text-mid-grey">
                    {new Date(r.createdAt)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </p>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(r._id);
                      }}
                      className="inline-flex h-9 w-9 items-center cursor-pointer justify-center rounded-md text-mid-grey/70 transition hover:bg-black/5 hover:text-mid-grey"
                      aria-label={`Delete ${r.title}`}
                      title="Delete"
                    >
                      <FiTrash2 className="text-[18px]" />
                    </button>
                  </div>
                </div>
              ))}

              {recipes?.length === 0 ? (
                <div className="rounded-md bg-white/60 px-6 py-6 text-mid-grey text-center">
                  No recipes found. 
                </div>
              ) : null}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {recipes?.map((r) => (
              <div
                key={r._id}
                onClick={() => navigate(`/my-recipes/recipe/${r._id}`)}
                className="rounded-md bg-white/70 p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-mid-grey">
                      {r.title}
                    </p>
                    <p className="mt-1 text-[12px] text-mid-grey/80">
                      Created:{" "}
                      {new Date(r.createdAt)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(r._id);
                    }}
                    className="inline-flex h-9 w-9 flex-none items-center cursor-pointer justify-center rounded-md text-mid-grey/70 transition hover:bg-black/5 hover:text-mid-grey"
                    aria-label={`Delete ${r.title}`}
                    title="Delete"
                  >
                    <FiTrash2 className="text-[18px]" />
                  </button>
                </div>

                <div className="mt-3">
                  <CategoryBadge text={r.category} />
                </div>
              </div>
            ))}

            {recipes?.length === 0 ? (
              <div className="rounded-md bg-white/60 p-4 text-mid-grey text-center">
                No recipes found.
              </div>
            ) : null}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-mid-grey">
                Confirm Delete
              </h2>
              <p className="mt-2 text-sm text-mid-grey/80">
                Are you sure you want to delete this recipe?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="rounded-md px-4 py-2 text-sm text-mid-grey hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  disabled={isDeleting}
                  onClick={handleConfirmDelete}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                  {isDeleting ? "Deleting" : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>

      <Outlet />
    </section>
  );
}
