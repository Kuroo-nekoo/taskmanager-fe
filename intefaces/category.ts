import { ITask } from "./task";

export interface ICategory {
  id: string;
  value: string;
  color: string;
  tasks: ITask[];
  listId: string;
}
