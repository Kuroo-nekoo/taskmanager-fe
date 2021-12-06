import { ITask } from "./task";

export interface ICategory {
  id: number;
  value: string;
  color: string;
  tasks: ITask[];
  listId: number;
}
