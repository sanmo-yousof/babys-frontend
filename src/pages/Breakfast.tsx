import SectionHeadingText from "../components/ui/SectionHeadingText";
import RecipeCard from "../components/ui/RecipeCard";
import Container from "../components/ui/Container";
import { useFetch } from "../hooks/useFetch";
import type { TResponse } from "../types/response";
import type { Recipe } from "../types/recipe";
import { useState } from "react";
import RecipeModal from "../components/RecipeModal/RecipeModal";
import LoadingSpin from "../components/ui/LoadingSpin";

export default function Breakfast() {
  const { data, isLoading } = useFetch<TResponse<Recipe[]>>(
    `/recipe/all-recipe?category=breakfast`,
  );

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <Container className="py-26 md:py-34 xl:pt-48.25 xl:pb-32.5">
      <div className="space-y-10">
        {/* fresh and new recipes */}
        <div>
          <SectionHeadingText text="Breakfast" />
          {!isLoading && data?.data?.data.length === 0 && (
            <p className="text-center py-6 text-sm">No items found</p>
          )}
          {isLoading && (
              <LoadingSpin/>
            )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 xl:gap-x-20 mt-5 md:mt-7 xl:mt-10 place-items-center">
            {data?.data?.data.map((recipe, i) => (
              <RecipeCard
                key={i}
                recipe={recipe}
                onClick={() => handleOpenModal(recipe)}
              />
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </Container>
  );
}
