import { ICategory } from "./category";

export interface IList {
  spaceId: string;
  id: string;
  value: string;
  categories: ICategory[];
}
