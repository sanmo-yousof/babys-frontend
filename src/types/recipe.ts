export type Category = "Breakfast" | "Lunch" | "Dinner" | "Brunch";

export type Recipe = {
  category: Category;
  imageURL: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  preparationTime: number;
  numberPersons: number;
  likes: number;
}