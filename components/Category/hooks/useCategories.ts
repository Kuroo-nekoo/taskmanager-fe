import axios from "axios";
import { useQuery } from "react-query";
import { ICategory } from "../../../intefaces/category";

export default function useCategories(listId?: string) {
  const categoryUrl = "http://localhost:4000/categories";

  return useQuery("categories", async () => {
    try {
      const res = await axios.get<ICategory[]>(categoryUrl);
      if (listId) {
        return res.data.filter((category) => category.listId === listId);
      } else {
        return res.data;
      }
    } catch (err) {
      console.error(err);
    }
  });
}
