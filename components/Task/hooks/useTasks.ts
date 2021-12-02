import axios from "axios";
import { useQuery } from "react-query";
import { ITask } from "../../../intefaces/task";

export default function useTasks() {
  const taskUrl = "http://localhost:4000/tasks";

  return useQuery("tasks", async () => {
    try {
      const res = await axios.get<ITask[]>(taskUrl);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  });
}
