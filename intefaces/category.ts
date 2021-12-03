import { ITask } from "./task";

export interface ICategory {
  id: number;
  value: string;
  tasks: ITask[];
}
