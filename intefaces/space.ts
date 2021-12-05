import { IList } from "./list";

export interface ISpace {
  id: number;
  value: string;
  lists: IList[];
}
