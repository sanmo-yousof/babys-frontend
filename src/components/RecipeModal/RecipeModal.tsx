import iconTime from "../../assets/icons/icon_time.svg";
import iconPlate from "../../assets/icons/icon_plate.svg";
import iconStar from "../../assets/icons/icon_star.svg";

import { MdClose } from "react-icons/md";

type RecipeDetails = {
  category: string;
  imageURL: string;
  title: string;
  shortDescription: string;
  preparationTime: number;
  numberPersons: number;
  longDescription:string;
  likes: number;
};

type Props = {
  recipe: RecipeDetails;
  onClose: () => void;
};

export default function RecipeModal({ recipe, onClose }: Props) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-500 flex items-center justify-center backdrop-blur-md bg-black/50">
      {/* modal box */}
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg w-[90%] h-[90%] md:h-auto overflow-y-auto max-w-3xl overflow-hidden relative">
        <div className="flex justify-between mb-4 items-center">
          <h3 className="text-orange font-roboto-slab font-bold xl:text-2xl tracking-none">
            {recipe?.title}
          </h3>
          {/* close button */}
          <button
            onClick={onClose}
            className=" text-gray-600 text-2xl cursor-pointer hover:text-black"
          >
            <MdClose />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {/* image */}
            <img
              src={recipe.imageURL}
              alt={recipe.title}
              className="w-full h-60 rounded-md object-cover"
            />

            <div className="flex items-center justify-between">
              <h3 className="text-green font-roboto-slab font-bold xl:text-lg tracking-none">
                Best Service For
              </h3>
              <span className=" bg-green text-white font-roboto-slab text-xs font-bold py-1 px-3 rounded-full">
                {recipe?.category}
              </span>
            </div>
            <p className="text-sm text-gray-400">{recipe.shortDescription}</p>

            <div className="font-roboto-slab flex gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={iconTime}
                  alt="time icon"
                  draggable={false}
                  width={16}
                  height={16}
                />
                <span className="text-darkgrey text-xs font-bold">
                  {recipe?.preparationTime} min
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={iconPlate}
                  alt="plate icon"
                  draggable={false}
                  width={16}
                  height={16}
                />
                <span className="text-darkgrey text-xs font-bold">
                  {recipe?.numberPersons} persons
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={iconStar}
                  alt="star icon"
                  draggable={false}
                  width={16}
                  height={16}
                />
                <span className="text-darkgrey text-xs font-bold">
                  {recipe?.likes}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-green font-roboto-slab font-bold xl:text-lg tracking-none">
             Recipe Details
            </h3>
            <p className="text-sm text-gray-400">{recipe.longDescription}</p>
          </div>
        </div>


      </div>
    </div>
  );
}
