import { IList } from "./list";

export interface ISpace {
  id: string;
  value: string;
  lists: IList[];
}
