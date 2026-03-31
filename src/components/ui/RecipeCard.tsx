import iconTime from "../../assets/icons/icon_time.svg";
import iconPlate from "../../assets/icons/icon_plate.svg";
import iconStar from "../../assets/icons/icon_star.svg";
import placeHolder from "../../assets/images/imagePlaceholder.png";
import { MdDoubleArrow } from "react-icons/md";

type RecipeDetails = {
  category: string;
  imageURL: string;
  title: string;
  shortDescription: string;
  preparationTime: number;
  numberPersons: number;
  likes: number;
};

type RecipeCardProps = {
  recipe: RecipeDetails;
  onClick?: () => void;
};
export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-full max-w-100 cursor-pointer rounded-md overflow-hidden border border-lightgrey shadow-[0px_10px_20px_#00000012] group"
    >
      <div className="relative">
        <div className="overflow-hidden h-68">
          <img
            src={recipe?.imageURL || placeHolder}
            onError={(e) => (e.currentTarget.src = placeHolder)}
            alt={"food"}
            width={"100%"}
            height={"100%"}
            className="group-hover:scale-110 w-full h-full duration-300"
          />
        </div>
        <span className="absolute top-5 left-6 bg-green text-white font-roboto-slab text-sm font-bold py-1 px-3 rounded-full">
          {recipe?.category}
        </span>
      </div>

      <div className="p-6 bg-white">
        <div className="space-y-4">
          {/* Recipe details */}
          <div className="space-y-2.5">
            <h3 className="text-orange font-roboto-slab font-bold xl:text-xl tracking-none">
              {recipe?.title}
            </h3>
            <p className="font-normal text-sm text-mid-grey tracking-tight leading-5 line-clamp-4">
              {recipe?.shortDescription}
            </p>
          </div>

          {/* recipe info */}
          <div className="flex items-center justify-between">
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

            {/* arrow icon */}

            <div className="w-7 aspect-square bg-green rounded-md text-white grid place-items-center cursor-pointer">
              <MdDoubleArrow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
